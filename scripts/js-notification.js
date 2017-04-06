//////////////////////////////////////////////
///// DESKTOP NOTIFICATION
//////////////////////////////////////////////

var iPropertyCount = 0;

fnGetProperties(function(ajData){

	iPropertyCount = ajData.length;

	setInterval(function(){

		fnGetProperties(function(ajData){

			console.log(iPropertyCount);

			if ( iPropertyCount < ajData.length ) {

				iPropertyCount = ajData.length;

				fnDesktopNotification();

					// get the sounds from this link: http://soundbible.com
					// build a sound object
					var oSound = new Audio('./assets/property-message.mp3');
					// play the sound
					oSound.play();
					// TO DO PLAY SOUND FUNCTION
					fnTitleNotification('- New Property Added -')

				} else if( iPropertyCount > ajData.length ) {

					iPropertyCount = ajData.length;
				}

			});

	}, 1000);

});

function fnTitleNotification(sText){

	var myVar = setInterval(myTimer, 1000);
	var oldtitle = document.title;

	var count = 0

	function myTimer() {

		if (count == 6) {

			clearInterval(myVar)

		} else if ((count % 2) == 1) {

			document.title = oldtitle;
			count++;

		} else {
			document.title = sText;
			count++;

		}
	}		

}


function fnDesktopNotification() {
	    // Let's check if the browser supports notifications
	    if (!("Notification" in window)) {
	    	alert("This browser does not support desktop notification");
	    }

	    // Let's check whether notification permissions have already been granted
	    else if (Notification.permission === "granted") {
	        // If it's okay let's create a notification

	        var options = {
	        	body: "A new property has been added",
	        	icon: "./assets/property-icon.png",
	        	dir : "ltr"
	        };

	        var notification = new Notification("REP | CPH",options);

	    }

	    // Otherwise, we need to ask the user for permission
	    else if (Notification.permission !== "denied") {
	    	Notification.requestPermission(function (permission) {
	        	// If the user accepts, let's create a notification
	        	if (permission === "granted") {

	        		var options = {
	        			body: "A new property has been added",
	        			icon: "./assets/property-icon.png",
	        			dir : "ltr"
	        		};

	        		var notification = new Notification("REP | CPH",options);

	        	}
	        });
	    }

      // At last, if the user has denied notifications, and you 
      // want to be respectful there is no need to bother them any more.
  }