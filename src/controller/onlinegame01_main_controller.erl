-module(onlinegame01_main_controller, [Req]).
-compile(export_all).

hello('GET', []) ->
    {output, "<strong>Mizahnyx says hello!</strong>"}.

