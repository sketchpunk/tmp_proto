export default class Vec3 extends Array{
    // #region STATIC PROPERTIES
    static UP       = [  0,  1,  0 ];
    static DOWN     = [  0, -1,  0 ];
    static LEFT     = [ -1,  0,  0 ];
    static RIGHT    = [  1,  0,  0 ];
    static FORWARD  = [  0,  0,  1 ];
    static BACK     = [  0,  0, -1 ];
    // #endregion

    // #region MAIN 
    constructor( x, y, z ){
        super( 3 );

        // new Vec3( [0,1,0] ) :: Clone a vec3
        if( x instanceof Vec3 || x instanceof Float32Array || ( x instanceof Array && v.length == 3 )){
            this[ 0 ] = x[ 0 ]; 
            this[ 1 ] = x[ 1 ]; 
            this[ 2 ] = x[ 2 ];

        // new Vec3( 0, 1, 0 ) :: Direct assignment
        }else if( typeof x === 'number' && typeof y === 'number' && typeof z === 'number' ){
            this[ 0 ] = x;
            this[ 1 ] = y; 
            this[ 2 ] = z;

        // new Vec3( 1 ) :: Good for scalar vectors
        }else if( typeof x === 'number' ){
            this[ 0 ] = x;
            this[ 1 ] = x;
            this[ 2 ] = x;

        // new Vec3();
        }else{
            this[ 0 ] = 0;
            this[ 1 ] = 0;
            this[ 2 ] = 0;
        }
    }
    // #endregion

    // #region GETTERS
    get len(){ return Math.sqrt( this[ 0 ]**2 + this[ 1 ]**2 + this[ 2 ]**2 ); }
    get lenSqr(){ return  this[ 0 ]**2 + this[ 1 ]**2 + this[ 2 ]**2; }
    // #endregion

    // #region SETTERS
    xyz( x, y, z ){
        if( y != null && z != null ){
            this[ 0 ] = x;
            this[ 1 ] = y;
            this[ 2 ] = z;
        }else{
            this[ 0 ] = x;
            this[ 1 ] = x;
            this[ 2 ] = x;
        }
        return this;
    }

    copy( v ){
        this[ 0 ] = v[ 0 ];
        this[ 1 ] = v[ 1 ];
        this[ 2 ] = v[ 2 ];
        return this;
    }
    // #endregion

    // #region OPERATORS
    add( v ){
        this[ 0 ] += v[ 0 ];
        this[ 1 ] += v[ 1 ];
        this[ 2 ] += v[ 2 ];
        return this;
    }

    sub( v ){
        this[ 0 ] -= v[ 0 ];
        this[ 1 ] -= v[ 1 ];
        this[ 2 ] -= v[ 2 ];
        return this;
    }

    scale( v ){
        this[ 0 ] *= v;
        this[ 1 ] *= v;
        this[ 2 ] *= v;
        return this;
    }

    norm(){
        let mag = Math.sqrt( this[0]**2 + this[1]**2 + this[2]**2 );
        if( mag != 0 ){
            mag        = 1 / mag;
            this[ 0 ] *= mag;
            this[ 1 ] *= mag;
            this[ 2 ] *= mag;
        }
        return this;
    }
    // #endregion

    // #region STATIC FUNCTIONS
    static dist( a, b ){ return Math.sqrt( (a[ 0 ]-b[ 0 ]) ** 2 + (a[ 1 ]-b[ 1 ]) ** 2 + (a[ 2 ]-b[ 2 ]) ** 2 ); }
    static distSqr( a, b ){ return (a[ 0 ]-b[ 0 ]) ** 2 + (a[ 1 ]-b[ 1 ]) ** 2 + (a[ 2 ]-b[ 2 ]) ** 2; }

    static dot( a, b ) { return a[ 0 ] * b[ 0 ] + a[ 1 ] * b[ 1 ] + a[ 2 ] * b[ 2 ]; }
    static cross( a, b, out = new Vec3() ){
        const ax = a[0], ay = a[1], az = a[2],
              bx = b[0], by = b[1], bz = b[2];

        out[ 0 ] = ay * bz - az * by;
        out[ 1 ] = az * bx - ax * bz;
        out[ 2 ] = ax * by - ay * bx;
        return out;
    }
    // #endregion
}