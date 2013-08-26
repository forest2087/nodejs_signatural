Signatural.prototype._registerMouseEvents = function ( self ) {

    self._canvas.addEventListener( "mousedown", function ( event ) {
        if ( event.which === 1 ) {
            self._penDown = true;
            self._reset();

            var point = self._createPoint( event );
            self._addPoint( point );
        }
    } );

    self._canvas.addEventListener( "mousemove", function ( event ) {
        if ( self._penDown ) {
            var point = self._createPoint( event );
            self._addPoint( point );
        }
    } );

    document.addEventListener( "mouseup", function ( event ) {
        if ( event.which === 1 && self._penDown ) {
            self._penDown = false;

            var canDrawCurve = self._points.length > 2,
                point = self._points[0],
                ctx = self._context;

            if ( !canDrawCurve && point ) {
                ctx.beginPath();
                self._drawPoint( point.x, point.y, 2 );
                ctx.closePath();
                ctx.fill();
            }
        }
    } );
};