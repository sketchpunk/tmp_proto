import Vec3 from './maths/Vec3.js';

// https://github.com/blender/blender/blob/main/source/blender/bmesh/bmesh_class.hh#L86
export class Vert{
    // #region BMESH SPECED PROPERTIES
    co = new Vec3(); // vertex coordinates
    no = new Vec3(); // vertex normal
    e  = null;       // Pointer to (any) edge using this vertex (for disk cycles)
    // #endregion
  
    // #region CUSTOM PROPERTIES
    
    // TODO: Any add or delete operation needs to handle accounting of Vert.idx as its not a blender thing
    idx = -1; // Track vertex index, mainly to help with triangulation of faces for rendering
    
    // #endregion
}