module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            src: ['src/js/**/*.js', '!src/js/lib/*'],
            options: {
                specs: 'tests/spec/**/*.js',
                helpers: 'tests/helpers/**/*.js',
                outfile: 'tests/_specRunner.html'
            }
        },

        jshint: {
            foo: {
                src: ['src/js/**/*.js', '!src/js/lib/*']
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            js: {
                src: ['src/js/**/*.js', '!src/js/lib/*'],
                dest: 'build/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'build/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        cssmin: {
            combine: {
                files: {
                    'build/<%= pkg.name %>.css': 'src/css/*.css'
                }
            },
            minify: {
                src: 'build/<%= pkg.name %>.css',
                dest: 'build/<%= pkg.name %>.min.css'
            }
        },

        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: 'build'
            }
        },

        usemin: {
            html: 'build/index.html'
        },

        copy: {
            copyIndex:{
                src: 'src/index.html',
                dest: 'build/index.html'
            },
            copyThemes:{
                src: 'src/css/themes/*.css',
                dest: 'build/css/themes',
                flatten: true,
                expand:true
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');


    //Tasks
    grunt.registerTask('build', ['copy:copyIndex', 'copy:copyThemes', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin']);
    grunt.registerTask('tests', ['jshint', 'jasmine']);

    grunt.registerTask('default', ['tests']);

};