%% http://shane.logsdon.io/erlang/implementing-user-authentication-with-bcrypt-in-chicagoboss/

-module(onlinegame01_user_controller, [Req]).
-compile(export_all).

login('GET', []) ->
    {ok, [{redirect, Req:header(referer)}]};

login('POST', []) ->
    Username = Req:post_param("username"),
    case boss_db:find(user_account, [{username, Username}], [{limit, 1}]) of
        [UserAccount] ->
            case UserAccount:check_password(Req:post_param("password")) of
                true ->
                   {redirect, proplists:get_value("redirect",
                       Req:post_params(), "/"), UserAccount:set_login_cookies()};
                false ->
                    {ok, [{error, "Password mismatch"}]}
            end;
        [] ->
            {ok, [{error, "User not found"}]}
    end.

register('GET', []) ->
    {ok, []};

register('POST', []) ->
    Email = Req:post_param("email"),
    Username = Req:post_param("username"),
    {ok, Password} = user_lib:hash_password(Req:post_param("password")),
    UserAccount = user_account:new(id, Email, Username, Password),
    Result = UserAccount:save(),
    {ok, [Result]}.
