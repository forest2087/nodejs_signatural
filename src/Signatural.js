var Signatural = function ( options ) {
    this._options = options || {};
    this._options.mode = this._options.mode || "mouse";
    this._options.color = this._options.color || "black";

    this._canvas = this._options.canvas;
    this._context = this._canvas.getContext( "2d" );

    this._points = [];
    this._lastVelocity = 0;
    this._lastWidth = 1;
    this._context.fillStyle = this._options.color;

    this._mode = this._options.mode; // one of "mouse", "touch" or "both"

    this._penDown = false;

    switch ( this._mode ) {
        case "mouse":
            this._registerMouseEvents( this );
            break;

        case "touch":
            this._registerTouchEvents( this );
            break;

        default:
            this._registerMouseEvents( this );
            this._registerTouchEvents( this );
            break;
    }

    this.clear();

    return this;
};

Signatural.VELOCITY_FILTER_WEIGHT = 0.7;

Signatural.prototype.clear = function () {
    this._context.clearRect( 0, 0, this._canvas.width, this._canvas.height );
    this._reset();
};

Signatural.prototype.toDataURL = function ( imageType, quality ) {
    return this._canvas.toDataURL( arguments );
};

Signatural.prototype.fromDataURL = function ( dataUrl ) {
    var image = new Image();
    image.src = dataUrl;
    this._context.drawImage( image, 0, 0, this._canvas.width, this._canvas.height );
};

Signatural.prototype._reset = function () {
    this._points = [];
    this._lastVelocity = 0;
    this._lastWidth = 1;
    this._context.fillStyle = this._options.color;
};