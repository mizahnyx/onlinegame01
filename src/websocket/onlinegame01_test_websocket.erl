-module(onlinegame01_test_websocket, [Req, SessionId]).
-compile(export_all).

init() ->
    {ok, []}.

handle_join(_ServiceURL, WebSocket, State) ->
    {noreply, State ++ [WebSocket]}.

handle_close(_Reason, _ServiceURL, WebSocket, State) -> 
    {noreply, [X || X <- State, X =/= WebSocket]}.

handle_incoming(_ServiceURL, WebSocket, Message, State) ->
    [X || X <- State, Message ! X],
    {noreply, State}.

handle_broadcast(_Message, State) ->
    {noreply, State}.

handle_info(_Info, State) ->
    {noreply, State}.

terminate(_Reason, _State) ->
    ok.
