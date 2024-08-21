
export default class PaintBrushOp{
    // #region MAIN
    name        = 'paintBrush';
    editor      = null;
    layer       = null;
    isDown      = false;
    prevPos     = null;
    constructor( editor ){ this.editor = editor; }
    // #endregion

    // #region STATE MACHINE INTERFACE
    onInit(_obj){ this.layer = this.editor.layers.pixel; }

    onRelease(_obj){
        this.layer
            .clearPreview()
            .setErase( false );
        this.layer = null;
    }

    onSuspend(_obj){}
    onWakeup(_obj){}
    validateStartup(_obj){ return true; }
    dispose(){ 
        this.onRelease(); 
        this.editor = null;
    }
    // #endregion

    // #region INPUT INTERFACE
    onPointerDown( x, y, e, obj ){
        this.layer
            .setFillColor( this.editor.painting.color )
            .setErase( this.editor.painting.isErase )
            .clearPreview();

        this.paintBrush( this.layer.ctxDraw, x, y );
        this.prevPos    = [x,y];
        this.isDown     = true;
        return true;
    }

    onPointerMove( x, y, e, obj ){
        if( this.isDown ){
            this.paintMove( this.layer.ctxDraw, x, y );

            this.prevPos[0] = x;
            this.prevPos[1] = y;
        }else{
            this.layer.clearPreview();
            this.paintBrush( this.layer.ctxPreview, x, y );
        }
    }

    onPointerUp( _e, _obj ){
        this.prevPos    = null;
        this.isDown     = false;
    }
    onPointerCancel( _e, _obj ){
        this.prevPos    = null;
        this.isDown     = false;
    }
    onDblClick( _e, _obj ){ return false; }
    // #endregion

    // #region DRAWING
    paintBrush( ctx, x, y ){
        switch( this.editor.painting.brush ){
            case 'circle':
                ctx.beginPath();
                ctx.arc( x, y, this.editor.painting.size, 0, 2*Math.PI );
                ctx.fill();
                break;

            case 'square':
                const size = this.editor.painting.size;
                const hf   = size * 0.5;
                ctx.fillRect(
                    Math.round( x - hf ), 
                    Math.round( y - hf ), 
                    size, size
                );
                break;
        }
    }

    paintMove( ctx, x, y ){
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        const px    = this.prevPos[0];              // Previous Position
        const py    = this.prevPos[1];
        const dx    = x - px;                       // Delta Position
        const dy    = y - py;
        const dist  = Math.sqrt( dx**2 + dy**2 );   // Distance traveled

        // How many brush steps at half brush size
        const inc   = Math.max( 1, Math.round( this.editor.painting.size * 0.5 ) );
        const steps = Math.max( 1, Math.ceil( dist / inc ) );
        
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        let t;
        for( let i=1; i <= steps; i++ ){
            t = i / steps;
            this.paintBrush( ctx, 
                Math.round( dx * t + px ), 
                Math.round( dy * t + py )
            );
        }
    }
    // #endregion
}
