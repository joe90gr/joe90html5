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
                options:require('./require.json')
            }
        },
        'sasso': {
            dev : {},
            dist : {}
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

    grunt.registerTask('test', ['']);
    grunt.registerTask('default', ['sass','requirejs', 'csso']);
};

