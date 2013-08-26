module.exports = function ( grunt ) {

    // Project configuration.
    grunt.initConfig( {
        pkg:     grunt.file.readJSON( 'package.json' ),
        uglify:  {
            options: {
                banner: '/*!\n * <%= pkg.name %> v<%= pkg.version %>\n * Copyright (c)<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n * (Built <%= grunt.template.today("yyyy-mm-dd") %>)\n */\n'
            },
            build:   {
                src:  'build/public/assets/js/<%= pkg.name %>-<%= pkg.version %>.js',
                dest: 'build/public/assets/js/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },
        concat: {
            dist: {
                src: [
                    'src/Signatural.js',
                    'src/MouseEvents.js',
                    'src/TouchEvents.js',
                    'src/Drawing.js',
                    'src/Point.js',
                    'src/Bezier.js'
                ], // compile and concat into single file
                dest: 'build/public/assets/js/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        express: {
            server: {
                options: {
                    port:  3333,
                    bases: 'build/public'
                }
            }
        },
        copy:    {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/public',
                        src: ['**'],
                        dest: 'build/public'
                    }
                ]
            }
        },
        jshint:  {
            options: {
                curly:   false,
                eqeqeq:  false,
                devel:   true,
                immed:   true,
                latedef: true,
                newcap:  true,
                noarg:   true,
                sub:     true,
                strict:  false,
                undef:   false,
                boss:    true,
                eqnull:  true,
                browser: true
            },
            files:   {
                src: ['src/*.js']
            }
        }
    } );

    // Load project compilation plugins
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );

    // Load the local express/connect server plugins
    grunt.loadNpmTasks( 'grunt-express' );

    // Build task(s).
    grunt.registerTask( 'build', ['jshint', 'copy', 'concat:dist', 'uglify:build'] );

    // Local express/connect server task(s).
    grunt.registerTask( 'server', ['build', 'express', 'express-keepalive'] );

    // Default task(s).
    grunt.registerTask( 'default', ['build'] );
};