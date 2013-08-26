var Point = function ( x, y, time ) {
    this.x = x;
    this.y = y;
    this.time = time || new Date().getTime();
};

Point.prototype.velocityFrom = function ( start ) {
    return this.distanceTo( start ) / (this.time - start.time);
};

Point.prototype.distanceTo = function ( start ) {
    return Math.sqrt( Math.pow( this.x - start.x, 2 ) + Math.pow( this.y - start.y, 2 ) );
};

Signatural.prototype._createPoint = function ( event ) {
    var rect = this._canvas.getBoundingClientRect();
    return new Point(
        event.clientX - rect.left,
        event.clientY - rect.top
    );
};

Signatural.prototype._addPoint = function ( point ) {
    var points = this._points,
        c2, c3,
        curve, tmp;

    points.push( point );

    if ( points.length > 2 ) {
        // To reduce the initial lag make it work with 3 points
        // by copying the first point to the beginning
        if ( points.length === 3 ) points.unshift( points[0] );

        tmp = this._calculateCurveControlPoints( points[0], points[1], points[2] );
        c2 = tmp.c2;
        tmp = this._calculateCurveControlPoints( points[1], points[2], points[3] );
        c3 = tmp.c1;
        curve = new Bezier( points[1], c2, c3, points[2] );
        this._addCurve( curve );

        // Remove the first element from the list,
        // so that we always have no more than 4 points in points array.
        points.shift();
    }
};