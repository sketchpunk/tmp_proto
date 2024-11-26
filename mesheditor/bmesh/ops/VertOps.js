import { Vert } from '../Vert.js';

export default class VertOps{
    // TODO: Make sure accounting is created for keeping Vert.idx is updated
    // TODO: When deleting do an end swop, update moved vert with new index & resize array length -1

    // #region MANAGE OPERATIONS
    
    static create( bm, pos=null ){ return new Vert(); }

    static delete( bm ){}
    
    // #endregion

    // #region GET OPERATIONS
    
    static findClosestVert( bm, pos, minDist=0.001 ){ return null }
    
    // #endregion
}