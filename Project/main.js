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
    } else if(pageId == "signup-page"){
        signupPageInit();
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
    }  else if(pageId == "achievements-page"){
        achievementInit();
    } else if(pageId == "share_achievement"){
        shareInit();
    } else if(pageId == "feed") {
        feedInit();
    }  else if (pageId == "page1") {
        chartFunction();
        profileIn();
        goalin();
        recentActivityIn();
        recentActivityIn2();
        recentActivityIn3();
        $(document).ready( function() {
            chartFunction();
        });
        $(document).ready( function() {
            chart3.invalidateSize();
            homepageContents();
        });
    } else if (pageId == "settings-page") {
        settingsPageInIt();

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
        var name = $('#login-form input:text[name=username]').val().toLowerCase();
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

// Signup Page
var signupPageInit = function() {
    $("#signup-form").submit(function() {
        var name = $('#signup-form input:text[name=username]').val().toLowerCase();
        var password = $('#signup-form input:password[name=password]').val();
        var firstName = $('#signup-form input:text[name=firstName]').val();
        var lastName = $('#signup-form input:text[name=lastName]').val();
        var weightGoal = $('#signup-form input[type=number][name=weightGoal]').val();
        var currentWeight = $('#signup-form input[type=number][name=currentWeight]').val();

        var selectedPicture = 0;
        debugger
        $("input[name=radio-choice]:checked").each(function() {
            selectedPicture = $(this).val();
        });
        debugger;
        //alert("User selected " + selectedPicture);

//        $('#signup-form input:password[name=password]').val("");
//        $('#signup-form .form-error-text').text("");
//        $.mobile.loading( 'show', {
//            text: "Signing up...",
//            textVisible: true
//        });
        user = new Parse.User();
        user.set("username", name.toString());
        user.set("password", password);
        user.set("firstName", firstName.toString());
        user.set("lastName", lastName.toString());
        user.set("numAchievements", 10);
        user.set("achievementArray", [0,0,0,0,0,0,0,0,0,0]);
        user.set("workoutCounter", 0);
        user.set("lostWeightCounter", 0);
        user.set("daysUnderTwoThousandCalorieCounter", 0);
        user.set("loginCounter", 1);
        user.set("privateWeight", false);
        user.set("weightGoal", parseInt(weightGoal));

        var initialWeightInput = $.extend({},inputTemplate);
        var date = new Date();
        initialWeightInput.dateNum = Date.now();
        initialWeightInput.dateString = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
        initialWeightInput.value = parseInt(currentWeight);

        var tempExer = [];
        tempExer.push(initialWeightInput);

        user.set("weightEntries", tempExer);
        user.set("exerciseEntries", []);
        user.set("calorieEntries", []);
        user.set("friendUsernames", []);
        user.set("sentRequests", []);
        user.set("pendingRequests", []);
        user.set("currentWeight", parseInt(currentWeight));
        user.set("startingWeight", parseInt(currentWeight));
        user.set("shareArray", [0,0,0,0,0,0,0,0,0,0]);

        /********PROFILE PICTURE CODE **************/
        var canvas = document.createElement("canvas");
        var img1 = document.createElement("img");
        var dataForParse;
        debugger;

        if(selectedPicture == "choice-1"){
            img1.setAttribute('src', "images/Pelican.png" );
        } else if(selectedPicture == "choice-2") {
            img1.setAttribute('src', "images/Whale.png" );
        } else if(selectedPicture == "choice-3") {
            img1.setAttribute('src', "images/Starfish.png");
        } else if(selectedPicture == "choice-4") {
            img1.setAttribute('src', "images/Lion.png");
        } else if(selectedPicture == "choice-5") {
            img1.setAttribute('src', "images/Bee.png");
        } else if(selectedPicture == "choice-6"){
            img1.setAttribute('src', "images/Frog.png");
        } else if(selectedPicture == "choice-7") {
            img1.setAttribute('src', "images/Pelican.png");
        } else {
            alert("Radio buttons broken. :'(");
        }

        canvas.width = img1.width;
        canvas.height = img1.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img1, 0, 0);
        debugger;
        dataForParse = canvas.toDataURL("image/png");
        debugger;
        var parseFile = new Parse.File("mypic.png", {base64: dataForParse});
        /*******************************************/
        parseFile.save().then(function(){
            user.set("pic", parseFile);
            user.signUp(null, {
                success: function(user){
                    $.mobile.loading('hide');
                    //$('#settings-page .form-confirm-text').text('Settings have successfully updated');
                    setUserInformation(user);
                },
                error: function(user, error){
                    $.mobile.loading('hide');
                    $('#login-form .form-error-text').text("Error: " + error.message);
                }
            });
            return false;
        });

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
        $('label').text("Enter Your Calories Consumed:");
        $('input[type=number]').attr("placeholder", "Calories");
    } else if(websiteData.inputType == "Exercise") {
        $('div[data-role=header] h2').text("Exercise Input");
        $('label').text("Enter Your Hours Exercised:");
        $('input[type=number]').attr("placeholder", "Hours");
    } else {
        $('div[data-role=header] h2').text("Weight Input");
        $('label').text("Enter Your Weight:");
        $('input[type=number]').attr("placeholder", "Pounds");
    }

    $('#input-popup #input-form').on("submit", function() {
        $.mobile.loading( 'show', {
            text: "Adding input...",
            textVisible: true
        });
        var input = $.extend({},inputTemplate);
        var date = new Date();
        input.dateNum = Date.now();
        input.dateString = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
        input.value = $('#input-form input[type=number]').val();
        if(input.value == "" || input.value == null) {
            $('#input-form .form-error-text').text("Please enter a value.");
            $.mobile.loading('hide');
        } else if(input.value < 0) {
            $('#input-form .form-error-text').text("Value cannot be negative.");
            $.mobile.loading('hide');
        } else {
            if(websiteData.inputType == "Food") {
                var arrayLength = user.get('calorieEntries').length;
                if(arrayLength != 0 && user.get('calorieEntries')[arrayLength - 1].dateString == input.dateString) {
                    user.get('calorieEntries')[arrayLength - 1].value = parseInt(input.value) + parseInt(user.get('calorieEntries')[arrayLength - 1].value);
                    user.get('calorieEntries')[arrayLength - 1].dateNum = input.dateNum;
                } else {
                    user.get('calorieEntries').push(input);
                }
            } else if(websiteData.inputType == "Exercise") {
                var arrayLength = user.get('exerciseEntries').length;
                if(arrayLength != 0 && user.get('exerciseEntries')[arrayLength - 1].dateString == input.dateString) {
                    user.get('exerciseEntries')[arrayLength - 1].value = parseInt(input.value) + parseInt(user.get('exerciseEntries')[arrayLength - 1].value);
                    user.get('exerciseEntries')[arrayLength - 1].dateNum = input.dateNum;
                } else {
                    user.get('exerciseEntries').push(input);
                }
            } else {
                var arrayLength = user.get('weightEntries').length;
                if(arrayLength != 0 && user.get('weightEntries')[arrayLength - 1].dateString == input.dateString) {
                    user.get('weightEntries')[arrayLength - 1].value = parseInt(input.value);
                    user.get('weightEntries')[arrayLength - 1].dateNum = input.dateNum;
                } else {
                    user.get('weightEntries').push(input);
                }
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
    $('.count').text(pendingRequests.length);
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
            $('li#new-person p span').text(friendCompareGetGoal(friend) + '.');
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
            $('li#new-person p span').text("Private");
            $('li#new-person').removeAttr('id').addClass('ui-disabled'); //*C
        });
    }

    $('ul#friends-list').listview('refresh');

    $('ul#friends-list li').on('click', function(event) {
        websiteData.compareFriend = friends[$(event.target).closest('li').data("friend-index")];
    })
};

// Friends Compare Page
var friendCompareInit = function() {
    // names
    $('#friend-name-cell').text(websiteData.compareFriend.get('username')[0].toUpperCase() + websiteData.compareFriend.get('username').slice(1));

    // pictures
    $('#compare-me-pic').attr('src', user.get('pic').url());
    $('#compare-friend-pic').attr('src', websiteData.compareFriend.get("pic").url());

    // weights
    $('tr.weight-row td.personal-cell span').text(friendCompareGetGoal(user));
    $('tr.weight-row td.friend-cell span').text(friendCompareGetGoal(websiteData.compareFriend));

    // calories
    $('tr.calories-row td.personal-cell span').text(getAverageValue(user.get("calorieEntries")));
    $('tr.calories-row td.friend-cell span').text(getAverageValue(websiteData.compareFriend.get("calorieEntries")));

    // exercise
    $('tr.exercise-row td.personal-cell span').text(getAverageValue(user.get("exerciseEntries")));
    $('tr.exercise-row td.friend-cell span').text(getAverageValue(websiteData.compareFriend.get("exerciseEntries")));

    // achievements
    user.get('achievementArray').forEach(function(element, index) {
        if(element == 0) {
            $("tr.achievement" + index + "-row td.personal-cell").text("-");
        } else {
            $("tr.achievement" + index + "-row td.personal-cell").text("X");
        }
    });
    websiteData.compareFriend.get('achievementArray').forEach(function(element, index) {
        if(element == 0) {
            $("tr.achievement" + index + "-row td.friend-cell").text("-");
        } else {
            $("tr.achievement" + index + "-row td.friend-cell").text("X");
        }
    });
};
var friendCompareGetGoal = function(user) {
    var weightEntries = user.get("weightEntries");
    var closenessToGoal = weightEntries[weightEntries.length - 1].value - user.get("weightGoal");
    if(closenessToGoal > 0) {
        return ("Lose " + closenessToGoal + " lb");
    } else if(closenessToGoal < 0) {
        return ("Gain " + (-1 * closenessToGoal) + " lb");
    } else {
        return "Maintain Weight";
    }
};
var getAverageValue = function(inputArray) {
    var sum = 0;
    var counter = 0;
    inputArray.forEach(function(element) {
        sum += parseInt(element.value);
        counter++;
    });
    return (sum / counter);
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
    Parse.Cloud.run('acceptFriend', {
        targetFriend: friend.get('username'),
        responderUsername: user.get('username')
    });
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
    Parse.Cloud.run('rejectFriend', {
        targetFriend: nonFriend.get('username'),
        responderUsername: user.get('username')
    });
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
        var username = $('#add-friend-popup input[type=text]').val().toLowerCase();
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
            Parse.Cloud.run('acceptFriend', {
                targetFriend: friend.get('username'),
                responderUsername: user.get('username')
            });
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
                user.get('sentRequests').push(buddy[0].get('username'));
                user.save();
                buddy[0].get('pendingRequests').push(user.get('username'));
                Parse.Cloud.run('sendRequest', {
                    targetFriend: buddy[0].get('username'),
                    senderUsername: user.get('username')
                });
                sentRequests.push(buddy[0]);
                $.mobile.changePage('friends.html');
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
var sharedItem;
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
    }
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

    $("#ws1").click(function () {
        curAchv = achv0;
        sharedItem = 0;
    });

    $("#ws2").click(function () {
        curAchv = achv1;
        sharedItem = 1;
    });

    $("#ws3").click(function () {
        curAchv = achv2;
        sharedItem = 2;
    });

    $("#hs1").click(function () {
        curAchv = achv3;
        sharedItem = 3;
    });

    $("#hs2").click(function () {
        curAchv = achv4;
        sharedItem = 4;
    });


    $("#ls1").click(function () {
        curAchv = achv5;
        sharedItem = 5;
    });

    $("#ls2").click(function () {
        curAchv = achv6;
        sharedItem = 6;
    });


    $("#is1").click(function () {
        curAchv = achv7;
        sharedItem = 7;
    });

    $("#is2").click(function () {
        curAchv = achv8;
        sharedItem = 8;
    });

    $("#is3").click(function () {
        curAchv = achv9;
        sharedItem = 9;
    });
};

// Share Popup
var shareInit = function() {
    $("#dup").html(curAchv);
    var bArray = user.get('shareArray');
    if(bArray[sharedItem] > 0)
    {
        $("#shareTextOrButton").html('<p><i>You have shared this achievement</i></p>');
    }
    $("#shareButton").click(function () {
        var date = new Date();
        bArray[sharedItem] = new Date();
        this.disabled = true;
        user.set("shareArray", bArray);
        user.save();
    });
};

// News Feed Page
var feedFriends = [
    { "firstName":"John" , "lastName":"Doe",
        "recentActivity":[{"activity":"logged in","date":"March 1, 2012"},{"activity":"cool","date":"March 27, 2012"}]},
    { "firstName":"Anna" , "lastName":"Smith",
        "recentActivity":[{"activity":"worked out","date":"March 25, 2012"}]},
    { "firstName":"Peter" , "lastName": "Jones",
        "recentActivity":[{"activity":"compared","date":"March 1, 2012"},{"activity":"dsfsd","date":"March 28, 2012"}] }
];

var feedInit = function() {
    $('#friendsFeed').children('li').remove();
    friends.forEach(function(buddy)
    {
        var count = 0;
        buddy.get('exerciseEntries').forEach(function(element) {
            var toAdd = $('<li id = ' + element.dateNum + '><div><table><tr>' +
                '<td><img style="max-width:60px; max-height:60px; " src = ' + buddy.get("pic").url() + '></td>' +
                '<td><h2 id="cur_name" class ="adjust_indent">' + buddy.get("firstName") + " " + buddy.get("lastName") + '</h2>' +
                '<p class ="adjust_indent">' + "exercised for " + element.value + " hours on " + element.dateString +
                '</p></td></tr>' +
                '</table></div></li>');

            $("#friendsFeed").prepend(toAdd);
        });
        buddy.get('calorieEntries').forEach(function(element) {
            var toAdd = $('<li id = ' + element.dateNum + '><div><table><tr>' +
                '<td><img style="max-width:60px; max-height:60px; " src = ' + buddy.get("pic").url() + '></td>' +
                '<td><h2 id="cur_name" class ="adjust_indent">' + buddy.get("firstName") + " " + buddy.get("lastName") + '</h2>' +
                '<p class ="adjust_indent">' + "consumed " + element.value + " calories on " + element.dateString +
                '</p></td></tr>' +
                '</table></div></li>');

            $("#friendsFeed").prepend(toAdd);
        });
        buddy.get('shareArray').forEach(function(element)
        {
            var displayAchv;
            if(count == 0)
                displayAchv = "shared Beginner Bunny on ";
            else if(count == 1)
                displayAchv = "shared Healthy Hare on ";
            else if(count == 2)
                displayAchv = "shared Radical Rabbit on ";
            else if(count == 3)
                displayAchv = "shared Baby Carrot on ";
            else if(count == 4)
                displayAchv = "shared Carrot Pro on ";
            else if(count == 5)
                displayAchv = "shared Slim Carrot on ";
            else if(count == 6)
                displayAchv = "shared Slender Carrot on ";
            else if(count == 7)
                displayAchv = "shared 5 Carrot Log on ";
            else if(count == 8)
                displayAchv = "shared 10 Carrot Log on ";
            else if(count == 9)
                displayAchv = "shared 15 Carrot Log on ";
            var date = new Date(element);
            if(date.getTime() > 0) {
                var toAdd = $('<li id = ' + date.getTime() + '><div><table><tr>' +
                    '<td><img style="max-width:60px; max-height:60px; " src = ' + buddy.get("pic").url() + '></td>' +
                    '<td><h2 id="cur_name" class ="adjust_indent">' + buddy.get("firstName") + " " + buddy.get("lastName") + '</h2>' +
                    '<p class ="adjust_indent">' + displayAchv + (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() +
                    '</p></td></tr>' +
                    '</table></div></li>');

                $("#friendsFeed").prepend(toAdd);
            }
            count++;
        });

    });
    var elems = $('#friendsFeed').children('li').remove();

    elems.sort(function (a, b) {
        //return parseInt(a.id) < parseInt(b.id);
        return b.id - a.id;
    })
    $('#friendsFeed').append(elems);

    $("#friendsFeed").listview('refresh');

};

var sortFeed = function () {
    var elems = $('#friendsFeed').children('li').remove();

    elems.sort(function (a, b) {
        return parseInt(a.id) < parseInt(b.id);
    })
    $('#friendsFeed').append(elems);
};

// Main Page
var chart3 = new AmCharts.AmSerialChart();
var graph3 = new AmCharts.AmGraph();
var chart2 = new AmCharts.AmSerialChart();
var graph2 = new AmCharts.AmGraph();
var chart = new AmCharts.AmSerialChart();
var graph = new AmCharts.AmGraph();
var valueAxis = new AmCharts.ValueAxis();
var initialWeight;
var howClosetoGoal;
var currentWeight;
var stringForGoal;
var ateVerbs = [
    "feasted on ","scarfed down ", "inhaled ", "devoured ", "gobbled up "
];
var updateUserWeight = function() {


    initialWeight = user.get('startingWeight');

    if (arrayWeight.length > 0) {
        currentWeight = arrayWeight[arrayWeight.length -1].value;

    } else {
        currentWeight = user.get('startingWeight');
    }


    if (currentWeight >  user.get('weightGoal')) {
        howClosetoGoal = currentWeight - user.get('weightGoal')
        stringForGoal = "Lose " + howClosetoGoal + " more lbs to reach your goal!";

    } else if (currentWeight < user.get('weightGoal') ) {
        howClosetoGoal = user.get('weightGoal') - currentWeight;
        stringForGoal = "Gain " + howClosetoGoal + " more lbs to reach your goal!";

    } else {
        howClosetoGoal = user.get('weightGoal') - currentWeight;
        stringForGoal = "You reached your goal!";
    }



};

//var chartData;
var excerciseArrayReal = [];
var arrayK = [];
var arrayCalories = [];
var arrayWeight = [];
var chartData = [
    {
        "year": "March 27, 2014",
        "value": -0.307
    },
    {
        "year": "April 31, 2014",
        "value": -0.168
    }
];
var chartFunction = function() {


    arrayK = [];
    arrayCalories = [];
    arrayWeight = [];

    var count = 0;

    user.get('exerciseEntries').forEach(function(element){
        arrayK[count] = {
            "date": element.dateString,
            "value": element.value
        }
        count++;
    })

    count = 0;
    user.get('weightEntries').forEach(function(element){

        arrayWeight[count] = {
            "date": element.dateString,
            "value": element.value
        }
        count++;
    })
    count = 0;

    user.get('calorieEntries').forEach(function(element){

        arrayCalories[count] = {
            "date": element.dateString,
            "value": element.value
        }
        count++;
    })
    count = 0;

//AmCharts.ready(function () {
    // SERIAL CHART
    chart.pathToImages = "amcharts_3.4.7.free/amcharts/images/";
    chart.marginTop = 0;
    chart.marginRight = 0;
    chart.dataProvider = arrayCalories;
    chart.categoryField = "date";
    chart.dataDateFormat = "YYYY-MM-DD";
    chart.balloon.cornerRadius = 6;

    chart2;
    chart2.pathToImages = "amcharts_3.4.7.free/amcharts/images/";
    chart2.marginTop = 0;
    chart2.marginRight = 0;
    chart2.dataProvider = arrayK;
    chart2.categoryField = "date";
    chart2.dataDateFormat = "YYYY-MM-DD";
    chart2.balloon.cornerRadius = 6;

    chart3;
    chart3.pathToImages = "amcharts_3.4.7.free/amcharts/images/";
    chart3.marginTop = 0;
    chart3.marginRight = 0;
    chart3.dataProvider = arrayWeight;
    chart3.categoryField = "date";
    chart3.dataDateFormat = "YYYY-MM-DD";
    chart3.balloon.cornerRadius = 6;

    // AXES
    // category
    var categoryAxis = chart.categoryAxis;
//    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
//    categoryAxis.minPeriod = "YYYY-MM-DD"; // our data is yearly, so we set minPeriod to YYYY
//    categoryAxis.dashLength = 1;
//    categoryAxis.minorGridEnabled = true;
//    categoryAxis.axisColor = "#DADADA";
    chart.categoryAxis = categoryAxis;

    var categoryAxis2 = chart3.categoryAxis;
//    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
//    categoryAxis.minPeriod = "YYYY-MM-DD"; // our data is yearly, so we set minPeriod to YYYY
//    categoryAxis.dashLength = 1;
//    categoryAxis.minorGridEnabled = true;
//    categoryAxis.axisColor = "#DADADA";
    chart2.categoryAxis = categoryAxis2;

    var categoryAxis3 = chart3.categoryAxis;
//    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
//    categoryAxis.minPeriod = "YYYY-MM-DD"; // our data is yearly, so we set minPeriod to YYYY
//    categoryAxis.dashLength = 1;
//    categoryAxis.minorGridEnabled = true;
//    categoryAxis.axisColor = "#DADADA";

    chart3.categoryAxis = categoryAxis3;
//    var valueAxis; //  = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 0;
    valueAxis.dashLength = 1;
    valueAxis.inside = true;
    chart.addValueAxis(valueAxis);
    chart2.addValueAxis(valueAxis);
    chart3.addValueAxis(valueAxis);

    // GRAPH
    graph;
    graph.bullet = "round";
    graph.bulletSize = 8;
    graph.bulletBorderColor = "#FFFFFF";

    graph.bulletBorderThickness = 2;
    graph.bulletBorderAlpha = 1;
    graph.connect = true; // this makes the graph not to connect data points if data is missing / changeed
    graph.lineThickness = 2;
    graph.valueField = "value";
    graph.lineColor = "#e95230";
    graph.balloonText = "[[category]]<br><b><span style='font-size:14px;'>[[value]] C</span></b>";
    chart.addGraph(graph);

    graph2;
    graph2.bullet = "round";
    graph2.bulletSize = 8;
    graph2.bulletBorderColor = "#FFFFFF";

    graph2.bulletBorderThickness = 2;
    graph2.bulletBorderAlpha = 1;
    graph2.connect = true; // this makes the graph not to connect data points if data is missing
    graph2.lineThickness = 2;
    graph2.lineColor = "#e95230";
    graph2.valueField = "value";
    graph2.balloonText = "[[category]]<br><b><span style='font-size:14px;'>[[value]] C</span></b>";
    chart2.addGraph(graph2);

    graph3;
    graph3.bullet = "round";
    graph3.bulletSize = 8;
    graph3.lineColor = "#e95230";
    graph3.bulletBorderColor = "#FFFFFF";

    graph3.bulletBorderThickness = 2;
    graph3.bulletBorderAlpha = 1;
    graph3.connect = true; // this makes the graph not to connect data points if data is missing
    graph3.lineThickness = 2;
    graph3.valueField = "value";
    graph3.balloonText = "[[category]]<br><b><span style='font-size:14px;'>[[value]] C</span></b>";
    chart3.addGraph(graph3);

//    CURSOR
//        var chartCursor = new AmCharts.ChartCursor();
//        chartCursor.cursorAlpha = 0;
//        chartCursor.cursorPosition = "mouse";
//        chartCursor.categoryBalloonDateFormat = "YYYY-MM-DD";
//        chartCursor.graphBulletSize = 2;
//        chart.addChartCursor(chartCursor);
//        chart2.addChartCursor(chartCursor);
//        chart3.addChartCursor(chartCursor);

    chart.creditsPosition = "bottom-right";
    chart3.creditsPosition = "bottom-left";

    // WRITE

    chart.write("a");
    chart2.write("b");
    chart3.write("c");

    chart.invalidateSize();
    chart2.invalidateSize();
    chart3.invalidateSize();

//});

//
};


//
//$(document).ready(function() {
//
////        console.log("helsifmslknmfsonsfkjnslo!!!!");
//
//
//    $('.iosSlider').iosSlider({
//        snapToChildren: true,
//        desktopClickDrag: true,
//        infiniteSlider: true,
//        snapSlideCenter: true
//    });
//
//});


var homepageContents = function() {


    $(document).delegate('.ui-navbar ul li > a', 'click', function () {
//        chart.invalidateSize();
        chart2.invalidateSize();

        chart.invalidateSize();
        chart3.invalidateSize();

        //un-highlight and highlight only the buttons in the same navbar widget
        $(this).closest('.ui-navbar').find('a').removeClass('ui-navbar-btn-active');
        //this bit is the same, you could chain it off of the last call by using two `.end()`s
        $(this).addClass('ui-navbar-btn-active');
        //this starts the same but then only selects the sibling `.content_div` elements to hide rather than all in the DOM
        $('#' + $(this).attr('data-href')).show().siblings('.content_div').hide();
//        $('#' + $(this).attr('data-href2')).show().siblings('.act').hide();

    });

    $(document).delegate('.ui-navbar ul li > a', 'click', function () {

        $('.iosSlider').iosSlider({
            snapToChildren: true,
            desktopClickDrag: true,
            infiniteSlider: true,
            snapSlideCenter: true,
            onSlideChange: slideChange
        });

        //un-highlight and highlight only the buttons in the same navbar widget
        $(this).closest('.ui-navbar').find('a').removeClass('ui-navbar-btn-active');
        //this bit is the same, you could chain it off of the last call by using two `.end()`s
        $(this).addClass('ui-navbar-btn-active');
        //this starts the same but then only selects the sibling `.content_div` elements to hide rather than all in the DOM
//        $('#' + $(this).attr('data-href')).show().siblings('.content_div').hide();
        $('#' + $(this).attr('data-href2')).show().siblings('.act').hide();

    });

};

var slideChange = function(args) {
    $('.indicators .item').removeClass('selected');
    $('.indicators .item:eq(' + (args.currentSlideNumber -1 ) +')').addClass('selected');
};

var profileIn = function() {
    var profile = $('<li id="newPro">'+
        '<img>'+
        '<h2></h2>'+
        '<p>Weight: <span></span></p>'+
        '</li>');

    $('li#newPro').remove();
//        $('p').remove();

    updateUserWeight();

    $('ul#profileid').append(profile.clone());
    $('li#newPro img').attr('src', user.get('pic').url());
    $('li#newPro h2').text(user.get('firstName') + " " + user.get('lastName'));
    $('li#newPro p span').text(currentWeight);

    $('ul#profileid').listview('refresh');
};


var goalin = function() {

    updateUserWeight();

    var profile = $('<li id="newGoal">'+
        '<h2></h2>'+
        '<p><span></span></p>'+
        '</li>');

    $('li#newGoal').remove();
//        $('p').remove();

    $('ul#goalmain').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newGoal h2').text("Goal Weight: " +  user.get("weightGoal") +" lb");
    $('li#newGoal p span').text(stringForGoal);

    $('ul#goalmain').listview('refresh');
};


var recentActivityIn = function() {
    var profile = $('<li id="newActivity1" class="lastactivity1">'+
        '<h2></h2>'+
        '<p><span></span></p>'+
        '</li>');


    $('li.lastactivity1').remove();


    for (var j = 0; j < arrayCalories.length; j++) {
        $('li.lastactivity1').remove();
//            $('h1').remove();
//            $('h1#newActivity3').remove();
    }

    var cList = $('youractivityid');

    var count2 = 0;
    for (var i = arrayCalories.length - 1; i >= 0; i--) {

        if (arrayCalories[i].value != null) {

            $('ul#youractivityid').append(profile.clone());

            $('li#newActivity1 h2').text("You " + ateVerbs[count2] + arrayCalories[i].value + " calories");
            $('li#newActivity1 p span').text("on " + arrayCalories[i].date);
            $('li#newActivity1').removeAttr('id');

            count2++;

            if (count2 == ateVerbs.length - 1) {
                count2 = 0;
            }

        } else {

            continue;

        }
    }

    count2 = 0;


    $('ul#youractivityid').listview('refresh');
};

var recentActivityIn2 = function() {

    var profile = $('<li id="newActivity2" class="lastactivity2">'+
        '<h2></h2>'+
        '<p><span></span></p>'+
        '</li>');

//    $('li#newActivity3').remove();

    $('li.lastactivity2').remove();

    for (var j = 0; j < arrayK.length; j++) {
        $('li.lastactivity2').remove();
//            $('h1').remove();
//            $('h1#newActivity3').remove();
    }

    var cList = $('youractivityid2');

    for (var i = arrayK.length - 1; i >= 0; i--) {

        if (arrayK[i].value != null) {

            $('ul#youractivityid2').append(profile.clone());

            $('li#newActivity2 h2').text("You worked out for " + arrayK[i].value + " hours!");
            $('li#newActivity2 p span').text("on " + arrayK[i].date);
            $('li#newActivity2').removeAttr('id');

        } else {
            continue;
        }
    }

    $('ul#youractivityid2').listview('refresh');

};

var recentActivityIn3 = function() {
    var profile = $('<li id="newActivity3" class="lastactivity">'+
        '<h2></h2>'+
        '<p><span></span></p>'+
        '</li>');

    $('li.lastactivity').remove();

    for (var i = arrayWeight.length - 1; i >= 0; i--) {
        $('li.lastactivity').remove();
//            $('h1').remove();
//            $('h1#newActivity3').remove();
    }

    var cList = $('youractivityid3');


    for (var i = arrayWeight.length - 1; i >= 0; i--) {

        if (arrayWeight[i].value != null) {

            $('ul#youractivityid3').append(profile.clone());

            $('li#newActivity3 h2').text("You weighed " + arrayWeight[i].value + " lbs!");
            $('li#newActivity3 p span').text("on " + arrayWeight[i].date);
            $('li#newActivity3').removeAttr('id');


        } else {

            continue;

        }
    }

    $('ul#youractivityid3').listview('refresh');
};

// SETTINGS PAGE
var settingsPageInIt = function () {

    var isPrivate = user.get("privateWeight");
    var firstName = user.get("firstName");
    var lastName = user.get("lastName");
    var initialWeight = 1;
    var goalWeight = user.get("weightGoal");
    var goalNumber = 1;
    goalNumber = initialWeight - goalWeight;
        $('#firstNameLabel').val(firstName);
        $('#lastNameLabel').val(lastName);
        $('#goalWeight').val(goalWeight);


//    $("#slider2").change(function() {
//        isPrivate = $("#slider2").val();
//
//        if (isPrivate == "off") {
//            isPrivate = 0;
//        }
//
//        if (isPrivate == "on") {
//            isPrivate = 1;
//        }
//
////            $('#togshow').text(state.toString());
//    });


    $("#firstNameLabel").on("keyup change", function() {
        firstName = this.value; // omit "var" to make it global
        $("#dom_element").text(value);
    });


    $("#lastNameLabel").on("keyup change", function() {
        lastName = this.value; // omit "var" to make it global
        $("#dom_element").text(value);
    });

//    $("#initialWeight").on("keyup change", function() {
//        initialWeight = this.value; // omit "var" to make it global
//        goalNumber = initialWeight - goalWeight;
//
//        $("#dom_element").text(value);
//    });

    $("#goalWeight").on("keyup change", function() {
        goalWeight = this.value; // omit "var" to make it global
        goalNumber = initialWeight - goalWeight;

        $("#dom_element").text(value);
    });


    $('#settings-page #saveSettings').submit(function() {
//        user.set("privateWeight", isPrivate);
        user.set("firstName", firstName);
        user.set("lastName", lastName);
        user.set("weightGoal", goalWeight);
        user.set("privateWeight", isPrivate);
        $.mobile.loading( 'show', {
            text: "Updating Settings...",
            textVisible: true
        });
        user.save(null, {
            success: function() {
                $.mobile.loading('hide');
                $('#settings-page .form-confirm-text').text('Settings have successfully updated');
            }
        });
        return false;
    });

};