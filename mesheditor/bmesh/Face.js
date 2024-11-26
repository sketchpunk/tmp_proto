import Vec3 from './maths/Vec3.js';

// TODO : Looks like there are some support for face holes hidden behind the DEFINE of USE_BMESH_HOLES
// https://github.com/blender/blender/blob/main/source/blender/bmesh/bmesh_class.hh#L248C1-L254C7
// #ifdef USE_BMESH_HOLES
// /* eventually, this structure will be used for supporting holes in faces */
// typedef struct BMLoopList {
//   struct BMLoopList *next, *prev;
//   struct BMLoop *first, *last;
// } BMLoopList;
// #endif

export class Face{
    // #region BMESH SPECED PROPERTIES
  
    // USE_BMESH_HOLES
    // int totbounds;  // Total boundaries, is one plus the number of holes in the face.
    // ListBase loops;

    // Reference to a loop in the linked list that creates this face
    l_first = null; // NOTE: This is only used if not using the face hole updates

    // Number of vertices in the face, (the length of #BMFace.l_first circular linked list).
    len     = 0;
    
    // Face normal, see #BM_face_calc_normal
    no      = new Vec3();

    // #endregion

    // #region CUSTOM PROPERTIES

    // NOTES: Keep track of the face trianglution if we end up using earcut to handle it
    // Since triangule indices are just the index of vertices when passed to the gpu,
    // we can just store the vert references as a custom property in vert will track its
    // current place in the vertices array.
    earcut = []; // Array<Vert>

    // #endregion
}