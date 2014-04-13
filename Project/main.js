Parse.initialize("PAjzQPglIFtzZyMJfDPe5Ozvfzr7Pz1ukpHoLXct", "zTU8emhQIg5xTKZrhfF5ulrKnXQv4M6ztT9kFi90");
// Global Data
var constants = {
    achievementNumber: 5,
    achievementNames: ["A1", "A2", "A3", "A4", "A5"]
};
var websiteData = {
    inputType: null,
    compareFriend: null
};
var user = {
    username: "ToucanSam",
    pic: "tempProfilePictures/Toucan.PNG",
    goal: 120,
    weight: [],
    calories: [],
    exercise: [],
    achievements: []
};
var friends = [
    {username: "Leonardo.Lion", pic: "tempProfilePictures/Lion.PNG", goal: 175, weight: 200},
    {username: "BertDaBee", pic: "tempProfilePictures/Bee.PNG", goal: 20, weight: 17.5},
    {username: "Starcommander512", pic: "tempProfilePictures/Starfish.PNG", goal: 70, weight: 130}
];
var pendingRequests = [
    {username: "Froggy", pic: "tempProfilePictures/Frog.PNG", goal: 175}
];
var friendsRequests = [
    {username: "PPelican", pic: "tempProfilePictures/Pelican.PNG", goal: 175},
    {username: "WallaceHermanWhale", pic: "tempProfilePictures/Whale.PNG", goal: 1000}
];

// Global Functions
$(document).on("pagecontainerbeforeshow", function(event) {
    var pageId = $('body').pagecontainer('getActivePage').prop('id');
    if(pageId == "login-page") {
        loginPageInit();
    } else if(pageId == "input-popup") {
        inputPopupInit();
    } else if(pageId == "input-page") {
        inputPageInit();
    } else if(pageId == "friends-page") {
        friendsInit();
    } else if(pageId == "friend-compare-page") {
        friendCompareInit();
    } else if(pageId == "friend-request-popup") {
        friendRequestInit();
    } else if(pageId == "add-friend-popup") {
        addFriendInit();
    }
});

// Login Page
var loginPageInit = function() {
    $("#login-form").submit(function() {
        var name = $('#login-form input:text[name=username]').val();
        var password = $('#login-form input:password[name=password]').val();
        $('#login-form input:password[name=password]').val("");
        $('#login-form .form-error-text').text("");
        $.mobile.loading( 'show', {
            text: "Logging in...",
            textVisible: true
        });
        user = user = Parse.User.logIn(name, password, {
            success: function(user) {
                $.mobile.loading('hide');
                $.mobile.changePage("main/main.html");
            },
            error: function(user, error) {
                $.mobile.loading('hide');
                $('#login-form .form-error-text').text("Error: " + error.message);
            }
        });
        return false;
    });
};

// Input Page
var inputPageInit = function() {
    $('#input-page a').on('click', function (event) {
        websiteData.inputType = $(event.target).text();
    })
};

// Input Popup
var inputPopupInit = function() {
    if(websiteData.inputType == "Food") {
        $('div[data-role=header] h2').text("Food Input");
        $('label').text("Enter Your Calories Consumed Today:");
        $('input[type=number]').attr("placeholder", "Calories");
    } else if(websiteData.inputType == "Exercise") {
        $('div[data-role=header] h2').text("Exercise Input");
        $('label').text("Enter Your Hours Exercised Today:");
        $('input[type=number]').attr("placeholder", "Hours");
    } else {
        $('div[data-role=header] h2').text("Weight Input");
        $('label').text("Enter Your Current Weight:");
        $('input[type=number]').attr("placeholder", "Pounds");
    }

    $('#input-popup #input-form').on("submit", function() {
        var num = $('#input-form input[type=number]').val();
        if(num == "" || num == null) {
            $('#input-form .form-error-text').text("Please enter a value.");
        } else {
            var num = $('#input-form input[type=number]').val("");
            websiteData.inputType = null;
            $.mobile.changePage("input.html");
        }
        $('#input-form input:text').val("");
        return false;
    });
};

// Friends Page
var friendsInit = function() {
    var person = $('<li id="new-person" data-icon="recycle" class="friend"><a href="friendCompare.html">'+
        '<img>'+
        '<h2></h2>'+
        '<p>Goal: <span></span></p></a>'+
        '</li>');
    $('li.friend').remove();
    $('p').remove();

    if(friends == null || friends.length == 0) {
        $('#friends-header').after("<p style='padding: 0px 0px 0px 20px;'>No Current Friends</p>");
    } else {
        friends.forEach(function(friend) {
            $('#friends-header').after(person.clone());
            $('li#new-person img').attr('src', friend.pic);
            $('li#new-person h2').text(friend.username);
            $('li#new-person p span').text("Some goal");
            $('li#new-person').removeAttr('id');
        });
    }

    if(pendingRequests == null || pendingRequests.length == 0) {
        $('#pending-requests-header').after("<p style='padding: 0px 0px 20px 20px;'>No Current Pending Requests</p>");
    } else {
        pendingRequests.forEach(function(friend) {
            $('#pending-requests-header').after(person.clone());
            $('li#new-person img').attr('src', friend.pic);
            $('li#new-person h2').text(friend.username);
            $('li#new-person p span').text("Some goal");
            $('li#new-person').removeAttr('id');
        });
    }

    $('ul#friends-list').listview('refresh');
};

// Friends Compare Page
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
    $('tr.exercise-row td.personal-cell span').text("16");
    $('tr.exercise-row td.friend-cell span').text("0");

    // achievements
    for(i = 1; i <= constants.achievementNumber; i++) {
        var temp = "tr.achievement" + i + "-row td.personal-cell";
        if(i % 2 == 0) { //change this compare with database info
            $(temp).text("X");
        } else {
            $(temp).text("-");
        }
    }
    for(i = 1; i <= constants.achievementNumber; i++) {
        var temp = "tr.achievement" + i + "-row td.friend-cell";
        if(i % 2 == 1) { //change this compare with database info
            $(temp).text("X");
        } else {
            $(temp).text("-");
        }
    }
};

// Friend Requests Page
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
    checkNoFriendRequests();
    $(".confirm-button").on('click', function(event) {
        $(event.target).closest('li').remove();
        checkNoFriendRequests();
    });
    $(".deny-button").on('click', function(event) {
        $(event.target).closest('li').remove();
        checkNoFriendRequests();
    });
};
var checkNoFriendRequests = function() {
    if($('ul#friend-request-list li').size() == 0) {
        $('#no-friend-requests').show();
    } else {
        $('#no-friend-requests').hide();
    }
};

// Add Friend Popup
var addFriendInit = function() {
    $('#add-friend-popup #add-friend-form').on("submit", function() {
        var username = $('#add-friend-popup input[type=text]').val();
        $('#add-friend-popup input[type=text]').val("");
        if(username == 'BertDaBee') { // already friend
            $('#add-friend-popup .form-error-text').text(username + " is already your friend.");
        } else if(username == 'Adam') { // friend request processing
            $('#add-friend-popup .form-error-text').text("Request to " + username + " is pending.");
        } else {
            // some server stuff
            $.mobile.changePage("friends.html");
        }
        return false;
    });
};