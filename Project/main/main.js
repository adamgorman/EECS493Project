/**
 * Created by Adam on 3/27/14.
 */

$("#login-form").submit(function() {
    var name = $('#login-form input:text[name=username]').val();
    var password = $('#login-form input:password[name=password]').val();
    if(name == "Username" && password == "Password") {
        window.location.replace("main.html");
    }
    return false;
});