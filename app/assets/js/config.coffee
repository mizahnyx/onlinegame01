"use strict"
require.config
  paths:
    bower_components: "../../bower_components"
    jquery: "../../bower_components/jquery/dist/jquery"
    sammy: "../../bower_components/sammy/lib/sammy"
    "socket.io-client": "../../bower_components/socket.io-client/dist/socket.io"
    "knockout.validation": "../../bower_components/knockout.validation/" +
      "Dist/knockout.validation"
    "jquery.bootstrap": "../../bower_components/bootstrap-sass/" +
      "dist/js/bootstrap"
    bacon: "../../bower_components/bacon/dist/Bacon"
    threejs: "../../bower_components/threejs/build/three"
    cannonjs: "../../bower_components/threex.cannonjs/vendor/cannon.js/" +
      "build/cannon"
    "threex.cannonbody": "../../bower_components/threex.cannonjs/" +
      "threex.cannonbody"
    "threex.cannonworld": "../../bower_components/threex.cannonjs/" +
      "threex.cannonworld"

  shim:
    "jquery.bootstrap":
      deps: ["jquery"]

    "knockout.validation":
      deps: ["knockout"]

    "socket.io-client":
      exports: "io"

    "bacon":
      deps: ["jquery"]

    "threejs":
      exports: "THREE"

  map:
    "*":
      knockout: "../../bower_components/knockout.js/knockout"
      ko: "../../bower_components/knockout.js/knockout"


# Use the debug version of knockout in development only
# global window:true
if window.knockoutBootstrapDebug
  require.config map:
    "*":
      knockout: "../../bower_components/knockout.js/knockout.debug.js"
      ko: "../../bower_components/knockout.js/knockout.debug.js"

unless window.requireTestMode
  require ["main"], ->

