
export default class PaintBrushOp{
    // #region MAIN
    name        = 'paintBrush';
    editor      = null;
    layer       = null;
    isDown      = false;
    constructor( editor ){ this.editor = editor; }
    // #endregion

    // #region STATE MACHINE INTERFACE
    onInit(_obj){ this.layer = this.editor.layers.pixel; }

    onRelease(_obj){
        this.layer.clearPreview().setErase( false );
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
        this.isDown = true;
        return true;
    }

    onPointerMove( x, y, e, obj ){
        if( this.isDown ){
            this.paintBrush( this.layer.ctxDraw, x, y );
        }else{
            this.layer.clearPreview();
            this.paintBrush( this.layer.ctxPreview, x, y );
        }
    }

    onPointerUp( _e, _obj ){
        
        this.isDown = false;
    }
    onPointerCancel( _e, _obj ){ 
        this.isDown = false;
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
    // #endregion
}
