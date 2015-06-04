'use strict';

module.exports = function(gulp) {

    // Build functions
    require("./tasks/build").declare(gulp);
    require("./tasks/build.bundle").declare(gulp);

    // Lint
    require("./tasks/lint").declare(gulp);

    // Serve
    require("./tasks/serve").declare(gulp);
    require("./tasks/serve.public").declare(gulp);
    require("./tasks/serve.signatural").declare(gulp);

};
