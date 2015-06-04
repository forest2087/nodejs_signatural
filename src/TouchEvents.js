Signatural.prototype._registerTouchEvents = function ( self ) {
    self._canvas.addEventListener( "touchstart", function ( event ) {
        self._reset();

        var touch = event.changedTouches[0],
            point = self._createPoint( touch );
        self._addPoint( point );
    } );

    self._canvas.addEventListener( "touchmove", function ( event ) {
        // don't scroll during draw
        event.preventDefault();

        var touch = event.changedTouches[0],
            point = self._createPoint( touch );
        self._addPoint( point );
    } );

    document.addEventListener( "touchend", function ( event ) {
        var wasCanvasTouched = event.target === self._canvas,
            canDrawCurve = self._points.length > 2,
            point = self._points[0],
            ctx = self._context;

        if ( wasCanvasTouched && !canDrawCurve && point ) {
            ctx.beginPath();
            self._drawPoint( point.x, point.y, 2 );
            ctx.closePath();
            ctx.fill();
        }
    } );
};
