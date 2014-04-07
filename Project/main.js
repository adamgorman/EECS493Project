/**
 * Created by Adam on 3/27/14.
 */

$("#login-form").submit(function() {
    var name = $('#login-form input:text[name=username]').val();
    var password = $('#login-form input:password[name=password]').val();
    if(name == "Username" && password == "Password") {
        $('#login-form input:text[name=username]').val("");
        $('#login-form input:password[name=password]').val("");
        $.mobile.changePage("main/main.html");
    }
    return false;
});
var inputType;
$(".input-popup-button").on("click", function(event) {
    inputType = event.target.text;
});