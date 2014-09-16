-module(user_account, [Id, Email, Username, Password]).
-compile(export_all).

-define(SETEC_ASTRONOMY, "Too many secrets").

session_identifier() ->
    mochihex:to_hex(erlang:md5(?SETEC_ASTRONOMY ++ Id)).

check_password(PasswordAttempt) ->
    StoredPassword = erlang:binary_to_list(Password),
    user_lib:compare_password(PasswordAttempt, StoredPassword).

set_login_cookies() ->
    [ mochiweb_cookies:cookie("user_id", erlang:md5(Id), [{path, "/"}]),
      mochiweb_cookies:cookie("session_id", session_identifier(), [{path, "/"}]) ].
