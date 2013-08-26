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
    grunt build

The libraries will end up in `build/public/assets/js`.

### Local Testing

If you want to quickly test Signatural, run:

    grunt server

Then point your browser at `http://localhost:3333` and you'll get the test panel.