/**
 * Created by Carla on 4/5/2014.
 */

$('#mydiv').share({
    networks: ['facebook','twitter']
});

var achv_array=["one", "two", "three", "four", "five", "six","seven","eight","nine","ten"];
for (var i = 0; i < achv_array.length; ++i) { achv_array[i] = false; }

var achv0 = ('<table><tr><td><img src="dumbbell.jpg"></td><td><h2 class ="adjust_indent">Beginner Bunny Achieved!</h2>' +
    '<p class ="adjust_indent">You worked out 5 times in 1 week</p></td></tr></table>');
var achv1=('<table><tr><td><img src="dumbbell.jpg"></td><td><h2 class ="adjust_indent">Healthy Hare Achieved!</h2>'+
    '<p class ="adjust_indent">You worked out 6 times in 1 week</p></td></tr></table>');
var achv2=('<table><tr><td><img src="dumbbell.jpg"></td><td><h2 class ="adjust_indent">Radical Rabbit Achieved!</h2>'+
    '<p class ="adjust_indent">You worked out 7 times in 1 week</p></td></tr></table>');
var achv3=('<table><tr><td><img src="healthy.jpg"></td><td><h2 class ="adjust_indent">Baby Carrot Achieved!</h2>'+
    '<p class ="adjust_indent">Under 2000 calories 3 days in 1 week</p></td></tr></table>');
var achv4=('<table><tr><td><img src="healthy.jpg"></td><td><h2 class ="adjust_indent">Carrot Pro Achieved!</h2>'+
    '<p class ="adjust_indent">Under 2000 calories 5 days in 1 week</p></td></tr></table>');
var achv5=('<table><tr><td><img src="scale.jpg"></td><td><h2 class ="adjust_indent">Slim Carrot Achieved!</h2>'+
    '<p class ="adjust_indent">Lost 3 pounds from starting weight</p></td></tr></table>');
var achv6=('<table><tr><td><img src="scale.jpg"></td><td><h2 class ="adjust_indent">Slender Carrot Achieved!</h2>'+
    '<p class ="adjust_indent">Lost 5 pounds from starting weight</p></td></tr></table>');
var achv7=('<table><tr><td><img src="checkmark.jpg"></td><td><h2 class ="adjust_indent">5 Carrot Log Achieved!</h2>'+
    '<p class ="adjust_indent">Logged in 5 days in a row</p></td></tr></table>');
var achv8=('<table><tr><td><img src="checkmark.jpg"></td><td><h2 class ="adjust_indent">10 Carrot Log Achieved!</h2>'+
    '<p class ="adjust_indent">Logged in 10 days in a row</p></td></tr></table>');
var achv9=('<table><tr><td><img src="checkmark.jpg"></td><td><h2 class ="adjust_indent">15 Carrot Log Achieved!</h2>'+
    '<p class ="adjust_indent">Logged in 15 days in a row</p></td></tr></table>');
Parse.initialize("PAjzQPglIFtzZyMJfDPe5Ozvfzr7Pz1ukpHoLXct", "zTU8emhQIg5xTKZrhfF5ulrKnXQv4M6ztT9kFi90");

var username = "username";
var password = "password";


var user = Parse.User.logIn(username, password, {
    success: function (user) {
        // if login is successful
//        alert("You have logged in");
        var aArray = user.get("achievementArray");
        if(!aArray[0]) {
            $("#a1").html(achv0);
            $("#ws1").attr("href", "#share_achievement");
        };
        $("#ws1").click(function () {
            $("#dup").html(achv0);
//    e.preventDefault();
            FB.init({
//                appId : '496828853760637',
                //apiKey: '95df48eb35db42b7a4dbca37b4e55bae'
                appId: '1578778675680791',
                apiKey: 'a092a4e59e6b899c2a2e38c4b8adbc96',
                status : true, // check login status
                cookie : true, // enable cookies to allow the server to access the session
                name: "Workout Carrot",
                link: 'http://workoutcarrot.parseapp.com/'
            });
            FB.ui(
                {
                    method: 'feed',
                    name: 'This is the content of the "name" field.'
                });
        });
        if(!aArray[1]){
            $("#a2").html(achv1);
            $("#ws2").attr("href","#share_achievement");
        }
        $("#ws2").click(function () {
            $("#dup").html(achv1);
        });
        if(!aArray[2]) {
            $("#a3").html(achv2);
            $("#ws3").attr("href","#share_achievement");
        }
        $("#ws3").click(function () {
            $("#dup").html(achv2);
        });
        if(!aArray[3]){

            $("#b1").html(achv3);
            $("#hs1").attr("href","#share_achievement");
        }
        $("#hs1").click(function () {

            $("#dup").html(achv3);
        });
        if(!aArray[4]) {
            $("#b2").html(achv4);
            $("#hs2").attr("href","#share_achievement");
        }
        $("#hs2").click(function () {
            $("#dup").html(achv4);
        });

        if(!aArray[5]){
            $("#c1").html(achv5);
            $("#ls1").attr("href","#share_achievement");
        }
        $("#ls1").click(function () {
            $("#dup").html(achv5);
        });
        if(!aArray[6]) {
            $("#c2").html(achv6);
            $("#ls2").attr("href","#share_achievement");
        }
        $("#ls2").click(function () {
            $("#dup").html(achv6);
        });

        if(!aArray[7]) {
            $("#d1").html(achv7);
            $("#is1").attr("href","#share_achievement");
        }
        $("#is1").click(function () {
            $("#dup").html(achv7);
        });
        if(!aArray[8]) {
            $("#d2").html(achv8);
            $("#is2").attr("href","#share_achievement");
        }
        $("#is2").click(function () {
            $("#dup").html(achv8);
        });
        if(!aArray[9]) {
            $("#d3").html(achv9);
            $("#is3").attr("href","#share_achievement");
        }
        $("#is3").click(function () {
            $("#dup").html(achv9);
        });
    },

    error: function (user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
    }
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
