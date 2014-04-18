Parse.initialize("PAjzQPglIFtzZyMJfDPe5Ozvfzr7Pz1ukpHoLXct", "zTU8emhQIg5xTKZrhfF5ulrKnXQv4M6ztT9kFi90");

console.log("whhhhhhhy");

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
});
var compareUsersByUsername = function(a, b) { //intentionally backwards
    if(a.username > b.username)
        return -1;
    else if(a.username < b.username)
        return 1;
    else
        return 0;
};
var initForAll = function() {
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


    user = rUser.attributes;
    // friends
    user.friendUsernames.forEach(function(fUsername) {
        new Parse.Query(Parse.User).equalTo("username", fUsername).find({
            success: function(buddy) {
                friends.push(buddy[0].attributes);
            }
        });
    });
    // sent friend requests
    user.sentRequests.forEach(function(fUsername) {
        new Parse.Query(Parse.User).equalTo("username", fUsername).find({
            success: function(buddy) {
                sentRequests.push(buddy[0].attributes);
            }
        });
    });
    // pending friend requests
    user.pendingRequests.forEach(function(fUsername) {
        new Parse.Query(Parse.User).equalTo("username", fUsername).find({
            success: function(buddy) {
                pendingRequests.unshift(buddy[0].attributes);
                $.mobile.loading('hide');
                $.mobile.changePage("main/main.html");
            }
        });
    });

    var exerciseArray = user.get("exerciseEntries");

    for(var i = 0; i < exerciseArray.length; i++){
        //Get the objectiD of the input
        var exId = exerciseArray[i];
        //Open on query on the ExerciseInput table
        var inputQuery = new Parse.Query("ExerciseInput");
        //Look for the matching objectId
        inputQuery.equalTo("objectId", exId);
        inputQuery.find({
            success: function(result) {
                //When you find it, print its date and value variables.
                console.log("query returned: " + result[0].get("date") + " "
                    + result[0].get("value"));


                excerciseArrayReal[i] = {
                    "value": result[i].get("value"),
                    "date": result[i].get("date")
                }
            },
            error: function(result) {
                alert("COULDN'T FIND OBJECT IN TABLE");
            }
        });
    }

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
            $('li#new-person img').attr('src', friend.pic.url());
            $('li#new-person h2').text(friend.username);
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
            $('li#new-person img').attr('src', friend.pic.url());
            $('li#new-person h2').text(friend.username);
            $('li#new-person p span').text("Some goal");
            $('li#new-person').removeAttr('id').addClass('ui-disabled');
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
    $('#friend-name-cell').text(websiteData.compareFriend.username);

    // pictures
    $('#compare-me-pic').attr('src', user.pic.url());
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
    for(i = 0; i <= user.achievementArray.length; i++) {
        if(user.achievementArray[i] == 0) {
            $("tr.achievement" + i + "-row td.personal-cell").text("-");
        } else {
            $("tr.achievement" + i + "-row td.personal-cell").text("X");
        }
    }
    for(i = 0; i <= user.achievementArray.length; i++) {
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
            $('li#new-person img').attr('src', friend.pic.url());
            $('li#new-person span.friend-request-list-name').text(friend.username);
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
    var index = $(event.target).closest('li').data("pending-index");
    friends.push(pendingRequests[index]);
    pendingRequests.splice(index, 1);
    $(event.target).closest('li').remove();
    checkNoFriendRequests();
    return false;
};
var denyClickForRequests = function() {
    pendingRequests.splice($(event.target).closest('li').data("pending-index"), 1);
    $(event.target).closest('li').remove();
    checkNoFriendRequests();
    return false;
};

// Add Friend Popup
var addFriendInit = function() {
    $('#add-friend-popup #add-friend-form').on("submit", function() {
        var username = $('#add-friend-popup input[type=text]').val();
        $('#add-friend-popup input[type=text]').val("");
        var index = alreadyPending(username);
        if(alreadyFriend(username)) { // already friend
            $('#add-friend-popup .form-error-text').text(username + " is already your friend.");
        } else if(alreadyRequested(username)) { // friend request processing
            $('#add-friend-popup .form-error-text').text("Request to " + username + " is already sent.");
        } else if(username == user.username) {
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
        if(buddy.username == username) {
            result = true;
        }
    });
    return result;
};
var alreadyRequested = function(username) {
    var result = false;
    sentRequests.forEach(function(buddy) {
        if(buddy.username == username) {
            result = true;
        }
    });
    return result;
};
var alreadyPending = function(username) {
    var result = -1;
    pendingRequests.forEach(function(buddy, index) {
        if(buddy.username == username) {
            result = index;
        }
    });
    return result;
};
var getPersonForRequest = function(username) {
    new Parse.Query(Parse.User).equalTo("username", username).find({
        success: function(buddy) {
            if(buddy.length == 0) {
                $('#add-friend-popup .form-error-text').text(username + " does not exist.");
            } else {
                // add them as a sent request on your account
                // add you to their pending requests
                sentRequests.push(buddy[0].attributes);
                $.mobile.changePage("friends.html");
            }
        }
    });
};



// HOME PAGE CONTENT YO
var homepageContents = function() {
    $(document).ready(function() {

        $('.iosSlider').iosSlider({
            snapToChildren: true,
            desktopClickDrag: true,
            infiniteSlider: true,
            snapSlideCenter: true
        });

    });


    $(document).delegate('.ui-navbar ul li > a', 'click', function () {
        chart.invalidateSize();
        chart2.invalidateSize();
        chart3.invalidateSize();

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


    console.log("yo in this function chart");

    for (var i = 0; i < excerciseArrayReal.length; i++) {
        console.log(excerciseArrayReal[i]);
    }

    AmCharts.ready(function () {
        // SERIAL CHART



        chart = new AmCharts.AmSerialChart();
        chart.pathToImages = "../main/amcharts_3.4.7.free/amcharts/images/";
        chart.marginTop = 0;
        chart.marginRight = 0;
        chart.dataProvider = chartData;
        chart.categoryField = "year";
        chart.dataDateFormat = "YYYY";
        chart.balloon.cornerRadius = 6;

        chart2 = new AmCharts.AmSerialChart();
        chart2.pathToImages = "../main/amcharts_3.4.7.free/amcharts/images/";
        chart2.marginTop = 0;
        chart2.marginRight = 0;
        chart2.dataProvider = chartData;
        chart2.categoryField = "year";
        chart2.dataDateFormat = "YYYY";
        chart2.balloon.cornerRadius = 6;

        chart3 = new AmCharts.AmSerialChart();
        chart3.pathToImages = "../main/amcharts_3.4.7.free/amcharts/images/";
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

