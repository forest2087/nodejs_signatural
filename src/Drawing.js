Signatural.prototype._calculateCurveControlPoints = function ( s1, s2, s3 ) {
    var dx1 = s1.x - s2.x, dy1 = s1.y - s2.y,
        dx2 = s2.x - s3.x, dy2 = s2.y - s3.y,

        m1 = {x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0},
        m2 = {x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0},

        l1 = Math.sqrt( dx1 * dx1 + dy1 * dy1 ),
        l2 = Math.sqrt( dx2 * dx2 + dy2 * dy2 ),

        dxm = (m1.x - m2.x),
        dym = (m1.y - m2.y),

        k = l2 / (l1 + l2),
        cm = {x: m2.x + dxm * k, y: m2.y + dym * k},

        tx = s2.x - cm.x,
        ty = s2.y - cm.y;

    return {
        c1: new Point( m1.x + tx, m1.y + ty ),
        c2: new Point( m2.x + tx, m2.y + ty )
    };
};

Signatural.prototype._addCurve = function ( curve ) {
    var startPoint = curve.startPoint,
        endPoint = curve.endPoint,
        velocity, newWidth;

    velocity = endPoint.velocityFrom( startPoint );
    velocity = Signatural.VELOCITY_FILTER_WEIGHT * velocity +
        (1 - Signatural.VELOCITY_FILTER_WEIGHT) * this._lastVelocity;

    newWidth = this._strokeWidth( velocity );
    this._drawCurve( curve, this._lastWidth, newWidth );

    this._lastVelocity = velocity;
    this._lastWidth = newWidth;
};

Signatural.prototype._drawPoint = function ( x, y, size ) {
    var ctx = this._context;

    ctx.moveTo( x, y );
    ctx.arc( x, y, size, 0, 2 * Math.PI, false );
};

Signatural.prototype._drawCurve = function ( curve, startWidth, endWidth ) {
    var ctx = this._context,
        widthDelta = endWidth - startWidth,
        drawSteps, width, i, t, tt, ttt, u, uu, uuu, x, y;

    drawSteps = Math.floor( curve.length() );
    ctx.beginPath();
    for ( i = 0; i < drawSteps; i++ ) {
        // Calculate the Bezier (x, y) coordinate for this step.
        t = i / drawSteps;
        tt = t * t;
        ttt = tt * t;
        u = 1 - t;
        uu = u * u;
        uuu = uu * u;

        x = uuu * curve.startPoint.x;
        x += 3 * uu * t * curve.control1.x;
        x += 3 * u * tt * curve.control2.x;
        x += ttt * curve.endPoint.x;

        y = uuu * curve.startPoint.y;
        y += 3 * uu * t * curve.control1.y;
        y += 3 * u * tt * curve.control2.y;
        y += ttt * curve.endPoint.y;

        width = startWidth + ttt * widthDelta;
        this._drawPoint( x, y, width );
    }
    ctx.closePath();
    ctx.fill();
};

Signatural.prototype._strokeWidth = function ( velocity ) {
    var minWidth = 0.5,
        maxWidth = 2.5;
    return Math.max( maxWidth / (velocity + 1), minWidth );
};