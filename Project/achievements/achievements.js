/**
 * Created by Carla on 4/5/2014.
 */


$('#mydiv').share({
    networks: ['facebook','twitter']
});

$( "#popupPanel" ).on({
    popupbeforeposition: function() {
        var h = $( window ).height();

        $( "#popupPanel" ).css( "height", h );
    }
});

