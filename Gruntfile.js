module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {'dist/<%= pkg.raw_path %>.js': 'src/<%= pkg.raw_path %>.coffee'}
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.raw_path %> - <%= pkg.authors %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/<%= pkg.raw_path %>.js',
        dest: 'dist/<%= pkg.raw_path %>.min.js'
      }
    },
    watch: {
      scripts: {
        files: ['src/*.coffee'],
        tasks: ['coffee', 'uglify'],
        options: {
          spawn: false,
        },
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['coffee', 'uglify']);

};
