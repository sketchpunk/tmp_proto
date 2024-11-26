
// https://github.com/blender/blender/blob/main/source/blender/bmesh/bmesh_class.hh#L108

// disk link structure, only used by edges
export class DiskLink{
    next = null;
    prev = null;
}

export class Edge{
    // #region BMESH SPECED PROPERTIES
    
    /** Vertices (unordered)
     * Although the order can be used at times, when extruding a face from a wire-edge for example.
     * Operations that create/subdivide edges shouldn't flip the order unless there is a good reason to do so.
     */
    v1 = null;
    v2 = null;

    /** The list of loops around the edge, see doc-string for #BMLoop.radial_next
     * for an example of using this to loop over all faces used by an edge.
     */
    l  = null;

    /** Disk Cycle Pointers
     * relative data: d1 indicates the next/prev edge around vertex v1 and d2 does the same for v2.
     */
    v1_disk_link = new DiskLink();
    v2_disk_link = new DiskLink();

    // #endregion
}