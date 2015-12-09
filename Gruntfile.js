module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            files: ['src/**'],
            tasks: ['preCompile']
        },
        clean: {
            assets: {
                src: ['public/**'],
                options: {
                    force: true
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            javascript: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'src/js/*.js'
                ],
                dest: 'public/js/main.js'
            },
            css: {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.min.css'
                ],
                dest: 'public/css/third-party.css'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/js/main.min.js': ['public/js/main.js']
                }
            }
        },
        copy: {
            assets: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['images/**', 'fonts/**'],
                    dest: 'public/'
                }, {
                    expand: true,
                    cwd: 'src/css',
                    src: '*.sass',
                    dest: 'public/css/sass/'
                }]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/css/main.css': 'src/css/main.scss',
                }
            }
        },
        cssmin: {
            target: {
                files:[ {
                    expand: true,
                    cwd: 'public/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/css',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.registerTask('preCompile', [
        'clean:assets',
        'concat',
        'uglify',
        'copy:assets',
        'sass',
        'cssmin'
    ]);

    grunt.registerTask('default', [
        'preCompile'
    ]);
};
