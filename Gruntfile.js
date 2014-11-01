'use strict';
var SERVER_PORT = 9000;
var TEST_PORT = 9000;
var LIVERELOAD_PORT = 35729;
// the livereload script is not inserted when running grunt test
// if the TEST_PORT is not 9000. You win a cookie if you find why

module.exports = function (grunt) {

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'priv/static',
    tmpl: 'src/view'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration.
    clean: {
      dist: [
        '<%= yeoman.dist %>/*',
        '!<%= yeoman.dist %>/chicago-boss.png',
        '<%= yeoman.tmpl %>/*',
        '!<%= yeoman.tmpl %>/lib/**',
        '<%= yeoman.app %>/assets/js/**/*.js'
      ]
    },
    wait: {
      longtime: {
        options: {
          delay: 1000000
        }
      }
    },
    replace: {
      dist: {
        src: '<%= yeoman.app %>/assets/scss/main.scss',
        overwrite: true,
        replacements: [{
          from: /\$icon\-font\-path:.*/g,
          to: '$icon-font-path: \'../fonts\';'
        }, {
          from: /\$fa\-font\-path:.*/g,
          to: '$fa-font-path: \'../fonts\';'
        }]
      },
      server: {
        src: '<%= yeoman.app %>/assets/scss/main.scss',
        overwrite: true,
        replacements: [{
          from: /\$icon\-font\-path:.*/g,
          to: '$icon-font-path: \'../../bower_components/bootstrap-sass/fonts\';'
        }, {
          from: /\$fa\-font\-path:.*/g,
          to: '$fa-font-path: \'../../bower_components/font-awesome/fonts\';'
        }]
      }
    },
    copy: {
      html: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.tmpl %>',
          src: [
            '**/*.html',
            '!**/bower_components/**'
          ]
        }],
    
        options: {
          process: function (content) {
            // Modify html for production
            return content.replace(
              //change location of require.js in production
              /data-main=\"assets\/js\/config\" src=\"bower_components\/requirejs\/require\.js\"/g,
              'src="assets/js/require.min.js"'
              ).replace(
              //Remove flag specifying we are in dev mode
              /<script>window\.knockoutBootstrapDebug = true;<\/script>/g,
              ''
              );
          }
        }
      },
      bootstrap: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/bower_components/bootstrap-sass/dist/fonts',
            dest: '<%= yeoman.dist %>/assets/fonts',
            src: [
              '*'
            ]
          }
        ]
      },
      fontawesome: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/bower_components/font-awesome/fonts',
            dest: '<%= yeoman.dist %>/assets/fonts',
            src: [
              '*'
            ]
          }
        ]
      },
      projectfiles: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              'robots.txt',
              'favicon.ico'
            ]
          }
        ]
      },
      gamedata: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/assets/gamedata',
            dest: '<%= yeoman.dist %>/assets/gamedata',
            src: [
              '*'
            ]
          }
        ]
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/assets/scss',
        imagesDir: '<%= yeoman.app %>/assets/images',
        javascriptDir: '<%= yeoman.app %>/assets/js',
        fontsDir: '<%= yeoman.app %>/assets/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        relativeAssets: true,
        debugInfo: false
      },
      dist: {
        options: {
          cssDir: '<%= yeoman.dist %>/assets/css',
          noLineComments: true,
          outputStyle: 'compressed'
        }
      },
      server: {
        options: {
          cssDir: '<%= yeoman.app %>/assets/css'
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['<%= yeoman.app %>/bower_components/requirejs/require.js',
                '<%= yeoman.dist %>/assets/js/require.js'],
        dest: '<%= yeoman.dist %>/assets/js/require.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: function(path) {
          return path + ".map";
        },
        mangle: false,
        compress: false,
        beautify: true
      },
      dist: {
        src: '<%= yeoman.dist %>/assets/js/require.js',
        dest: '<%= yeoman.dist %>/assets/js/require.min.js'
      }
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      js: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['<%= yeoman.app %>/assets/js/**/*.js']
      }
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:' + TEST_PORT + '/index.html']
        }
      }
    },
    focus: {
      dev: {
        exclude: ['test']
      },
      test: {
        include: ['test']
      }
    },
    watch: {
      options: {
        livereload: LIVERELOAD_PORT
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: '<%= jshint.js.src %>',
        tasks: ['jshint:js']
      },
      css: {
        files: '<%= yeoman.app %>/assets/css/*.css'
      },
      html: {
        files: '<%= yeoman.app %>/**/*.html'
      },
      jade: {
        files: '<%= yeoman.app %>/jade/**/*.jade',
        tasks: ['jade']
      },
      compass: {
        files: '<%= yeoman.app %>/assets/scss/*.scss',
        tasks: ['compass:server']
      },
      //coffeelint: {
      //  files: '<%= yeoman.app %>/**/*.coffee',
      //  tasks: ['coffeelint:dist']
      //},
      coffee: {
        files: '<%= yeoman.app %>/**/*.coffee',
        tasks: ['coffee:dist']
      },
      test: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: ['<%= yeoman.app %>/assets/js/{,*/}/*.js', 'test/spec/{,*/}/*.js'],
        tasks: ['test:true']
      }
    },
    jade: {
      html: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/jade',
          src: ['{,*/}*.jade', '!**/_*'],
          dest: '<%= yeoman.app %>',
          ext: '.html'
        }],
        options: {
          client: false,
          pretty: true,
          basedir: '<%= yeoman.app %>/jade'
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          name: 'config',
          mainConfigFile: '<%= yeoman.app %>/assets/js/config.js',
          out: '<%= yeoman.dist %>/assets/js/require.js',
          optimize: 'none'
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:' + SERVER_PORT
      },
      test: {
        path: 'http://localhost:' + TEST_PORT
      }
    },
    express: {
      /* jshint camelcase: false */
      options: {
        port: SERVER_PORT,
        script: 'server/server.js'
      },
      server: {
        options: {
          debug: true,
          node_env: 'development'
        }
      },
      dist: {
        options: {
          debug: false,
          node_env: 'production'
        }
      },
      test: {
        options: {
          port: TEST_PORT,
          debug: true,
          node_env: 'test'
        }
      }
    },
    coffeelint: {
      dist: ['<%= yeoman.app %>/assets/js/**/*.coffee']
    },
    coffee: {
      dist: {
        expand: true,
        cwd: '<%= yeoman.app %>/assets/js',
        src: ['**/*.coffee'],
        dest: '<%= yeoman.app %>/assets/js/',
        ext: '.js'
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'replace:dist',
    'compass:dist',
    'jade:html',
    'coffeelint:dist',
    'coffee:dist',
    'requirejs',
    'concat',
    'copy',
    'uglify'
  ]);
  
  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run([
        'jshint',
        'build',
        'express:dist',
        'open:server',
        'wait:longtime'
      ]);
    }

    grunt.task.run([
      'replace:server',
      'compass:server',
      'express:server',
      'open:server',
      'focus:dev'
    ]);
  });

  grunt.registerTask('test', function (isConnected) {
    // isConnected is true when started from watch
    isConnected = Boolean(isConnected);
    var testTasks = [
      'clean',
      'replace:server',
      'compass',
      'express:test',
      'mocha',
      'open:test',
      'focus:test'
    ];

    if (isConnected) {
      // already connected so not going to connect again, remove the connect:test task
      testTasks.splice(testTasks.indexOf('open:test'), 1);
      testTasks.splice(testTasks.indexOf('express:test'), 1);
    }

    return grunt.task.run(testTasks);
  });
};
