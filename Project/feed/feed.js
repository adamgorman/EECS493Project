/**
 * Created by Carla on 4/6/2014.
 */

var first_name = "Al";
var last_name = "Jones";
var a1 = "achieved Beginner Bunny";
var a2 = "achieved Healthy Hare";
var a3 = "achieved Radical Rabbit";
var b1 = "achieved Baby Carrot";
var b2 = "achieved Carrot Pro";
var c1 = "achieved Slim Carrot";
var c2 = "achieved Slender Carrot";
var d1 = "achieved 5 Carrot Log";
var d2 = "achieved 10 Carrot Log";
var d3 = "achieved 15 Carrot Log";
var profile_pic = ('<img src=male.jpg>');
var friend_array_firstName=["A","B","C","D","E"];
var friend_array_lastName=["1","2","3","4","5"];
var Aactivity=["lost 3 pounds","logged in", "did something cool", "yay", "cool"]
var Atime =[3,7,6,1,9]
var Bactivitiy=["lifted weights","ran a mile"]
var Btime =[5,2]

var feedFriends = [
    { "firstName":"John" , "lastName":"Doe", "recentActivity":[{"activity":"logged in","time":"2"},{"activity":"cool","time":"4"}]},
    { "firstName":"Anna" , "lastName":"Smith","recentActivity":[{"activity":"worked out","time":"1"}]},
    { "firstName":"Peter" , "lastName": "Jones","recentActivity":[{"activity":"compared","time":"3"}] }
];

$("#add_to_feed").click(function () {
    /*$("ul").prepend('<li><div><table><tr>'+
            '<td><img src="male.jpg"></td>'+
                '<td><h2 id="cur_name" class ="adjust_indent">'+first_name+" "+last_name +'</h2><p class ="adjust_indent">'+d2+'</p></td></tr>'+
        '</table></div></li>');
    $('ul').listview('refresh');*/
});

var addFriends = function(){
    var count = 0;
    for(var i = 0; i < feedFriends.length; i++)
    {
        for(var j = 0; j < feedFriends[i].recentActivity.length; j++) {
            var toAdd = $('<li id = ' + feedFriends[i].recentActivity[j].time +'><div><table><tr>' +
                '<td><img src="male.jpg"></td>' +
                '<td><h2 id="cur_name" class ="adjust_indent">' + feedFriends[i].firstName + " " + feedFriends[i].lastName + '</h2>' +
                '<p class ="adjust_indent">' + feedFriends[i].recentActivity[j].activity +
                '</p></td></tr>' +
                '</table></div></li>');


            $("ul").prepend(toAdd);
            count++;
        }
    }
    alert($("#10").size())
    $('ul').listview('refresh');

}
