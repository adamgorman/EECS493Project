/**
 * Created by Carla on 4/5/2014.
 */

$('#mydiv').share({
    networks: ['facebook','twitter']
});

$("#w1").click(function () {
    var value=('<table><tr><td><img src="checkmark.jpg"></td><td><h2>Beginner Bunny Achieved!</h2>'+
        '<p>You worked out 5 times in 1 week</p></td></tr></table>')
    $("#a1").html(value);

});
$("li").click(function () {
    var value=('<table><tr><td><img src="checkmark.jpg"></td><td><h2>Beginner Bunny Achieved!</h2>'+
        '<p>You worked out 5 times in 1 week</p></td></tr></table>')
    $("#dup").html(value);
    alert("clicked");
});
$("#w2").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="dumbbell.jpg">'+
        '<h2>Workout</h2>'+'<p>worked out 6 times this week!</p>'+
        '</a>'))
    $("#a2").html(value).listview({ inset: true });
    $("#a2").html(value).listview('refresh');
});
$("#a2").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="dumbbell.jpg">'+
        '<h2>Workout</h2>'+'<p>worked out 6 times this week!</p>'+
        '</a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
});
$("#w3").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="dumbbell.jpg">'+
        '<h2>Workout</h2>'+'<p>worked out 7 times this week!</p>'+
        '</a>'))
    $("#a3").html(value).listview();
    $("#a3").html(value).listview('refresh');
});
$("#a3").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="dumbbell.jpg">'+
        '<h2>Workout</h2>'+'<p>worked out 7 times this week!</p>'+
        '</a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
});

$("#h1").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="healthy.jpg">'+
        '<h2>Healthy Diet</h2>'+'<p>following a healthy diet!</p>'+
        '</a>'))
    $("#b1").html(value).listview();
    $("#b1").html(value).listview('refresh');
});
$("#b1").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="healthy.jpg">'+
        '<h2>Healthy Diet</h2>'+'<p>following a healthy diet!</p>'+
        '</a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
});
$("#h2").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="healthy.jpg">'+
        '<h2>Healthy Diet</h2>'+'<p>following a healthy diet!</p>'+
        '</a>'))
    $("#b2").html(value).listview();
    $("#b2").html(value).listview('refresh');
});
$("#b2").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="healthy.jpg">'+
        '<h2>Healthy Diet</h2>'+'<p>following a healthy diet!</p>'+
        '</a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
});
$("#l1").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="scale.jpg">'+
        '<h2>Lost Weight</h2>'+'<p>lost 3 pounds!</p>'+
        '</a>'))
    $("#c1").html(value).listview();
    $("#c1").html(value).listview('refresh');
});
$("#c1").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="scale.jpg">'+
        '<h2>Lost Weight</h2>'+'<p>lost 3 pounds!</p>'+
        '</a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
});
$("#l2").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="scale.jpg">'+
        '<h2>Lost Weight</h2>'+'<p>lost 5 pounds!</p>'+
        '</a>'))
    $("#c2").html(value).listview();
    $("#c2").html(value).listview('refresh');
});
$("#c2").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="scale.jpg">'+
        '<h2>Lost Weight</h2>'+'<p>lost 5 pounds!</p>'+
        '</a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
});

$("#i1").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="checkmark.jpg">'+
        '<h2>Logged in</h2>'+'<p>logged in 5 days in a row!</p>'+
        '</a>'))
    $("#d1").html(value).listview();
    $("#d1").html(value).listview('refresh');
});
$("#d1").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="checkmark.jpg">'+
        '<h2>Logged in</h2>'+'<p>logged in 5 days in a row!</p>'+
        '</a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
});
$("#i2").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="checkmark.jpg">'+
        '<h2>Logged in</h2>'+'<p>logged in 10 days in a row!</p>'+
        '</a>'))
    $("#d2").html(value).listview();
    $("#d2").html(value).listview('refresh');
});
$("#d2").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="checkmark.jpg">'+
        '<h2>Logged in</h2>'+'<p>logged in 10 days in a row!</p>'+
        '</a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
});
$("#i3").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="checkmark.jpg">'+
        '<h2>Logged in</h2>'+'<p>logged in 15 days in a row!</p>'+
        '</a>'))
    $("#d3").html(value).listview();
    $("#d3").html(value).listview('refresh');
});
$("#d3").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<img src="checkmark.jpg">'+
        '<h2>Logged in</h2>'+'<p>logged in 15 days in a row!</p>'+
        '</a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
});


//$("li").click(function () {
//    FB.init({appId: 496828853760637,
//        status: true,
//        cookie:true
//    });
//    FB.ui(
//        {
//            method: "stream.publish",
//            display: "iframe",
//            user_message_prompt: "Publish this",
//            attachment: {
//                name: "Joe Schmoe's achievement on Workout Carrot",
//                description: "Joe Schmoe worked out 6 times this week!"
////                        media: [("src", 'dumbell.jpg')]
//            }
//        },
//        function (response) {
//            if (response && response.post_id) {
//                alert('Post was published.');
//            } else {
//                alert('Post was not published.');
//            }
//        }
//    );
//});
