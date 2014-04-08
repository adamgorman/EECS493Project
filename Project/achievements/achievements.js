/**
 * Created by Carla on 4/5/2014.
 */


$('#mydiv').share({
    networks: ['facebook','twitter']
});

$("#w1").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<table>'+
        '<tr width="10">'+
        '<td><img src="dumbbell.jpg"></td>'+
        '<td>'+
        '<th>Workout</th>'+
        '</td>'+
        '</tr>'+
        '</table>'+
        '<p>worked out 4 times this week!</p></a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
    $('ul').append(value).listview('refresh');
});
$("#w2").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<table>'+
        '<tr width="10">'+
        '<td><img src="dumbbell.jpg"></td>'+
        '<td>'+
        '<th>Workout</th>'+
        '</td>'+
        '</tr>'+
        '</table>'+
        '<p>worked out 5 times this week!</p></a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
    $('ul').append(value).listview('refresh');
});
$("#w3").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<table>'+
        '<tr width="10">'+
        '<td><img src="dumbbell.jpg"></td>'+
        '<td>'+
        '<th>Workout</th>'+
        '</td>'+
        '</tr>'+
        '</table>'+
        '<p>worked out 6 times this week!</p></a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
    $('ul').append(value).listview('refresh');
});
$("#w4").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<table>'+
        '<tr width="10">'+
        '<td><img src="dumbbell.jpg"></td>'+
        '<td>'+
        '<th>Workout</th>'+
        '</td>'+
        '</tr>'+
        '</table>'+
        '<p>worked out 7 times this week!</p></a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
    $('ul').append(value).listview('refresh');
});
$("#h1").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<table>'+
        '<tr width="10">'+
        '<td><img src="healthy.jpg"></td>'+
        '<td>'+
        '<th>Healthy Diet</th>'+
        '</td>'+
        '</tr>'+
        '</table>'+
        '<p>following a healthy diet!</p></a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
    $('ul').append(value).listview('refresh');
});
$("#t1").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<table>'+
        '<tr width="10">'+
        '<td><img src="target.jpg"></td>'+
        '<td>'+
        '<th>Target Weight</th>'+
        '</td>'+
        '</tr>'+
        '</table>'+
        '<p>reached his target weight!</p></a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
    $('ul').append(value).listview('refresh');
});
$("#l1").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<table>'+
        '<tr width="10">'+
        '<td><img src="scale.jpg"></td>'+
        '<td>'+
        '<th>Lost Weight</th>'+
        '</td>'+
        '</tr>'+
        '</table>'+
        '<p>lost 1 pound this week!</p></a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
    $('ul').append(value).listview('refresh');
});
$("#l2").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<table>'+
        '<tr width="10">'+
        '<td><img src="scale.jpg"></td>'+
        '<td>'+
        '<th>Lost Weight</th>'+
        '</td>'+
        '</tr>'+
        '</table>'+
        '<p>lost 2 pounds this week!</p></a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
    $('ul').append(value).listview('refresh');
});
$("#l3").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<table>'+
        '<tr width="10">'+
        '<td><img src="scale.jpg"></td>'+
        '<td>'+
        '<th>Lost Weight</th>'+
        '</td>'+
        '</tr>'+
        '</table>'+
        '<p>lost 3 pounds this week!</p></a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
    $('ul').append(value).listview('refresh');
});
$("#i1").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<table>'+
        '<tr width="10">'+
        '<td><img src="checkmark.jpg"></td>'+
        '<td>'+
        '<th>Logged in</th>'+
        '</td>'+
        '</tr>'+
        '</table>'+
        '<p>logged in 5 days in a row!</p></a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
    $('ul').append(value).listview('refresh');
});
$("#i2").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<table>'+
        '<tr width="10">'+
        '<td><img src="checkmark.jpg"></td>'+
        '<td>'+
        '<th>Logged in</th>'+
        '</td>'+
        '</tr>'+
        '</table>'+
        '<p>logged in 10 days in a row!</p></a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
    $('ul').append(value).listview('refresh');
});
$("#i3").click(function () {
    var value=(('<li>'+'<a href="#share_achievement" data-rel="dialog">'+
        '<table>'+
        '<tr width="10">'+
        '<td><img src="checkmark.jpg"></td>'+
        '<td>'+
        '<th>Logged in</th>'+
        '</td>'+
        '</tr>'+
        '</table>'+
        '<p>logged in 15 days in a row!</p></a>'))
    $("#dup").html(value).listview();
    $("#dup").html(value).listview('refresh');
    $('ul').append(value).listview('refresh');
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
