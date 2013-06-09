module.exports = function(grunt) {
	grunt.initConfig({
        copy: {
            main: {
                files: [{expand: true, cwd: 'development/', src: ['**'], dest: 'production/'}]
            }
        },
        compress:{
            main:{
                options:{
                    mode: 'gzip'
                },
                expand: true,
                cwd: 'production/',
                src: ['**'],
                dest: 'zipped'
            }
        },
        sass: {
            options: {
                style: 'expanded'
            },
            dist: {
                files: {
                    'development/css/layout.css': 'development/css/sass/layout.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['development/**/layout.scss'],
                tasks: ['sass']
            }
        },
		uglify: {
			my_target: {
				files: {
					'js/output.min.js': ['development/js/myJs.js']
				}
			}
		}
	});

    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['compress', 'copy']);
};

