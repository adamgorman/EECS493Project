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

// HOME PAGE DATA
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
]

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



}


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
        console.log("okay dude");
        inputPageInit();
    } else if(pageId == "friends-page") {
        friendsInit();
    } else if(pageId == "friend-compare-page") {
        friendCompareInit();
    } else if(pageId == "friend-request-popup") {
        friendRequestInit();
    } else if(pageId == "add-friend-popup") {
        addFriendInit();
    } else if (pageId == "page1") {

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

            console.log("running");
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

//dskdnskn
//    chartFunction();

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


    for (var i = 0; i < arrayK.length; i++) {
        console.log(arrayK[i].value);
    }


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
        var input = $.extend({},inputTemplate);
        var date = new Date();
        input.dateNum = Date.now();
        input.dateString = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
        input.value = $('#input-form input[type=number]').val();
        if(input.value == "" || input.value == null) {
            $('#input-form .form-error-text').text("Please enter a value.");
            $.mobile.loading('hide');
        } else if(input.value < 0) {
            $('#input-form .form-error-text').text("Value should not negative.");
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
                    user.get('weightEntries')[arrayLength - 1].value = parseInt(input.value) + parseInt(user.get('weightEntries')[arrayLength - 1].value);
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

// HOME PAGE CONTENT
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


    for (var i = 0; i < arrayK.length; i++) {
        console.log(arrayK[i].value);
    }


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
    graph.lineColor = "#b6d278";
    graph.negativeLineColor = "#487dac"; // this line makes the graph to change color when it drops below 0
    graph.bullet = "round";
    graph.bulletSize = 8;
    graph.bulletBorderColor = "#FFFFFF";

    graph.bulletBorderThickness = 2;
    graph.bulletBorderAlpha = 1;
    graph.connect = true; // this makes the graph not to connect data points if data is missing / changeed
    graph.lineThickness = 2;
    graph.valueField = "value";
    graph.balloonText = "[[category]]<br><b><span style='font-size:14px;'>[[value]] C</span></b>";
    chart.addGraph(graph);

    graph2;
    graph2.lineColor = "#b6d278";
    graph2.negativeLineColor = "#487dac"; // this line makes the graph to change color when it drops below 0
    graph2.bullet = "round";
    graph2.bulletSize = 8;
    graph2.bulletBorderColor = "#FFFFFF";

    graph2.bulletBorderThickness = 2;
    graph2.bulletBorderAlpha = 1;
    graph2.connect = true; // this makes the graph not to connect data points if data is missing
    graph2.lineThickness = 2;
    graph2.valueField = "value";
    graph2.balloonText = "[[category]]<br><b><span style='font-size:14px;'>[[value]] C</span></b>";
    chart2.addGraph(graph2);

    graph3;
    graph3.lineColor = "#b6d278";
    graph3.negativeLineColor = "#487dac"; // this line makes the graph to change color when it drops below 0
    graph3.bullet = "round";
    graph3.bulletSize = 8;
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

        $('.iosSlider').iosSlider({
            snapToChildren: true,
            desktopClickDrag: true,
            infiniteSlider: true,
            snapSlideCenter: true
        });

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

var profileIn = function() {
    var profile = $('<li id="newPro">'+
        '<img>'+
        '<h1></h1>'+
        '<p>Weight: <span></span></p>'+
        '</li>');

    $('li#newPro').remove();
//        $('p').remove();

    updateUserWeight();

    $('ul#profileid').append(profile.clone());
    $('li#newPro img').attr('src', user.get('pic').url());
    $('li#newPro h1').text(user.get('firstName') + " " + user.get('lastName'));
    $('li#newPro p span').text(currentWeight);

    $('ul#profileid').listview('refresh');
};


var goalin = function() {

    updateUserWeight();

    var profile = $('<li id="newGoal">'+
        '<h1></h1>'+
        '<p><span></span></p>'+
        '</li>');

    $('li#newGoal').remove();
//        $('p').remove();

    $('ul#goalmain').append(profile.clone());
//        $('li#newPro img').attr('src', 'img/mypic.jpg');
    $('li#newGoal h1').text("Goal: " +  user.get("weightGoal"));
    $('li#newGoal p span').text(stringForGoal);

    $('ul#goalmain').listview('refresh');
};


var recentActivityIn = function() {
    var profile = $('<li id="newActivity1" class="lastactivity1">'+
        '<h1></h1>'+
        '<p><span></span></p>'+
        '</li>');


    $('li.lastactivity1').remove();


    for (var j = 0; j < arrayK.length; j++) {
        $('li.lastactivity1').remove();
//            $('h1').remove();
//            $('h1#newActivity3').remove();
    }

    var cList = $('youractivityid');

    var count2 = 0;
    for (var i = 0; i < arrayCalories.length; i++) {

        if (arrayCalories[i].value != null) {

            $('ul#youractivityid').append(profile.clone());

            $('li#newActivity1 h1').text("You " + ateVerbs[count2] + arrayCalories[i].value + " calories");
            $('li#newActivity1 p span').text("on " + arrayCalories[i].date);
            $('li#newActivity1').removeAttr('id');

            count2++;

            if (count2 == ateVerbs.length) {
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
        '<h1></h1>'+
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

    for (var i = 0; i < arrayK.length; i++) {

        if (arrayK[i].value != null) {

            $('ul#youractivityid2').append(profile.clone());

            $('li#newActivity2 h1').text("You worked out for " + arrayK[i].value + " hours!");
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
        '<h1></h1>'+
        '<p><span></span></p>'+
        '</li>');

    $('li.lastactivity').remove();

    for (var j = 0; j < arrayWeight.length; j++) {
        $('li.lastactivity').remove();
//            $('h1').remove();
//            $('h1#newActivity3').remove();
    }

    var cList = $('youractivityid3');


    for (var i = 0; i < arrayWeight.length; i++) {

        if (arrayWeight[i].value != null) {

            $('ul#youractivityid3').append(profile.clone());

            $('li#newActivity3 h1').text("You weighed " + arrayWeight[i].value + " lbs!");
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
    var lastName = user.get("lastName")
    var initialWeight = 1;
    var goalWeight = user.get("weightGoal");
    var goalNumber = 1;
    goalNumber = initialWeight - goalWeight;

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


    $( "#saveSettings" ).click(function() {
//        user.set("privateWeight", isPrivate);
        user.set("firstName", firstName);
        user.set("lastName", lastName);
        user.set("weightGoal", goalWeight);
        user.set("privateWeight", isPrivate);

        user.save();

        alert( "Settings Saved!" );
    });

};
