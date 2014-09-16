-module(onlinegame01_main_controller, [Req, SessionID]).
-compile(export_all).

hello('GET', []) ->
    {output, "<strong>Mizahnyx says hello!</strong>"}.

login('GET', []) ->
    ok.
