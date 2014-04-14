/**
 * Created by Carla on 4/6/2014.
 */

var first_name = "Bob";
var last_name = "Jones";
var a1 = "achieved Beginner Bunny";
var a2 = "achieved Healthy Hare";
var a3 = "achieved Radical Rabbit";
var b1 = "achieved Baby Carrot";
var b2 = "achieved Carrot Pro";
var c1 = "achieved Slim Carrot";
var c2 = "achieved Slender Carrot";
var d1 = "achieved 5 Carrot Log";
var profile_pic = ('<img src=male.jpg>');

$("#add_to_feed").click(function () {
    $("ul").prepend('<li><div><table><tr>'+
            '<td><img src="male.jpg"></td>'+
                '<td><h2 class ="adjust_indent">Bob Smith</h2><p class ="adjust_indent">achieved Beginner Bunny</p></td></tr>'+
        '</table></div></li>');
    $('ul').listview('refresh');
});