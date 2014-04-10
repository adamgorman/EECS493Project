/**
 * Created by Adam on 3/27/14.
 */

var model = {
    AchievementNumber: 5
};

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

$(document).on("pagecontainerbeforeshow", function(event) {
    var pageId = $('body').pagecontainer('getActivePage').prop('id');
    if(pageId == "friends-page") {
        friendsInit();
    } else if(pageId == "friend-compare-page") {
        friendCompareInit();
    } else if(pageId == "friend-request-popup") {
        friendRequestInit();
    }
    console.log(pageId);
});

var friendsInit = function() {
    var person = $('<li id="new-person"><a href="friendCompare.html">'+
        '<img>'+
        '<h2></h2>'+
        '<p>Goal: <span></span></p></a>'+
        '</li>');
    $('ul#friends-list').append(person.clone());
    $('li#new-person img').attr('src', 'tempProfilePictures/Starfish.PNG');
    $('li#new-person h2').text("Sid Starfish");
    $('li#new-person p span').text("Gain 100 lb");
    $('li#new-person').removeAttr('id');

    $('ul#friends-list').append(person.clone());
    $('li#new-person img').attr('src', 'tempProfilePictures/Lion.PNG');
    $('li#new-person h2').text("Leo Lion");
    $('li#new-person p span').text("Maintain Weight");
    $('li#new-person').removeAttr('id');

    $('ul#friends-list').append(person.clone());
    $('li#new-person img').attr('src', 'tempProfilePictures/Bee.PNG');
    $('li#new-person h2').text("Bert Bee");
    $('li#new-person p span').text("Lose 0.4 lb");
    $('li#new-person').removeAttr('id');

    $('ul#friends-list').listview('refresh');
};

var friendCompareInit = function() {
    // names
    $('#friend-name-cell').text("Sid Starfish");

    // pictures

    // weights
    $('tr.weight-row td.personal-cell span').text("15");
    $('tr.weight-row td.friend-cell span').text("7");

    // calories
    $('tr.calories-row td.personal-cell span').text("1250");
    $('tr.calories-row td.friend-cell span').text("380");

    // exercise
    $('tr.exercise-row td.personal-cell span').text("50");
    $('tr.exercise-row td.friend-cell span').text("0");

    // achievements
    for(i = 1; i <= model.AchievementNumber; i++) {
        var temp = "tr.achievement" + i + "-row td.personal-cell";
        if(i % 2 == 0) { //change this compare with database info
            $(temp).text("X");
        } else {
            $(temp).text("-");
        }
    }
    for(i = 1; i <= model.AchievementNumber; i++) {
        var temp = "tr.achievement" + i + "-row td.friend-cell";
        if(i % 2 == 1) { //change this compare with database info
            $(temp).text("X");
        } else {
            $(temp).text("-");
        }
    }
};

var friendRequestInit = function() {
    var person = $('<li id="new-person">'+
        '<img>'+
        '<h2>'+
        '<span class="friend-request-list-name"></span>'+
        '<span class="friend-request-list-button-holder">'+
        '<a class="confirm-button ui-btn ui-corner-all ui-icon-check ui-btn-icon-notext ui-btn-inline" href="#"></a>'+
        '<a class="deny-button ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-inline" href="#"></a>'+
        '</span>'+
        '</h2>'+
        '</li>');
    $('ul#friend-request-list').append(person.clone());
    $('li#new-person img').attr('src', 'tempProfilePictures/Pelican.PNG');
    $('li#new-person span.friend-request-list-name').text("Patrick Pelican");
    $('#new-person').removeAttr('id');
    $('ul#friend-request-list').append(person.clone());
    $('li#new-person img').attr('src', 'tempProfilePictures/Whale.PNG');
    $('li#new-person span.friend-request-list-name').text("Walter Whale");
    $('li#new-person').removeAttr('id');
    $('ul#friend-request-list').append(person.clone());
    $('li#new-person img').attr('src', 'tempProfilePictures/Frog.PNG');
    $('li#new-person span.friend-request-list-name').text("Frank Frog");
    $('li#new-person').removeAttr('id');

    $('ul#friend-request-list').listview('refresh');
};