module.exports = function(grunt) {

  grunt.initConfig({
    env : {
      url : "http://localhost:8001/web-static-demo"
    },
    qunit : {
      all : {
        options : {
          urls : [
              '<%= env.url %>/jquery/js/jquery.cookie.js.test.html',
              '<%= env.url %>/static/js/jquery.cookie.extend.js.test.html',
              '<%= env.url %>/static/js/jquery.cookie.menu.js.test.html',
              '<%= env.url %>/async/js/async.test.html',
              '<%= env.url %>/require/js/require.test.html',
              ]
        }
      }
    },
    connect : {
      server : {
        options : {
          port : 8001,
          base : '../'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.registerTask('default', ['connect', 'qunit']);

};