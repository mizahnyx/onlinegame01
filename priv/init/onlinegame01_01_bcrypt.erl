-module(onlinegame01_01_bcrypt).
-export([init/0, stop/0]).

init() -> 
    bcrypt:start(). 

stop() -> 
    bcrypt:stop().
