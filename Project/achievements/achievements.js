/**
 * Created by Carla on 4/5/2014.
 */


$('#mydiv').share({
    networks: ['facebook','twitter']
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
