"use strict"

# global io:true

# global define:true
define ["socket.io-client"], ->
  (UI) ->
    self = this
    
    # saving knockout model
    self.UI = UI
    socket = io.connect("http://localhost")
    
    # global window:true
    
    # Rewriting emit to add debugging information in console
    if window.knockoutBootstrapDebug
      (->
        $emit = socket.$emit
        socket.$emit = ->
          args = Array::slice.call(arguments)
          $emit.apply socket, ["*"].concat(args)
          $emit.apply socket, ["default"].concat(args) \
            unless $emit.apply(socket, arguments)
          return

        emit = socket.emit
        socket.emit = ->
          console.log "==> ", arguments[0], arguments[1]
          emit.apply socket, arguments
          return

        socket.on "default", (event, data) ->
          console.log "Event not trapped: " + event + " - data:" +
            JSON.stringify(data)
          return

        socket.on "*", (event, data) ->
          console.log "<== ", event, data
          return

        return
      )()
    
    # Events
    socket.on "message", (data) ->
      UI.messageReceived UI.messageReceived() + data.message + "\n"
      return

    
    # Actions
    self.sendBroadcastMessage = ->
      if UI.message.isValid()
        socket.emit "send_message",
          message: self.UI.message()

      return

    return

