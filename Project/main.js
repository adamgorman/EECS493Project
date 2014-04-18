Parse.initialize("PAjzQPglIFtzZyMJfDPe5Ozvfzr7Pz1ukpHoLXct", "zTU8emhQIg5xTKZrhfF5ulrKnXQv4M6ztT9kFi90");

// Global Data
var constants = {

};
var websiteData = {
    inputType: null,
    compareFriend: null
};
var user;

var friends = [];
var sentRequests = [];
var pendingRequests = [];

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
    else if(pageId == "feed"){
        addFriends();
    } else if(pageId == "page3"){
        achievementInit();
    }
    else if(pageId = "share_achievement"){
        shareInit();
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
    // friends
    user.get('friendUsernames').forEach(function(fUsername) {
        new Parse.Query(Parse.User).equalTo("username", fUsername).find({
            success: function(buddy) {
                friends.push(buddy[0]);
            }
        });
    });
    // sent friend requests
    user.get('sentRequests').forEach(function(fUsername) {
        new Parse.Query(Parse.User).equalTo("username", fUsername).find({
            success: function(buddy) {
                sentRequests.push(buddy[0]);
            }
        });
    });
    // pending friend requests
    user.get('pendingRequests').forEach(function(fUsername) {
        new Parse.Query(Parse.User).equalTo("username", fUsername).find({
            success: function(buddy) {
                pendingRequests.push(buddy[0]);
            }
        });
    });
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
    // friend.save();
    user.get('friendUsernames').push(friend.get('username'));
    user.get('pendingRequests').splice(index, 1);
    user.save({
        success: function() {
            friends.push(pendingRequests[index]);
            pendingRequests.splice(index, 1);
            $(event.target).closest('li').remove();
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
    // nonFriend.save();
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
            // add them as your friend
            // add you to their friends
            friends.push(pendingRequests[index]);
            pendingRequests.splice(index, 1);
            $.mobile.changePage("friends.html");
        } else {
            getPersonForRequest(username);
        }
        return false;
    });
};
var alreadyFriend = function(username) {
    var result = false;
    friends.forEach(function(buddy) {
        if(buddy.get('username') == username) {
            result = true;
        }
    });
    return result;
};
var alreadyRequested = function(username) {
    var result = false;
    sentRequests.forEach(function(buddy) {
        if(buddy.get('username') == username) {
            result = true;
        }
    });
    return result;
};
var alreadyPending = function(username) {
    var result = -1;
    pendingRequests.forEach(function(buddy, index) {
        if(buddy.get('username') == username) {
            result = index;
        }
    });
    return result;
};
var getPersonForRequest = function(username) {
    new Parse.Query(Parse.User).equalTo("username", username).find({
        success: function(buddy) {
            if(buddy.length == 0) {
                $.mobile.loading('hide');
                $('#add-friend-popup .form-error-text').text(username + " does not exist.");
            } else {
                // add them as a sent request on your account
                // add you to their pending requests
                sentRequests.push(buddy[0]);
                $.mobile.changePage("friends.html");
            }
        }
    });
};


//achievements page
var achv0 = ('<table><tr><td><img src="../achievements/dumbbell.jpg"></td><td><h2 class ="adjust_indent">Beginner Bunny Achieved!</h2>' +
    '<p class ="adjust_indent">You worked out 5 days in a row</p></td></tr></table>');
var achv1 = ('<table><tr><td><img src="../achievements/dumbbell.jpg"></td><td><h2 class ="adjust_indent">Healthy Hare Achieved!</h2>' +
    '<p class ="adjust_indent">You worked out 6 days in a row</p></td></tr></table>');
var achv2 = ('<table><tr><td><img src="../achievements/dumbbell.jpg"></td><td><h2 class ="adjust_indent">Radical Rabbit Achieved!</h2>' +
    '<p class ="adjust_indent">You worked out 7 days in a row</p></td></tr></table>');
var achv3 = ('<table><tr><td><img src="../achievements/healthy.jpg"></td><td><h2 class ="adjust_indent">Baby Carrot Achieved!</h2>' +
    '<p class ="adjust_indent">Under 2000 calories 3 days in a row</p></td></tr></table>');
var achv4 = ('<table><tr><td><img src="../achievements/healthy.jpg"></td><td><h2 class ="adjust_indent">Carrot Pro Achieved!</h2>' +
    '<p class ="adjust_indent">Under 2000 calories 5 days in a row</p></td></tr></table>');
var achv5 = ('<table><tr><td><img src="../achievements/scale.jpg"></td><td><h2 class ="adjust_indent">Slim Carrot Achieved!</h2>' +
    '<p class ="adjust_indent">Lost 3 pounds from starting weight</p></td></tr></table>');
var achv6 = ('<table><tr><td><img src="../achievements/scale.jpg"></td><td><h2 class ="adjust_indent">Slender Carrot Achieved!</h2>' +
    '<p class ="adjust_indent">Lost 5 pounds from starting weight</p></td></tr></table>');
var achv7 = ('<table><tr><td><img src="../achievements/checkmark.jpg"></td><td><h2 class ="adjust_indent">5 Carrot Log Achieved!</h2>' +
    '<p class ="adjust_indent">Logged in 5 days in a row</p></td></tr></table>');
var achv8 = ('<table><tr><td><img src="../achievements/checkmark.jpg"></td><td><h2 class ="adjust_indent">10 Carrot Log Achieved!</h2>' +
    '<p class ="adjust_indent">Logged in 10 days in a row</p></td></tr></table>');
var achv9 = ('<table><tr><td><img src="../achievements/checkmark.jpg"></td><td><h2 class ="adjust_indent">15 Carrot Log Achieved!</h2>' +
    '<p class ="adjust_indent">Logged in 15 days in a row</p></td></tr></table>');
var curAchv;
var achievementInit = function() {
    var aArray = user.get('achievementArray');
    var workout_counter = user.get("workoutCounter");
    var under_2000 = user.get("daysUnderTwoThousandCalorieCounter");
    var weight_counter = user.get("currentWeight") - user.get("startingWeight");

    var login_counter = user.get("loginCounter");
    //    e.preventDefault();
    if (workout_counter >= 5)
        aArray[0] = 1;
    if (workout_counter >= 6)
        aArray[1] = 1;
    if (workout_counter >= 7)
        aArray[2] = 1;
    if (under_2000 >= 3)
        aArray[3] = 1;
    if (under_2000 >= 5)
        aArray[4] = 1;
    if (weight_counter <= -3)
        aArray[5] = 1;
    if (weight_counter <= -5)
        aArray[6] = 1;
    if (login_counter >= 5)
        aArray[7] = 1;
    if (login_counter >= 10)
        aArray[8] = 1;
    if (login_counter >= 15)
        aArray[9] = 1;
    user.set("achievementArray", aArray);
    user.save();
    if (aArray[0]) {
        $("#a1").html(achv0);
        $("#ws1").attr("href", "shareAchievement.html");
        $("#dup").html(achv0);
    }
    ;
    if (aArray[1]) {
        $("#a2").html(achv1);
        $("#ws2").attr("href", "shareAchievement.html");
    }
    if (aArray[2]) {
        $("#a3").html(achv2);
        $("#ws3").attr("href", "shareAchievement.html");
    }
    if (aArray[3]) {

        $("#b1").html(achv3);
        $("#hs1").attr("href", "shareAchievement.html");
    }
    if (aArray[4]) {
        $("#b2").html(achv4);
        $("#hs2").attr("href", "shareAchievement.html");
    }
    if (aArray[5]) {
        $("#c1").html(achv5);
        $("#ls1").attr("href", "shareAchievement.html");
    }
    if (aArray[6]) {
        $("#c2").html(achv6);
        $("#ls2").attr("href", "shareAchievement.html");
    }
    if (aArray[7]) {
        $("#d1").html(achv7);
        $("#is1").attr("href", "shareAchievement.html");
    }
    if (aArray[8]) {
        $("#d2").html(achv8);
        $("#is2").attr("href", "shareAchievement.html");
    }
    if (aArray[9]) {
        $("#d3").html(achv9);
        $("#is3").attr("href", "shareAchievement.html");
    }

    $("#fb_icon").click(function () {
        FB.init({
            //appId : '496828853760637',
            //apiKey: '95df48eb35db42b7a4dbca37b4e55bae'
            appId: '1578778675680791',
            apiKey: 'a092a4e59e6b899c2a2e38c4b8adbc96',
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            name: "Workout Carrot",
            link: 'http://workoutcarrot.parseapp.com/'
        });
        FB.ui(
            {
                method: 'feed',
                name: 'This is the content of the "name" field.'
            });
    });

    $("#ws1").click(function () {
        curAchv = achv0;
    });

    $("#ws2").click(function () {
        curAchv = achv1;
    });

    $("#ws3").click(function () {
        curAchv = achv2;
    });

    $("#hs1").click(function () {
        curAchv = achv3;
    });

    $("#hs2").click(function () {
        curAchv = achv4;
    });


    $("#ls1").click(function () {
        curAchv = achv5;
    });

    $("#ls2").click(function () {
        curAchv = achv6;
    });


    $("#is1").click(function () {
        curAchv = achv7;
    });

    $("#is2").click(function () {
        curAchv = achv8;
    });

    $("#is3").click(function () {
        curAchv = achv9;
    });
}
var shareInit = function() {
    $("#dup").html(curAchv);
}
//news feed
var feedFriends = [
    { "firstName":"John" , "lastName":"Doe",
        "recentActivity":[{"activity":"logged in","date":"March 1, 2012"},{"activity":"cool","date":"March 27, 2012"}]},
    { "firstName":"Anna" , "lastName":"Smith",
        "recentActivity":[{"activity":"worked out","date":"March 25, 2012"}]},
    { "firstName":"Peter" , "lastName": "Jones",
        "recentActivity":[{"activity":"compared","date":"March 1, 2012"},{"activity":"dsfsd","date":"March 28, 2012"}] }
];

var addFriends = function(){
    $('#friendsFeed').children('li').remove();
    var count = 0;

    for(var i = 0; i < feedFriends.length; i++)
    {
        for(var j = 0; j < feedFriends[i].recentActivity.length; j++) {
            var toAdd = $('<li id = ' + Date.parse(feedFriends[i].recentActivity[j].date) +'><div><table><tr>' +
                '<td><img src="male.jpg"></td>' +
                '<td><h2 id="cur_name" class ="adjust_indent">' + feedFriends[i].firstName + " " + feedFriends[i].lastName + '</h2>' +
                '<p class ="adjust_indent">' + feedFriends[i].recentActivity[j].activity + " on " + feedFriends[i].recentActivity[j].date +
                '</p></td></tr>' +
                '</table></div></li>');

            $("#friendsFeed").prepend(toAdd);
            count++;
        }
    }
//    alert($("#13").size())
    sortFeed();
    $("#friendsFeed").listview('refresh');
};

var sortFeed = function(){
    var elems = $('#friendsFeed').children('li').remove();

    elems.sort(function(a,b){
        return parseInt(a.id) < parseInt(b.id);
    })
    $('#friendsFeed').append(elems);
};