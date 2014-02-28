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
          optimize: 'none',
          modules: [
            {
              name: "main"
            }
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['requirejs']);
};