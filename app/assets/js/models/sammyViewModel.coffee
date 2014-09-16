"use strict"

# global define:true
define [
  "jquery"
  "knockout"
  "sammy"
], ($, ko, Sammy) ->
  ->
    self = this
    self.chosenFolderId = ko.observable()
    self.goToFolder = (folder) ->
      self.chosenFolderId folder
      return

    self._sammy = new Sammy(->
      @get "#:folder", ->
        self.chosenFolderId @params.folder
        return

      @get "", ->
        @app.runRoute "get", "#home"
        return

      return
    )
    self._sammy.run()
    return

