import argparse
import torch
import numpy as np

try:
    import open_clip
except ImportError:
    print("Please install open_clip_torch: pip install open_clip_torch")
    exit(1)

try:
    import trimesh
except ImportError:
    print("Please install trimesh: pip install trimesh")
    exit(1)

# Import the CVAE model we built
from models.cvae import ConditionalVAE3D

def generate_shape(text_prompt, output_file, model_path=None, device='cuda'):
    """
    Takes a text string, passes it through the CLIP encoder to get a condition vector,
    feeds it into the 3D CVAE to generate a 3D voxel grid, and exports it as .obj or .vox.
    """
    # 1. Setup device
    device = torch.device(device if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    # 2. Load CLIP Model
    # We use ViT-B-32 since it has a 512-dimensional embedding, matching our CVAE latent_dim
    print("Loading CLIP text encoder (ViT-B-32)...")
    clip_model, _, preprocess = open_clip.create_model_and_transforms('ViT-B-32', pretrained='laion2b_s34b_b79k')
    clip_model = clip_model.to(device)
    tokenizer = open_clip.get_tokenizer('ViT-B-32')

    # 3. Load CVAE Model
    print("Loading 3D CVAE model...")
    cvae = ConditionalVAE3D(in_channels=1, condition_dim=512, latent_dim=512).to(device)
    
    if model_path:
        try:
            cvae.load_state_dict(torch.load(model_path, map_location=device))
            print(f"Loaded CVAE weights from {model_path}")
        except Exception as e:
            print(f"Warning: Failed to load CVAE weights ({e}). Using randomly initialized weights.")
    else:
        print("Warning: No model_path provided. The output will be random noise as the CVAE is not trained.")
    
    cvae.eval()

    # 4. Process Text Prompt into CLIP Embedding
    print(f"Encoding text prompt: '{text_prompt}'")
    text_tokens = tokenizer([text_prompt]).to(device)
    
    with torch.no_grad():
        text_features = clip_model.encode_text(text_tokens)
        # Normalize the embeddings as per standard CLIP usage
        text_features = text_features / text_features.norm(dim=-1, keepdim=True)
        
    # 5. Generate 3D Voxel Grid
    print("Generating 3D structure from CLIP embedding...")
    with torch.no_grad():
        # cvae.generate() takes c: (B, 512)
        generated_voxels = cvae.generate(text_features)
        
    # Extract the numpy array. Shape: (1, 1, 32, 32, 32) -> (32, 32, 32)
    voxel_grid = generated_voxels.squeeze().cpu().numpy()
    
    # Binarize the grid probabilities into an occupancy mask
    threshold = 0.5
    binary_grid = (voxel_grid > threshold).astype(bool)

    # 6. Export to 3D File
    print(f"Exporting geometry to {output_file}...")
    try:
        # Create a Trimesh VoxelGrid wrapper
        voxel_obj = trimesh.voxel.VoxelGrid(binary_grid)
        
        if output_file.lower().endswith('.obj'):
            # Convert voxel grid to a smooth mesh using Marching Cubes
            mesh = voxel_obj.marching_cubes
            mesh.export(output_file)
            print(f"Successfully generated smooth mesh: {output_file}")
            
        elif output_file.lower().endswith('.vox'):
            # Note: native MagicaVoxel .vox export requires 'pyvox' or similar. 
            # Alternatively, we can export the voxel grid as a blocky .obj mesh 
            # to visually preserve the "voxelized" look if .vox parsing is difficult.
            print("Exporting as blocky voxel representations...")
            mesh = voxel_obj.as_boxes()
            
            # If standard .vox is strictly needed, you might need the `pyvox` library.
            # Here we just save the 3D boxes as a .obj to guarantee compatibility, 
            # while naming it differently or saving a raw structure.
            fallback_file = output_file.replace('.vox', '_voxelized.obj')
            mesh.export(fallback_file)
            print(f"Successfully generated voxel blocks, saved to: {fallback_file}")
        else:
            print(f"Unsupported file format for {output_file}. Please use .obj or .vox")
            
    except Exception as e:
        print(f"Failed to export 3D object: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="ClipForge Top-Level Generation Script")
    parser.add_argument("--prompt", type=str, required=True, help="Text prompt to generate shape (e.g., 'a sports car')")
    parser.add_argument("--output", type=str, default="output.obj", help="Output file path (.obj or .vox)")
    parser.add_argument("--model", type=str, default=None, help="Path to trained CVAE weights (.pth)")
    parser.add_argument("--device", type=str, default="cuda", help="Device to run on (cuda or cpu)")
    
    args = parser.parse_args()
    generate_shape(args.prompt, args.output, args.model, args.device)
