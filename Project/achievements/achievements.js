/**
 * Created by Carla on 4/5/2014.
 */

$('#mydiv').share({
    networks: ['facebook','twitter']
});

$("#w1").click(function () {
    var value=('<table><tr><td><img src="dumbbell.jpg"></td><td><h2 class ="adjust_indent">Beginner Bunny Achieved!</h2>'+
        '<p class ="adjust_indent">You worked out 5 times in 1 week</p></td></tr></table>')
    $("#a1").html(value);
    $("#ws1").attr("href","#share_achievement");
});
$("#ws1").click(function () {
    var value=('<table><tr><td><img src="dumbbell.jpg"></td><td><h2 class ="adjust_indent">Beginner Bunny Achieved!</h2>'+
        '<p class ="adjust_indent">You worked out 5 times in 1 week</p></td></tr></table>')
    $("#dup").html(value);
});
$("#w2").click(function () {
    var value=('<table><tr><td><img src="dumbbell.jpg"></td><td><h2 class ="adjust_indent">Healthy Hare Achieved!</h2>'+
        '<p class ="adjust_indent">You worked out 6 times in 1 week</p></td></tr></table>')
    $("#a2").html(value);
    $("#ws2").attr("href","#share_achievement");
});
$("#ws2").click(function () {
    var value=('<table><tr><td><img src="dumbbell.jpg"></td><td><h2 class ="adjust_indent">Healthy Hare Achieved!</h2>'+
        '<p class ="adjust_indent">You worked out 6 times in 1 week</p></td></tr></table>')
    $("#dup").html(value);
});
$("#w3").click(function () {
    var value=('<table><tr><td><img src="dumbbell.jpg"></td><td><h2 class ="adjust_indent">Radical Rabbit Achieved!</h2>'+
        '<p class ="adjust_indent">You worked out 7 times in 1 week</p></td></tr></table>')
    $("#a3").html(value);
    $("#ws3").attr("href","#share_achievement");
});
$("#ws3").click(function () {
    var value=('<table><tr><td><img src="dumbbell.jpg"></td><td><h2 class ="adjust_indent">Radical Rabbit Achieved!</h2>'+
        '<p class ="adjust_indent">You worked out 7 times in 1 week</p></td></tr></table>')
    $("#dup").html(value);
});
$("#h1").click(function () {
    var value=('<table><tr><td><img src="healthy.jpg"></td><td><h2 class ="adjust_indent">Baby Carrot Achieved!</h2>'+
        '<p class ="adjust_indent">Under 2000 calories 3 days in 1 week</p></td></tr></table>')
    $("#b1").html(value);
    $("#hs1").attr("href","#share_achievement");
});
$("#hs1").click(function () {
    var value=('<table><tr><td><img src="healthy.jpg"></td><td><h2 class ="adjust_indent">Baby Carrot Achieved!</h2>'+
        '<p class ="adjust_indent">Under 2000 calories 3 days in 1 week</p></td></tr></table>')
    $("#dup").html(value);
});
$("#h2").click(function () {
    var value=('<table><tr><td><img src="healthy.jpg"></td><td><h2 class ="adjust_indent">Carrot Pro Achieved!</h2>'+
        '<p class ="adjust_indent">Under 2000 calories 5 days in 1 week</p></td></tr></table>')
    $("#b2").html(value);
    $("#hs2").attr("href","#share_achievement");
});
$("#hs2").click(function () {
    var value=('<table><tr><td><img src="healthy.jpg"></td><td><h2 class ="adjust_indent">Carrot Pro Achieved!</h2>'+
        '<p class ="adjust_indent">Under 2000 calories 5 days in 1 week</p></td></tr></table>')
    $("#dup").html(value);
});



$("#l1").click(function () {
    var value=('<table><tr><td><img src="scale.jpg"></td><td><h2 class ="adjust_indent">Slim Carrot Achieved!</h2>'+
        '<p class ="adjust_indent">Lost 3 pounds from starting weight</p></td></tr></table>')
    $("#c1").html(value);
    $("#ls1").attr("href","#share_achievement");
});
$("#ls1").click(function () {
    var value=('<table><tr><td><img src="scale.jpg"></td><td><h2 class ="adjust_indent">Slim Carrot Achieved!</h2>'+
        '<p class ="adjust_indent">Lost 3 pounds from starting weight</p></td></tr></table>')
    $("#dup").html(value);
});
$("#l2").click(function () {
    var value=('<table><tr><td><img src="scale.jpg"></td><td><h2 class ="adjust_indent">Slender Carrot Achieved!</h2>'+
        '<p class ="adjust_indent">Lost 5 pounds from starting weight</p></td></tr></table>')
    $("#c2").html(value);
    $("#ls2").attr("href","#share_achievement");
});
$("#ls2").click(function () {
    var value=('<table><tr><td><img src="scale.jpg"></td><td><h2 class ="adjust_indent">Slender Carrot Achieved!</h2>'+
        '<p class ="adjust_indent">Lost 5 pounds from starting weight</p></td></tr></table>')
    $("#dup").html(value);
});

$("#i1").click(function () {
    var value=('<table><tr><td><img src="checkmark.jpg"></td><td><h2 class ="adjust_indent">5 Carrot Log Achieved!</h2>'+
        '<p class ="adjust_indent">Logged in 5 days in a row</p></td></tr></table>')
    $("#d1").html(value);
    $("#is1").attr("href","#share_achievement");
});
$("#is1").click(function () {
    var value=('<table><tr><td><img src="checkmark.jpg"></td><td><h2 class ="adjust_indent">5 Carrot Log Achieved!</h2>'+
        '<p class ="adjust_indent">Logged in 5 days in a row</p></td></tr></table>')
    $("#dup").html(value);
});
$("#i2").click(function () {
    var value=('<table><tr><td><img src="checkmark.jpg"></td><td><h2 class ="adjust_indent">10 Carrot Log Achieved!</h2>'+
        '<p class ="adjust_indent">Logged in 10 days in a row</p></td></tr></table>')
    $("#d2").html(value);
    $("#is2").attr("href","#share_achievement");
});
$("#is2").click(function () {
    var value=('<table><tr><td><img src="checkmark.jpg"></td><td><h2 class ="adjust_indent">10 Carrot Log Achieved!</h2>'+
        '<p class ="adjust_indent">Logged in 10 days in a row</p></td></tr></table>')
    $("#dup").html(value);
});
$("#i3").click(function () {
    var value=('<table><tr><td><img src="checkmark.jpg"></td><td><h2 class ="adjust_indent">15 Carrot Log Achieved!</h2>'+
        '<p class ="adjust_indent">Logged in 15 days in a row</p></td></tr></table>')
    $("#d3").html(value);
    $("#is3").attr("href","#share_achievement");
});
$("#is3").click(function () {
    var value=('<table><tr><td><img src="checkmark.jpg"></td><td><h2 class ="adjust_indent">15 Carrot Log Achieved!</h2>'+
        '<p class ="adjust_indent">Logged in 15 days in a row</p></td></tr></table>')
    $("#dup").html(value);
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
