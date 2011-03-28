(function( $ ) {
  $.noConflict();

  $(function() {

  	$(document).bind("keydown", function( event ) {
  		Emit.last = ({
				81: 0,
				87: 1,
				69: 2,
				82: 3
  		})[ event.which ];
  	});

    $("#divRightCol").css({
      marginLeft: "0px",
      marginTop: "0px"
    });

    var $videoStack = $("#video-stack"),
    		$video = $("<video/>"),
    		times = [
    			{
    				in: 9,
    				out: 10
    			},
    			{
    				in: 17,
    				out: 18,
    			},
    			{
    				in: 21,
    				out: 22
    			},
    			{
    				in: 27,
    				out: 28
    			}
    		],
    		controllers = {
          "playing" : "play",
          "paused"  : "pause"
        },
        KICK = 0,
        SNARE = 1,
        pops = [];


		$videoStack.css({
			width: $(window).width(),
			height: $(window).height()
		});

    for ( var idx = 0; idx < 4; idx++ ) {

    	var $clone = $video.clone();

    	$clone.css({
    		"zIndex" : idx,
    		"width": $videoStack.width(),
    		"height": $videoStack.height(),
    		"position": "absolute"
    	}).attr({
    		id: "video-" + idx,
    		src: "../tubeyloops/startrek.theora.ogv"
    	});

    	$videoStack.append( $clone );

			pops.push( Popcorn( "#" + $clone[0].id ) );
    }

    Emit.sender = $(document);

    Emit.sender.bind("sketchUpdate", function( event, step ) {

			var idx = Emit.last;//+step.channel,
					$pop = pops[ idx ],
					inOut = times[ idx ]; // in/out

			if ( !$pop || !$pop.media ) {
				return;
			}


			$("video").css({
				"zIndex": 995
			}).eq( idx ).css({
				"zIndex": 999
			});

			//if ( $pop.media.paused ) {
				$pop.currentTime( inOut.in ).play();
			//}

		  $pop.exec( inOut.out , function() {
		    this.currentTime( inOut.in ).pause();
		  });

    });
  });


//    Emit.sender.bind("sketchControl", function( event, step ) {
//      // PLAY/PAUSE Controllers
//      //$pop[ controllers[ step ] ]();
//    });


	setTimeout(function() {
		jQuery(".stepWidgetChannelTxt:even").hide();

		//jQuery("#divVolume input").val("0");
	}, 1000);
})( jQuery );

