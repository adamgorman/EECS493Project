/**
 * Created by Carla on 4/6/2014.
 */

/*var feedFriends = [
    { "firstName":"John" , "lastName":"Doe",
        "recentActivity":[{"activity":"logged in","date":"March 1, 2012"},{"activity":"cool","date":"March 27, 2012"}]},
    { "firstName":"Anna" , "lastName":"Smith",
        "recentActivity":[{"activity":"worked out","date":"March 25, 2012"}]},
    { "firstName":"Peter" , "lastName": "Jones",
        "recentActivity":[{"activity":"compared","date":"March 1, 2012"},{"activity":"dsfsd","date":"March 28, 2012"}] }
];

var addFriends = function(){
    var count = 0;
    for(var i = 0; i < feedFriends.length; i++)
    {
        for(var j = 0; j < feedFriends[i].recentActivity.length; j++) {
            var toAdd = $('<li id = ' + Date.parse(feedFriends[i].recentActivity[j].date) +'><div><table><tr>' +
                '<td><img src="male.jpg"></td>' +
                '<td><h2 id="cur_name" class ="adjust_indent">' + feedFriends[i].firstName + " " + feedFriends[i].lastName + '</h2>' +
                '<p class ="adjust_indent">' + feedFriends[i].recentActivity[j].activity + " on " + feedFriends[i].recentActivity[j].date +
                '</p></td></tr>' +
                '</table></div></li>');

            $("#friendsFeed").prepend(toAdd);
            count++;
        }
    }
//    alert($("#13").size())
    sortFeed();
    $("#friendsFeed").listview('refresh');
}

var sortFeed = function(){
    var elems = $('#friendsFeed').children('li').remove();

    elems.sort(function(a,b){
        return parseInt(a.id) < parseInt(b.id);
    })
    $('#friendsFeed').append(elems);
};*/
