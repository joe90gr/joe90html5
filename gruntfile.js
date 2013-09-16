module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [{expand: true, cwd: 'development/',
                    src: ['**'], dest: 'production/'}]
            }
        },
        csso:{
            main:{
                options:{
                    restructure:true
                },
                baseUrl:"production/",
                files:[
                    {src:'production/css/layout.css', dest:'production/css/layout.css'}
                ]
            }
        },
        sass: {
            options: {
                style: '{{expanded}}'
            },
            dist: {
                files: {
                    'development/css/layout.css': 'development/css/sass/*.scss'
                }
            }
        },
        jshint: {
            all: [
                'development/js/components/**/*.js',
                'development/js/pages/**/*.js',
                'development/js/*.js'
            ],
            options:{
                strict: false
            }
        },
        watch: {
            sass: {
                files: ['development/css/sass/*.scss'],
                tasks: ['sass'],
                options: { debounceDelay: 250 }
            },
            js: {
                files: [
                    'development/**/*.js',
                    'development/*.js'
                ],
                tasks: ['jshint'],
                options: { debounceDelay: 250 }
            }
        },
        requirejs: {
            compile:{
                options:   {
                    "appDir":"development",
                    "baseUrl":"./",
                    "dir":"production",
                    "optimize":"uglify2",
                    "optimizeCss":"none",
                    "fileExclusionRegExp":"styles|vendor|node_modules|.*min\\.js|test$",
                    "preserveLicenseComments":false
                }
            }
        },
        'sasso': {
            dev : {},
            dist : {}
        },
        // karmatask call from cmd line:
        // 1. specific file:    grunt karma:unit --file=<filepath>    (relative to components folder)
        // 2. all files:        grunt karma:cont
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                options: {
                    files: [
                        {pattern: 'development/js/**/*.js', included: false},
                        {pattern: 'test/components/' + grunt.option('file') + '.js', included: false},
                        'test/test-main.js'
                    ]
                }
            },
            cont: {
                configFile: 'karma.conf.js'
            }
        }
    });

    grunt.registerMultiTask('sasso','blah', function(){
        var sassjson = JSON.parse(JSON.stringify(grunt.config().sass).replace( /{{expanded}}/g, 'expanded' ));
        grunt.config('sass',sassjson);
        grunt.task.run('sass');
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['sass', 'jshint', 'requirejs', 'csso']);
};

