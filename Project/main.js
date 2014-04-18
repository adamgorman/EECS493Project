Parse.initialize("PAjzQPglIFtzZyMJfDPe5Ozvfzr7Pz1ukpHoLXct", "zTU8emhQIg5xTKZrhfF5ulrKnXQv4M6ztT9kFi90");

// Global Data
var constants = {

};
var websiteData = {
    inputType: null,
    compareFriend: null,
    targetToDelete: null
};
var user;
var friends = [];
var sentRequests = [];
var pendingRequests = [];
var inputTemplate = {
    dateNum: null,
    dateString: null,
    value: null
};

// Global Functions
$(document).on("pagecontainerbeforeshow", function(event) {
    var pageId = $('body').pagecontainer('getActivePage').prop('id');
    initForAll();
    if(pageId == "login-page") {
        loginPageInit();
    } else if(pageId == "logout-popup") {
        logoutPageInit();
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
var compareUsersByUsername = function(a, b) { //intentionally backwards
    if(a.attributes.username > b.attributes.username)
        return -1;
    else if(a.attributes.username < b.attributes.username)
        return 1;
    else
        return 0;
};
var initForAll = function() {
    $.mobile.loading('hide');
    $('span.ui-li-count').text(pendingRequests.length);
};

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
        user = Parse.User.logIn(name, password, {
            success: function(user) {
                setUserInformation(user);
            },
            error: function(user, error) {
                $.mobile.loading('hide');
                $('#login-form .form-error-text').text("Error: " + error.message);
            }
        });
        return false;
    });
};
var setUserInformation = function(rUser) {
    user = rUser;
    // sent friend requests
    user.get('sentRequests').forEach(function(fUsername, index, array) {
        new Parse.Query(Parse.User).equalTo("username", fUsername).find({
            success: function(buddy) {
                sentRequests.push(buddy[0]);
            }
        });
    });
    // pending friend requests
    user.get('pendingRequests').forEach(function(fUsername, index, array) {
        new Parse.Query(Parse.User).equalTo("username", fUsername).find({
            success: function(buddy) {
                pendingRequests.push(buddy[0]);
            }
        });
    });
    // friends
    user.get('friendUsernames').forEach(function(fUsername, index, array) {
        new Parse.Query(Parse.User).equalTo("username", fUsername).find({
            success: function(buddy) {
                friends.push(buddy[0]);
                if(array.length - 1 == index) $.mobile.changePage("main/main.html");
            }
        });
    });
    if(user.get('friendUsernames').length == 0)
        $.mobile.changePage("main/main.html");
};

// Logout Page
var logoutPageInit = function() {
    $('#logout-button').on('click', function() {
        Parse.User.logOut();
        user = null;
        friends = [];
        sentRequests = [];
        pendingRequests = [];
        $.mobile.changePage('../index.html');
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
        $.mobile.loading( 'show', {
            text: "Adding input...",
            textVisible: true
        });
        var num = $('#input-form input[type=number]').val();
        if(num == "" || num == null) {
            $('#input-form .form-error-text').text("Please enter a value.");
            $.mobile.loading('hide');
        } else if(num < 0) {
            $('#input-form .form-error-text').text("Value should not negative.");
            $.mobile.loading('hide');
        } else {
            var input = $.extend({},inputTemplate);
            var date = new Date();
            input.dateNum = Date.now();
            input.dateString = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
            input.value = num;
            if(websiteData.inputType == "Food") {
                user.get('calorieEntries').push(input);
            } else if(websiteData.inputType == "Exercise") {
                user.get('exerciseEntries').push(input);
            } else {
                user.get('weightEntries').push(input);
            }
            user.save(null, {
                success: function() {
                    $('#input-form input[type=number]').val("");
                    websiteData.inputType = null;
                    $.mobile.changePage("input.html");
                }
            });
        }
        $('#input-form input[type=number]').val("");
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
        friends.sort(compareUsersByUsername);
        friends.forEach(function(friend, index) {
            $('#friends-header').after(person.clone());
            $('li#new-person img').attr('src', friend.get('pic').url());
            $('li#new-person h2').text(friend.get('username'));
            $('li#new-person p span').text("Some goal");
            $('li#new-person').data("friend-index", index).removeAttr('id');
        });
    }
    if(sentRequests == null || sentRequests.length == 0) {
        $('#sent-requests-header').after("<p style='padding: 0px 0px 20px 20px;'>No Current Sent Requests</p>");
    } else {
        sentRequests.sort(compareUsersByUsername);
        sentRequests.forEach(function(friend) {
            $('#sent-requests-header').after(person.clone());
            $('li#new-person img').attr('src', friend.get('pic').url());
            $('li#new-person h2').text(friend.get('username'));
            $('li#new-person p span').text("Some goal");
            $('li#new-person').removeAttr('id').addClass('ui-disabled');
        });
    }

    $('ul#friends-list').listview('refresh');

    $('ul#friends-list li').on('click', function(event) {
        websiteData.compareFriend = friends[$(event.target).closest('li').data("friend-index")].attributes;
    })
};

// Friends Compare Page
var friendCompareInit = function() {
    // names
    $('#friend-name-cell').text(websiteData.compareFriend.username);

    // pictures
    $('#compare-me-pic').attr('src', user.get('pic').url());
    $('#compare-friend-pic').attr('src', websiteData.compareFriend.pic.url());

    // weights
    $('tr.weight-row td.personal-cell span').text("Weight");
    $('tr.weight-row td.friend-cell span').text("Weight");

    // calories
    $('tr.calories-row td.personal-cell span').text("Cal");
    $('tr.calories-row td.friend-cell span').text("Cal");

    // exercise
    $('tr.exercise-row td.personal-cell span').text("Workout");
    $('tr.exercise-row td.friend-cell span').text("Workout");

    // achievements
    for(i = 0; i <= user.get('achievementArray').length; i++) {
        if(user.get('achievementArray')[i] == 0) {
            $("tr.achievement" + i + "-row td.personal-cell").text("-");
        } else {
            $("tr.achievement" + i + "-row td.personal-cell").text("X");
        }
    }
    for(i = 0; i <= user.get('achievementArray').length; i++) {
        if(websiteData.compareFriend.achievementArray[i] == 0) {
            $("tr.achievement" + i + "-row td.friend-cell").text("-");
        } else {
            $("tr.achievement" + i + "-row td.friend-cell").text("X");
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
    if(pendingRequests != null) {
        pendingRequests.sort(compareUsersByUsername);
        pendingRequests.forEach(function (friend, index) {
            $('ul#friend-request-list').append(person.clone());
            $('li#new-person img').attr('src', friend.get('pic').url());
            $('li#new-person span.friend-request-list-name').text(friend.get('username'));
            $('#new-person').data("pending-index", index).removeAttr('id');
        });
    }
    checkNoFriendRequests();
    $('ul#friend-request-list').listview('refresh');
    $(".confirm-button").on('click', function(event) {
        return confirmClickForRequests();
    });
    $(".deny-button").on('click', function(event) {
        return denyClickForRequests();
    });
};
var checkNoFriendRequests = function() {
    if($('ul#friend-request-list li').size() == 0) {
        $('#no-friend-requests').show();
    } else {
        $('#no-friend-requests').hide();
    }
};
var confirmClickForRequests = function() {
    $.mobile.loading( 'show', {
        text: "Adding Friend...",
        textVisible: true
    });
    var index = $(event.target).closest('li').data("pending-index");
    var indexForFriend;
    var friend = pendingRequests[index];
    friend.get('friendUsernames').push(user.get('username'));
    friend.get('sentRequests').forEach(function(buddy, i) {
        if(buddy == user.get('username')) indexForFriend = i;
    });
    friend.get('sentRequests').splice(indexForFriend, 1);
    //* friend.save();
    user.get('friendUsernames').push(friend.get('username'));
    user.get('pendingRequests').splice(index, 1);
    websiteData.targetToDelete = $(event.target);
    user.save(null, {
        success: function() {
            friends.push(pendingRequests[index]);
            pendingRequests.splice(index, 1);
            websiteData.targetToDelete.closest('li').remove();
            $.mobile.loading('hide');
            checkNoFriendRequests();
            $('#friend-request-popup .form-confirm-text').text("You and " + friend.get('username') + " are now friends.");
        }
    });
    return false;
};
var denyClickForRequests = function() {
    var index = $(event.target).closest('li').data("pending-index");
    user.get('pendingRequests').splice(index, 1);
    user.save();
    var nonFriend = pendingRequests[index];
    nonFriend.get('sentRequests').forEach(function(buddy, i) {
        if(buddy == user.get('username')) indexForFriend = i;
    });
    nonFriend.get('sentRequests').splice(indexForFriend, 1);
    //* nonFriend.save();
    pendingRequests.splice(index, 1);
    $(event.target).closest('li').remove();
    checkNoFriendRequests();
    return false;
};

// Add Friend Popup
var addFriendInit = function() {
    $('#add-friend-popup #add-friend-form').on("submit", function() {
        $.mobile.loading( 'show', {
            text: "Adding a Friend...",
            textVisible: true
        });
        var username = $('#add-friend-popup input[type=text]').val();
        $('#add-friend-popup input[type=text]').val("");
        var index = alreadyPending(username);
        if(alreadyFriend(username)) { // already friend
            $.mobile.loading('hide');
            $('#add-friend-popup .form-error-text').text(username + " is already your friend.");
        } else if(alreadyRequested(username)) { // friend request processing
            $.mobile.loading('hide');
            $('#add-friend-popup .form-error-text').text("Request to " + username + " is already sent.");
        } else if(username == user.get('username')) {
            $.mobile.loading('hide');
            $('#add-friend-popup .form-error-text').text("Cannot be friends with yourself.");
        } else if(index  != -1) {
            var indexForFriend;
            var friend = pendingRequests[index];
            friend.get('friendUsernames').push(user.get('username'));
            friend.get('sentRequests').forEach(function(buddy, i) {
                if(buddy == user.get('username')) indexForFriend = i;
            });
            friend.get('sentRequests').splice(indexForFriend, 1);
            //* friend.save();
            user.get('friendUsernames').push(friend.get('username'));
            user.get('pendingRequests').splice(index, 1);
            user.save(null, {
                success: function() {
                    friends.push(pendingRequests[index]);
                    pendingRequests.splice(index, 1);
                    $.mobile.changePage("friends.html");
                }
            });
        } else {
            getPersonForRequest(username);
        }
        return false;
    });
};
var alreadyFriend = function(username) {
    friends.forEach(function(buddy) {
        if(buddy.get('username') == username) {
            return true;
        }
    });
    return false;
};
var alreadyRequested = function(username) {
    sentRequests.forEach(function(buddy) {
        if(buddy.get('username') == username) {
            return true;
        }
    });
    return false;
};
var alreadyPending = function(username) {
    pendingRequests.forEach(function(buddy, index) {
        if(buddy.get('username') == username) {
            return index;
        }
    });
    return -1;
};
var getPersonForRequest = function(username) {
    new Parse.Query(Parse.User).equalTo("username", username).find({
        success: function(buddy) {
            if(buddy.length == 0) {
                $.mobile.loading('hide');
                $('#add-friend-popup .form-error-text').text(username + " does not exist.");
            } else {
                user.get('sentRequests').push(buddy[0].get('username'));
                user.save();
                buddy[0].get('pendingRequests').push(user.get('username'));
                //* buddy[0].save();
                sentRequests.push(buddy[0]);
                $.mobile.changePage('friends.html');
            }
        }
    });
};
