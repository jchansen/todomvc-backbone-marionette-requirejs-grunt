module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      compile: {
        options: {
          mainConfigFile: "public/app/main.js",
          appDir: 'public',
          baseUrl: 'app',
          dir: "public_compiled",
          removeCombined: true,
          //optimize: 'none',
          modules: [
            {
              name: "main"
            }
          ]
        }
      }
    },

    sass: {
      compile: {
        options: {
          style: 'nested'
        },
        files: [
          {
            expand: true,
            cwd: './public/stylesheets/',
            src: ['all.scss'],
            dest: './public/stylesheets',
            ext: '.css'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['sass', 'requirejs']);
};