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


// HOME PAGE DATA
var chart3;
var graph3;
var chart2;
var graph2;
var chart;
var graph;


var testingGoal = 7;

//var chartData;
var excerciseArrayReal = [];


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
    } else if(pageId == "page1") {


//        $.mobile.changePage("main/main.html");

        homepageContents();
        profileIn();
        goalin();
        recentActivityIn();
        recentActivityIn2();
        recentActivityIn3();

        chartFunction();

    } else if (pageId == "settings-page") {
        settingsPageInIt();

    }
     else if(pageId == "page3"){
        achievementInit();
    }
    else if(pageId == "share_achievement"){
        shareInit();
    }
    else if(pageId == "feed")
    {
        feedInit(); }
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

    console.log("getting user stuff");


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


//    user.get('exerciseEntries').forEach(function(fUsername, index, array) {
//        new Parse.Query(Parse.User).equalTo("ExerciseInput").find({
//            success: function(buddy) {
//
//                console.log("no sucesss");
//                excerciseArrayReal.push(buddy[0]);
//
//                console.log(excerciseArrayReal[0].value);
//                if(array.length - 1 == index) $.mobile.changePage("main/main.html");
//            }
//        });
//    });





    var exerciseArray = user.get("exerciseEntries");

    excerciseArrayReal = [];

    console.log("parse excise array length is ", exerciseArray.length);

    for(var i = 0, j =0; i < exerciseArray.length; i++){
        //Get the objectiD of the input
        var exId = exerciseArray[i];
        console.log("print out ids yo", exId);
        //Open on query on the ExerciseInput table
        var inputQuery = new Parse.Query("ExerciseInput");
        //Look for the matching objectId

        inputQuery.equalTo("objectId", exId);
        inputQuery.find({
            success: function(result) {
                //When you find it, print its date and value variables.
                console.log("query returned: " + result[0].get("date") + " "
                    + result[0].get("value"));

//                excerciseArrayReal.push({
//                    "value": result[0].get
//
//
//                });

                testingGoal = 8;


                excerciseArrayReal[j] = {
                    "year": result[0].get("date"),
                    "value": result[0].get("value")
                }
                j++;

            },
            error: function(result) {
                alert("COULDN'T FIND OBJECT IN TABLE");
            }
        });
    }




    chartFunction();

    console.log("whhhhhy", excerciseArrayReal.length);
    console.log(excerciseArrayReal.length);
//
    for (var j= 0; j < excerciseArrayReal.length; j++) {
        console.log(excerciseArrayReal.length);
        console.log(excerciseArrayReal[j].value);
    }



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
    //* friend.save();
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
            user.save({
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
                //* buddy[0].save();
                sentRequests.push(buddy[0]);
                $.mobile.changePage('friends.html');
            }
        }
    });
};


// HOME PAGE CONTENT YO
var homepageContents = function() {

//    $('body').pagecontainer('getActivePage')


    for (var i = 0; i < excerciseArrayReal.length; i++) {
        console.log(excerciseArrayReal[j].value);
    }

//    $('page1').ready(function() {
//
//        $(".iosSlider").iosSlider({
//
//            $('.iosSlider').iosSlider({
//                snapToChildren: true,
//                desktopClickDrag: true,
//                infiniteSlider: true,
//                snapSlideCenter: true
//            });
//        })
//
//
//    });


    $(document).ready(function() {

        $('.iosSlider').iosSlider({
            snapToChildren: true,
            desktopClickDrag: true,
            infiniteSlider: true,
            snapSlideCenter: true
        });

    });


    $(document).delegate('.ui-navbar ul li > a', 'click', function () {

//        chartFunction();

        chart.invalidateSize();
        chart2.invalidateSize();
        chart3.invalidateSize();

//        console.log("trying again to print out arrat", excerciseArrayReal.length);
//
//        for (var k = 0; i < excerciseArrayReal.length; k++) {
//            console.log("maybe");
//            console.log(excerciseArrayReal[k].value);
//        }



        console.log("whhhhhy      2", excerciseArrayReal.length);
        console.log(excerciseArrayReal.length);
//
        for (var j= 0; j < excerciseArrayReal.length; j++) {
            console.log(excerciseArrayReal[j].year);
            console.log(excerciseArrayReal[j].value);


        };



        console.log("helo sam 2")
        //un-highlight and highlight only the buttons in the same navbar widget
        $(this).closest('.ui-navbar').find('a').removeClass('ui-navbar-btn-active');
        //this bit is the same, you could chain it off of the last call by using two `.end()`s
        $(this).addClass('ui-navbar-btn-active');
        //this starts the same but then only selects the sibling `.content_div` elements to hide rather than all in the DOM
        $('#' + $(this).attr('data-href')).show().siblings('.content_div').hide();
//        $('#' + $(this).attr('data-href2')).show().siblings('.act').hide();

    });

    $(document).delegate('.ui-navbar ul li > a', 'click', function () {

        console.log("helo sam 3")
        //un-highlight and highlight only the buttons in the same navbar widget
        $(this).closest('.ui-navbar').find('a').removeClass('ui-navbar-btn-active');
        //this bit is the same, you could chain it off of the last call by using two `.end()`s
        $(this).addClass('ui-navbar-btn-active');
        //this starts the same but then only selects the sibling `.content_div` elements to hide rather than all in the DOM
//        $('#' + $(this).attr('data-href')).show().siblings('.content_div').hide();
        $('#' + $(this).attr('data-href2')).show().siblings('.act').hide();

    });

};

var chartFunction = function() {


//    $.mobile.changePage("main/main.html");

    console.log("testing fola", testingGoal);

    console.log("yo in this function chart");
    console.log(excerciseArrayReal.length);
//
//    for (var i = 0; i < excerciseArrayReal.length; i++) {
//        console.log("maybe");
//        console.log(excerciseArrayReal[i].get("value"));
//    }

    AmCharts.ready(function () {
        // SERIAL CHART


        console.log("trying again to print out arrat", excerciseArrayReal.length);



        chart = new AmCharts.AmSerialChart();
        chart.pathToImages = "../Projects/main/amcharts_3.4.7.free/amcharts/images/";

//        chart.pathToImages = "main/amcharts_3.4.7.free/amcharts/images/";
        chart.marginTop = 0;
        chart.marginRight = 0;
        chart.dataProvider = excerciseArrayReal;
        chart.categoryField = "year";
        chart.dataDateFormat = "YYYY";
        chart.balloon.cornerRadius = 6;

        chart2 = new AmCharts.AmSerialChart();
        chart2.pathToImages = "amcharts_3.4.7.free/amcharts/images/";
        chart2.marginTop = 0;
        chart2.marginRight = 0;
        chart2.dataProvider = excerciseArrayReal;
        chart2.categoryField = "year";
        chart2.dataDateFormat = "YYYY";
        chart2.balloon.cornerRadius = 6;

        chart3 = new AmCharts.AmSerialChart();
        chart3.pathToImages = "amcharts_3.4.7.free/amcharts/images/";
        chart3.marginTop = 0;
        chart3.marginRight = 0;
        chart3.dataProvider = chartData;
        chart3.categoryField = "year";
        chart3.dataDateFormat = "YYYY";
        chart3.balloon.cornerRadius = 6;


        // AXES
        // category
        var categoryAxis = chart.categoryAxis;
        categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
        categoryAxis.minPeriod = "YYYY"; // our data is yearly, so we set minPeriod to YYYY
        categoryAxis.dashLength = 1;
        categoryAxis.minorGridEnabled = true;
        categoryAxis.axisColor = "#DADADA";

        // value
        var valueAxis = new AmCharts.ValueAxis();
        valueAxis.axisAlpha = 0;
        valueAxis.dashLength = 1;
        valueAxis.inside = true;
        chart.addValueAxis(valueAxis);
        chart2.addValueAxis(valueAxis);
        chart3.addValueAxis(valueAxis);


        // GRAPH
        graph = new AmCharts.AmGraph();
        graph.lineColor = "#b6d278";
        graph.negativeLineColor = "#487dac"; // this line makes the graph to change color when it drops below 0
        graph.bullet = "round";
        graph.bulletSize = 8;
        graph.bulletBorderColor = "#FFFFFF";

        graph.bulletBorderThickness = 2;
        graph.bulletBorderAlpha = 1;
        graph.connect = false; // this makes the graph not to connect data points if data is missing
        graph.lineThickness = 2;
        graph.valueField = "value";
        graph.balloonText = "[[category]]<br><b><span style='font-size:14px;'>[[value]] C</span></b>";
        chart.addGraph(graph);

        graph2 = new AmCharts.AmGraph();
        graph2.lineColor = "#b6d278";
        graph2.negativeLineColor = "#487dac"; // this line makes the graph to change color when it drops below 0
        graph2.bullet = "round";
        graph2.bulletSize = 8;
        graph2.bulletBorderColor = "#FFFFFF";

        graph2.bulletBorderThickness = 2;
        graph2.bulletBorderAlpha = 1;
        graph2.connect = false; // this makes the graph not to connect data points if data is missing
        graph2.lineThickness = 2;
        graph2.valueField = "value";
        graph2.balloonText = "[[category]]<br><b><span style='font-size:14px;'>[[value]] C</span></b>";
        chart2.addGraph(graph2);

        graph3 = new AmCharts.AmGraph();
        graph3.lineColor = "#b6d278";
        graph3.negativeLineColor = "#487dac"; // this line makes the graph to change color when it drops below 0
        graph3.bullet = "round";
        graph3.bulletSize = 8;
        graph3.bulletBorderColor = "#FFFFFF";

        graph3.bulletBorderThickness = 2;
        graph3.bulletBorderAlpha = 1;
        graph3.connect = false; // this makes the graph not to connect data points if data is missing
        graph3.lineThickness = 2;
        graph3.valueField = "value";
        graph3.balloonText = "[[category]]<br><b><span style='font-size:14px;'>[[value]] C</span></b>";
        chart3.addGraph(graph3);

        // CURSOR
//        var chartCursor = new AmCharts.ChartCursor();
//        chartCursor.cursorAlpha = 0;
//        chartCursor.cursorPosition = "mouse";
//        chartCursor.categoryBalloonDateFormat = "YYYY";
//        chartCursor.graphBulletSize = 2;
//        chart.addChartCursor(chartCursor);
//        chart2.addChartCursor(chartCursor);
//        chart3.addChartCursor(chartCursor);

        chart.creditsPosition = "bottom-right";
        chart3.creditsPosition = "bottom-left";

//        chart.creditsPosition = "bottom-right";


        // WRITE
        chart.write("a");
        chart2.write("b");
        chart3.write("c");


    });


};

var profileIn = function() {
    var profile = $('<li id="newPro">'+
        '<img>'+
        '<h1></h1>'+
        '<p>Weight: <span></span></p>'+
        '</li>');

    $('li#newPro').remove();
//        $('p').remove();



    $('ul#profileid').append(profile.clone());
    $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newPro h1').text("Sammy Hajalie");
    $('li#newPro p span').text("145 lbs");

//        console.log("you not here yet");

    $('ul#profileid').listview('refresh');
};


var goalin = function() {
    var profile = $('<li id="newGoal">'+
        '<h1></h1>'+
        '<p><span></span></p>'+
        '</li>');

    $('li#newGoal').remove();
//        $('p').remove();

    $('ul#goalmain').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newGoal h1').text("Goal:");
    $('li#newGoal p span').text("Gain 5 lbs");

//        console.log("you not here yet");

    $('ul#goalmain').listview('refresh');
};


var recentActivityIn = function() {
    var profile = $('<li id="newActivity">'+
        '<h1></h1>'+
        '<p><span></span></p>'+
        '</li>');




    $('ul#youractivityid').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity h1').text("Goal:");
    $('li#newActivity p span').text("Gain 5 lbs");

    $('ul#youractivityid').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity h1').text("Goal:");
    $('li#newActivity p span').text("Gain 5 lbs");


    $('ul#youractivityid').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity h1').text("Goal:");
    $('li#newActivity p span').text("Gain 5 lbs");

    $('ul#youractivityid').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity h1').text("Goal:");
    $('li#newActivity p span').text("Gain 5 lbs");

    $('ul#youractivityid').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity h1').text("Goal:");
    $('li#newActivity p span').text("Gain 5 lbs");

    $('ul#youractivityid').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity h1').text("Goal:");
    $('li#newActivity p span').text("Gain 5 lbs");

    $('ul#youractivityid').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity h1').text("Goal:");
    $('li#newActivity p span').text("Gain 5 lbs");

    $('ul#youractivityid').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity h1').text("Goal:");
    $('li#newActivity p span').text("Gain 5 lbs");

    $('ul#youractivityid').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity h1').text("Goal:");
    $('li#newActivity p span').text("Gain 5 lbs");

    $('ul#youractivityid').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity h1').text("Goal:");
    $('li#newActivity p span').text("Gain 5 lbs");


//        console.log("you not here yet");

    $('ul#youractivityid').listview('refresh');
};

var recentActivityIn2 = function() {
    var profile = $('<li id="newActivity2">'+
        '<h1></h1>'+
        '<p><span></span></p>'+
        '</li>');

    $('li.newActivity').remove();



    $('ul#youractivityid2').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity2 h1').text("WEIGHT:");
    $('li#newActivity2 p span').text("Gain 5 lbs");

    $('ul#youractivityid2').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity2 h1').text("WEIGHT:");
    $('li#newActivity2 p span').text("Gain 5 lbs");


    $('ul#youractivityid2').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity2 h1').text("WEIGHT:");
    $('li#newActivity2 p span').text("Gain 5 lbs");

    $('ul#youractivityid2').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity2 h1').text("WEIGHT:");
    $('li#newActivity2 p span').text("Gain 5 lbs");

    $('ul#youractivityid2').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity2 h1').text("WEIGHT:");
    $('li#newActivity2 p span').text("Gain 5 lbs");

    $('ul#youractivityid2').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity2 h1').text("WEIGHT:");
    $('li#newActivity2 p span').text("WEIGHT 5 lbs");

    $('ul#youractivityid2').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity2 h1').text("WEIGHT:");
    $('li#newActivity2 p span').text("WEIGHT 5 lbs");

    $('ul#youractivityid2').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity2 h1').text("WEIGHT:");
    $('li#newActivity2 p span').text("Gain 5 lbs");

    $('ul#youractivityid2').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity2 h1').text("WEIGHT:");
    $('li#newActivity2 p span').text("Gain 5 lbs");

    $('ul#youractivityid2').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newActivity2 h1').text("WEIGHT:");
    $('li#newActivity2 p span').text("Gain 5 lbs");


//        console.log("you not here yet");

    $('ul#youractivityid2').listview('refresh');
};

var recentActivityIn3 = function() {
    var profile = $('<li id="newActivity3" class="lastactivity">'+
        '<h1></h1>'+
        '<p><span></span></p>'+
        '</li>');


//    $('li#newActivity3').remove();

    $('li.lastactivity').remove();

//    $()


    for (var j = 0; j < chartData.length; j++) {
        $('li.lastactivity').remove();
//            $('h1').remove();
//            $('h1#newActivity3').remove();
    }

    console.log(chartData.length);


    var cList = $('youractivityid3');


    for (var i = 0; i < chartData.length; i++) {

        if (chartData[i].value != null) {

            $('ul#youractivityid3').append(profile.clone());

            $('li#newActivity3 h1').text("You weighed " + chartData[i].value + " lbs!");
            $('li#newActivity3 p span').text("on " + chartData[i].year);
            $('li#newActivity3').removeAttr('id');


        } else {


            console.log("NO!");
            continue;

        }
    }



    $('ul#youractivityid3').listview('refresh');
};



// SETTINGS PAGE
var settingsPageInIt = function () {

    var isPrivate = 0;
    var firstName = "Sammy";
    var lastName = "Smith";
    var initialWeight = 1;
    var goalWeight = 1;
    var goalNumber = 1;


    goalNumber = initialWeight - goalWeight;

    $("#slider2").change(function() {
        isPrivate = $("#slider2").val();

        if (isPrivate == "off") {
            isPrivate = 0;
        }

        if (isPrivate == "on") {
            isPrivate = 1;
        }

//            $('#togshow').text(state.toString());
    });


    $("#firstNameLabel").on("keyup change", function() {
        firstName = this.value; // omit "var" to make it global
        $("#dom_element").text(value);
    });
    console.log(firstName);


    $("#lastNameLabel").on("keyup change", function() {
        lastName = this.value; // omit "var" to make it global
        $("#dom_element").text(value);
    });
    console.log(lastName);

    $("#initialWeight").on("keyup change", function() {
        initialWeight = this.value; // omit "var" to make it global
        goalNumber = initialWeight - goalWeight;

        $("#dom_element").text(value);
    });
    console.log(initialWeight);


    $("#goalWeight").on("keyup change", function() {
        goalWeight = this.value; // omit "var" to make it global
        goalNumber = initialWeight - goalWeight;

        $("#dom_element").text(value);
    });
    console.log(goalWeight);


    $( "#saveSettings" ).click(function() {


        alert( "Handler for .click() called." );
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

    /*$("#fb_icon").click(function () {
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
    });*/

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
}
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
                   displayAchv = " achieved Beginner Bunny on ";
               else if(count == 1)
                   displayAchv = "achieved Healthy Hare on ";
               else if(count == 2)
                   displayAchv = "achieved Radical Rabbit on ";
               else if(count == 3)
                   displayAchv = "achieved Baby Carrot on ";
               else if(count == 4)
                   displayAchv = "achieved Carrot Pro on ";
               else if(count == 5)
                   displayAchv = "achieved Slim Carrot on ";
               else if(count == 6)
                   displayAchv = "achieved Slender Carrot on ";
               else if(count == 7)
                   displayAchv = "achieved 5 Carrot Log on ";
               else if(count == 8)
                   displayAchv = "achieved 10 Carrot Log on ";
               else if(count == 9)
                   displayAchv = "achieved 15 Carrot Log on ";
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

}

var sortFeed = function ()
{
    var elems = $('#friendsFeed').children('li').remove();

    elems.sort(function (a, b) {
        return parseInt(a.id) < parseInt(b.id);
    })
    $('#friendsFeed').append(elems);
};