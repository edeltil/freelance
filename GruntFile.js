module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // To download bower dependencies in bower_components folder
        'bower-install-simple': {
            options: {
                color: false,
                production: false,
                directory: 'bower_components'
            }
        },
        // To includes bower dependencies in  _includes/head.html file
        wiredep: {
            options: {
                baseUrl: '/freelance'
            },
            dev: {
                src: ['_includes/head.html', '_includes/foot.html'],
                ignorePath: /\.\./,
                // ignorePath : /\.\.\//, would write dependencies without the leading /
                exclude: []
            }
        },
        // To include js/*.js in _includes/foot.html file
        includeSource: {
            options: {
                baseUrl: 'freelance/'
            },
            dev: {
                files: {
                    '_includes/head.html': '_includes/head.html',
                    '_includes/foot.html': '_includes/foot.html'
                }
            },
            dist: {
                files: {
                    '../freelance-gh-pages/index.html': 'index.tpl.html'
                }
            }
        },
        clean: {
            dist: ['../freelance-gh-pages/*'],
            tmp: ['.tmp']
        },
        copy: {
            dist: {
                files: [
                    {
                        cwd: '_site',
                        expand: true,
                        src: ['CNAME'],
                        dest: '../freelance-gh-pages/'
                    },
                    {
                        cwd: '_site',
                        expand: true,
                        src: ['*.xml'],
                        dest: '../freelance-gh-pages/'
                    },
                    {
                        cwd: '_site',
                        expand: true,
                        src: ['**/*.html'],
                        dest: '../freelance-gh-pages/'
                    },
                    {
                        cwd: '_site',
                        expand: true,
                        src: ['img/**/*'],
                        dest: '../freelance-gh-pages/'
                    },
                    {
                        cwd: '_site',
                        expand: true,
                        src: ['css/**/*.css'],
                        dest: '../freelance-gh-pages/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome',
                        src: 'fonts/{,**/}*.*',
                        dest: '../freelance-gh-pages/'
                    }
                ]
            }
        },
        useminPrepare: {
            html: '_site/index.html',
            options: {
                dest: '../freelance-gh-pages/'
            }
        },
        usemin: {
            html: '../freelance-gh-pages/**/*.html',
            css: '../freelance-gh-pages/css/*.css',
            options: {
                basedir: '../freelance-gh-pages/',
                assetsDirs: ['./']
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: false,
                    removeCommentsFromCDATA: true
                }
                ,
                files: [{
                    expand: true,
                    cwd: '../freelance-gh-pages/',
                    src: ['*.html', '{,**/}*.html'],
                    dest: '../freelance-gh-pages/'
                }]
            }
        },
        'http-server': {
            'dist': {
                // the server root directory
                root: '../freelance-gh-pages'
            }
        },
        shell: {
            jekyll: {
                command: 'jekyll build'
            }
        }
    })
    ;

    grunt.loadNpmTasks('grunt-bower-install-simple');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-wiredep');

    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('build:dev', ['bower-install-simple', 'includeSource:dev', 'wiredep:dev']);

    grunt.registerTask('build:dist', [
        'build:dev',
        'shell:jekyll',
        'clean:dist',
        'copy:dist',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'usemin',
        'htmlmin:dist',
        'clean:tmp',
        'http-server:dist'
    ]);
}
;