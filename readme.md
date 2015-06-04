## Signatural

A JavaScript library for drawing natural-looking signatures.  It uses Bezier curve smoothing and interpolated-width
lines based on pen velocity to achieve a "fountain pen"-style signature effect.

### Requirements

In order to build Signatural, you'll need to have the following installed locally:

* Node.js
* Grunt

### Building

From the root of the project, run:

    npm install
    gulp build

The libraries will end up in `dist`.

### Local Testing

If you want to quickly test Signatural, run:

    gulp serve

Then point your browser at `http://localhost:3000` and you'll get the test panel.
