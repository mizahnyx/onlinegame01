"use strict"

# global define:true
define [
  "jquery"
  "knockout"
  "../../assets/js/models/appViewModel.js"
  "../../assets/js/appSocketIO.js"
  "threejs"
  "threex-colladaloader"
  "jquery.bootstrap"
  "bacon"
], ($, ko, AppViewModel, AppSocketIO, THREE) ->
  UI = new AppViewModel()
  
  # creating new object to manage socket.io events / connection
  # this object has the knockout view model as parameter
  UI.socketIO = new AppSocketIO(UI)
  ko.applyBindings UI

  # bacon.js example
  up = ($ '#baconjs_up').asEventStream 'click'
  down = ($ '#baconjs_down').asEventStream 'click'
  counter = (up.map 1).merge(down.map(-1)).scan(0, (x, y) -> x + y)
  counter.assign ($ '#baconjs_counter'), 'text'

  # three.js example
  $threejs_container = ($ '#threejsContainer')
  WIDTH = $threejs_container.width()
  HEIGHT = (WIDTH * 9) / 16
  VIEW_ANGLE = 45
  ASPECT = WIDTH / HEIGHT
  NEAR = 0.1
  FAR = 10000
  renderer = new THREE.WebGLRenderer()
  camera = new THREE.PerspectiveCamera VIEW_ANGLE, ASPECT, NEAR, FAR
  scene = new THREE.Scene()
  scene.add camera
  camera.position.z = 20
  renderer.setSize WIDTH, HEIGHT
  $threejs_container.append renderer.domElement

  geometry = new THREE.BoxGeometry 1, 1, 1
  material = new THREE.MeshLambertMaterial {color: 0x00ff00}
  cube = new THREE.Mesh geometry, material
  scene.add cube
  
  # loader = new THREE.ObjectLoader()
  # loader.load "../../static/assets/gamedata/spaceship01.json", (obj) ->
  #   material = new THREE.MeshLambertMaterial {
  #     map: THREE.ImageUtils.loadTexture \
  #       "../../static/assets/gamedata/spaceship01.png"
  #   }
  #   mesh = new THREE.Mesh obj, material
  #   scene.add mesh

  updateFn = () -> null
  loader2 = new THREE.ColladaLoader()
  console.log loader2
  loader2.load "../../static/assets/gamedata/spaceship01.dae", (obj) ->
    ship = obj.scene
    scene.add ship
    updateFn = () ->
      ship.rotation.x += 0.1
      ship.rotation.y += 0.1

  pointLight = new THREE.PointLight 0xFFFFFF
  pointLight.position.x = 5
  pointLight.position.y = 25
  pointLight.position.z = 65
  scene.add pointLight

  render = ->
    requestAnimationFrame render
    updateFn()
    renderer.render scene, camera

  render()
  
  return

  

