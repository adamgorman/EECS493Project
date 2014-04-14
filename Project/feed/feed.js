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

$("#add_to_feed").click(function () {
    $("ul").prepend('<li><div><table><tr>'+
            '<td><img src="male.jpg"></td>'+
                '<td><h2 id="cur_name" class ="adjust_indent">'+first_name+" "+last_name +'</h2><p class ="adjust_indent">'+d2+'</p></td></tr>'+
        '</table></div></li>');
    $('ul').listview('refresh');
});

var element=document.getElementById("cur_name");
element.innerHTML="New Header";