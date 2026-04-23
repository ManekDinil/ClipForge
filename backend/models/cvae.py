import torch
import torch.nn as nn
import torch.nn.functional as F

class Encoder3D(nn.Module):
    def __init__(self, in_channels=1, condition_dim=512, latent_dim=512, hidden_dims=None):
        super(Encoder3D, self).__init__()
        if hidden_dims is None:
            hidden_dims = [32, 64, 128, 256]
            
        self.condition_dim = condition_dim
        self.latent_dim = latent_dim
        
        modules = []
        in_ch = in_channels
        for h_dim in hidden_dims:
            modules.append(
                nn.Sequential(
                    nn.Conv3d(in_ch, h_dim, kernel_size=3, stride=2, padding=1),
                    nn.BatchNorm3d(h_dim),
                    nn.LeakyReLU(0.2)
                )
            )
            in_ch = h_dim
            
        self.encoder = nn.Sequential(*modules)
        
        # Assuming input size of 32x32x32, 4 downsamplings (stride=2) results in 2x2x2
        # Flattened spatial size: 256 * 2 * 2 * 2 = 2048
        self.flattened_size = hidden_dims[-1] * 2 * 2 * 2
        
        # We concatenate the condition (CLIP embedding) to the flattened feature vector
        self.fc_mu = nn.Linear(self.flattened_size + condition_dim, latent_dim)
        self.fc_var = nn.Linear(self.flattened_size + condition_dim, latent_dim)

    def forward(self, x, c):
        """
        Args:
            x: Tensor of shape (B, in_channels, D, H, W) e.g., (B, 1, 32, 32, 32)
            c: Condition tensor (CLIP embedding) of shape (B, condition_dim)
        """
        x = self.encoder(x)
        x = torch.flatten(x, start_dim=1)
        
        # Concatenate condition
        x_c = torch.cat([x, c], dim=1)
        
        mu = self.fc_mu(x_c)
        logvar = self.fc_var(x_c)
        return mu, logvar

class Decoder3D(nn.Module):
    def __init__(self, latent_dim=512, condition_dim=512, out_channels=1, hidden_dims=None):
        super(Decoder3D, self).__init__()
        if hidden_dims is None:
            # We reverse the encoder's hidden dims
            hidden_dims = [256, 128, 64, 32]
            
        self.first_hidden_dim = hidden_dims[0]
        self.decoder_input = nn.Linear(latent_dim + condition_dim, self.first_hidden_dim * 2 * 2 * 2)
        
        modules = []
        for i in range(len(hidden_dims) - 1):
            modules.append(
                nn.Sequential(
                    nn.ConvTranspose3d(hidden_dims[i], hidden_dims[i+1], kernel_size=3, stride=2, padding=1, output_padding=1),
                    nn.BatchNorm3d(hidden_dims[i+1]),
                    nn.LeakyReLU(0.2)
                )
            )
            
        self.decoder = nn.Sequential(*modules)
        
        self.final_layer = nn.Sequential(
            nn.ConvTranspose3d(hidden_dims[-1], hidden_dims[-1], kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.BatchNorm3d(hidden_dims[-1]),
            nn.LeakyReLU(0.2),
            nn.Conv3d(hidden_dims[-1], out_channels, kernel_size=3, padding=1),
            nn.Sigmoid() # Output probabilities for voxel occupancy
        )

    def forward(self, z, c):
        """
        Args:
            z: Latent vector of shape (B, latent_dim)
            c: Condition tensor (CLIP embedding) of shape (B, condition_dim)
        """
        # Concatenate latent sample and condition
        z_c = torch.cat([z, c], dim=1)
        
        x = self.decoder_input(z_c)
        # Reshape to start 3D convolutions (B, first_hidden_dim, 2, 2, 2)
        x = x.view(-1, self.first_hidden_dim, 2, 2, 2)
        
        x = self.decoder(x)
        x = self.final_layer(x)
        return x

class ConditionalVAE3D(nn.Module):
    """
    3D Conditional Variational Autoencoder (CVAE).
    As specified in the architecture, the latent space alignment matches the CLIP embedding dimensions.
    """
    def __init__(self, in_channels=1, condition_dim=512, latent_dim=512):
        super(ConditionalVAE3D, self).__init__()
        
        # The latent space dimension is explicitly aligned with the CLIP embedding dimension
        assert latent_dim == condition_dim, \
            f"Latent dimension ({latent_dim}) must match the CLIP condition dimension ({condition_dim}) for alignment."
            
        self.encoder = Encoder3D(in_channels=in_channels, condition_dim=condition_dim, latent_dim=latent_dim)
        self.decoder = Decoder3D(latent_dim=latent_dim, condition_dim=condition_dim, out_channels=in_channels)

    def reparameterize(self, mu, logvar):
        """
        Reparameterization trick to sample from N(mu, var) while maintaining differentiability.
        """
        std = torch.exp(0.5 * logvar)
        eps = torch.randn_like(std)
        return mu + eps * std

    def forward(self, x, c):
        """
        Args:
            x: Input voxel grids (B, 1, 32, 32, 32)
            c: CLIP embeddings (B, 512)
        Returns:
            reconstruction, mu, logvar
        """
        mu, logvar = self.encoder(x, c)
        z = self.reparameterize(mu, logvar)
        reconstruction = self.decoder(z, c)
        return reconstruction, mu, logvar
        
    def generate(self, c, z=None):
        """
        Generate 3D shapes conditioned on CLIP embeddings.
        Args:
            c: CLIP embeddings (B, 512)
            z: Optional latent vector. If None, samples from standard normal.
        """
        if z is None:
            z = torch.randn(c.size(0), self.decoder.decoder_input.in_features - c.size(1)).to(c.device)
            
        return self.decoder(z, c)

def cvae_loss_function(recon_x, x, mu, logvar, beta=1.0):
    """
    Computes the CVAE loss function: BCE + beta * KLD
    """
    # Binary Cross Entropy for binary occupancy grids
    BCE = F.binary_cross_entropy(recon_x, x, reduction='sum')
    
    # Kullback-Leibler divergence
    # KLD = -0.5 * sum(1 + log(sigma^2) - mu^2 - sigma^2)
    KLD = -0.5 * torch.sum(1 + logvar - mu.pow(2) - logvar.exp())
    
    return BCE + beta * KLD, BCE, KLD
