//////////////////////////////////////////////
///// DESKTOP NOTIFICATION
//////////////////////////////////////////////

// Global variable - tacks the number of properties
var iPropertyCount = 0;

// Call fnGetProperties to get total properties
fnGetProperties(function(ajData){

	// Set the counter equal to the array resieved
	iPropertyCount = ajData.length;

	// Set a interval that runs every sec 
	setInterval(function(){

		// Gets properties
		fnGetProperties(function(ajData){

			// if a property is added
			if ( iPropertyCount < ajData.length ) {

				// Set the count equal to the array resieved
				iPropertyCount = ajData.length;

				// call a desktop notification
				fnDesktopNotification();

				// create a audio object and play it
				var oSound = new Audio('./assets/property-message.mp3');
				oSound.play();

				// call a title notification
				fnTitleNotification('- New Property Added -')

			// if a property is removed
			} else if( iPropertyCount > ajData.length ) {

				iPropertyCount = ajData.length;
			}

		});

	}, 1000);

});

function fnTitleNotification(sText){

	// create a timer - runs every one sec
	var myVar = setInterval(myTimer, 1000);
	// save the old title
	var oldtitle = document.title;

	// counter tacks the number of title changes
	var count = 0

	function myTimer() {

		// if the count is equal to 6 - stop the timer
		if (count == 6) {

			clearInterval(myVar)

		// every even number user old title
		} else if ((count % 2) == 1) {

			document.title = oldtitle;
			count++;

		// every odd number user new title
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

	    	// options for notification
	        var options = {
	        	body: "A new property has been added",
	        	icon: "./assets/property-icon.png",
	        	dir : "ltr"
	        };

	        // create a notification
	        var notification = new Notification("REP | CPH",options);

	    }

	    // Otherwise, we need to ask the user for permission
	    else if (Notification.permission !== "denied") {
	    	Notification.requestPermission(function (permission) {
	        	// If the user accepts, let's create a notification
	        	if (permission === "granted") {

	        		// options for notification
	        		var options = {
	        			body: "A new property has been added",
	        			icon: "./assets/property-icon.png",
	        			dir : "ltr"
	        		};

					// create a notification
	        		var notification = new Notification("REP | CPH",options);
	        	}
	        });
	    }
	}