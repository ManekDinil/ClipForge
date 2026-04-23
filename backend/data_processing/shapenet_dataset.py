import os
import torch
from torch.utils.data import Dataset
import numpy as np

# We'll use trimesh for robust 3D mesh voxelization, 
# as it handles watertight checks and ray-casting efficiently.
try:
    import trimesh
except ImportError:
    print("Please install trimesh: pip install trimesh networkx rtree")

class ShapeNetVoxelDataset(Dataset):
    """
    Data loading module for ShapeNet models with on-the-fly or pre-computed voxelization.
    """
    
    def __init__(self, root_dir, category_id=None, resolution=32, split='train', transform=None):
        """
        Args:
            root_dir (str): Path to the ShapeNetCore.v2 dataset directory.
            category_id (str, optional): ShapeNet synset ID (e.g., '03001627' for chairs). 
                                         If None, loads all available categories.
            resolution (int): Target grid resolution for voxelization (e.g., 32x32x32).
            split (str): 'train', 'val', or 'test'.
            transform (callable, optional): Optional transform to be applied on a sample.
        """
        self.root_dir = root_dir
        self.category_id = category_id
        self.resolution = resolution
        self.split = split
        self.transform = transform
        
        self.model_paths = self._load_split_paths()

    def _load_split_paths(self):
        """
        Traverses the ShapeNet directory to collect paths to .obj files.
        (Mocked split logic: in practice, you'd load from a train/test split JSON).
        """
        paths = []
        if not os.path.exists(self.root_dir):
            print(f"Warning: Root directory {self.root_dir} not found.")
            return paths

        categories = [self.category_id] if self.category_id else os.listdir(self.root_dir)
        
        for cat in categories:
            cat_dir = os.path.join(self.root_dir, cat)
            if not os.path.isdir(cat_dir): continue
                
            model_ids = os.listdir(cat_dir)
            # Simple pseudo-split for demonstration
            if self.split == 'train':
                model_ids = model_ids[:int(len(model_ids)*0.8)]
            elif self.split == 'val':
                model_ids = model_ids[int(len(model_ids)*0.8):int(len(model_ids)*0.9)]
            else:
                model_ids = model_ids[int(len(model_ids)*0.9):]

            for model_id in model_ids:
                obj_path = os.path.join(cat_dir, model_id, 'models', 'model_normalized.obj')
                if os.path.exists(obj_path):
                    paths.append((cat, model_id, obj_path))
                    
        return paths

    def _voxelize_mesh(self, mesh_path):
        """
        Focuses on the voxelization preprocessing steps.
        Converts a 3D mesh into a dense 3D binary occupancy grid.
        """
        # 1. Load the mesh
        mesh = trimesh.load(mesh_path, force='mesh')
        
        # 2. Normalize the mesh to fit within a unit bounding box centered at origin
        # This is crucial so voxelization resolution is applied uniformly
        bounds = mesh.extents
        if bounds.max() == 0:
            return torch.zeros((1, self.resolution, self.resolution, self.resolution))
            
        mesh.apply_translation(-mesh.centroid)
        mesh.apply_scale(1.0 / bounds.max())
        
        # 3. Voxelize using trimesh (pitch is the size of each voxel)
        pitch = 1.0 / self.resolution
        try:
            # We pad slightly to avoid edge clipping
            voxel_grid = mesh.voxelized(pitch=pitch).fill()
        except Exception:
            # Fallback to surface voxelization if filling (solid voxelization) fails on non-watertight meshes
            voxel_grid = mesh.voxelized(pitch=pitch)
            
        # 4. Convert to boolean numpy array matrix
        voxel_data = voxel_grid.matrix
        
        # 5. Ensure exact dimensions (Trimesh output bounds might vary slightly based on geometry)
        # We create an empty grid and place the centered voxels into it.
        dense_grid = np.zeros((self.resolution, self.resolution, self.resolution), dtype=np.float32)
        
        # Calculate centering offsets
        offsets = [ (self.resolution - dim) // 2 for dim in voxel_data.shape ]
        
        # Bound the slice to avoid index errors if the mesh was slightly larger
        end_idx = [min(offsets[i] + voxel_data.shape[i], self.resolution) for i in range(3)]
        start_idx = [max(offsets[i], 0) for i in range(3)]
        
        v_start = [0 if offsets[i] >= 0 else -offsets[i] for i in range(3)]
        v_end = [voxel_data.shape[i] - max(0, offsets[i] + voxel_data.shape[i] - self.resolution) for i in range(3)]

        dense_grid[
            start_idx[0]:end_idx[0], 
            start_idx[1]:end_idx[1], 
            start_idx[2]:end_idx[2]
        ] = voxel_data[v_start[0]:v_end[0], v_start[1]:v_end[1], v_start[2]:v_end[2]]

        # Return as PyTorch tensor with channel dimension (C, D, H, W) -> (1, Res, Res, Res)
        return torch.from_numpy(dense_grid).unsqueeze(0)

    def __len__(self):
        return len(self.model_paths)

    def __getitem__(self, idx):
        cat, model_id, obj_path = self.model_paths[idx]
        
        # Perform voxelization preprocessing
        voxel_tensor = self._voxelize_mesh(obj_path)
        
        if self.transform:
            voxel_tensor = self.transform(voxel_tensor)
            
        return {
            'category': cat,
            'model_id': model_id,
            'voxels': voxel_tensor
        }
