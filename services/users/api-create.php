<?php 

	// include validation functions
	include 'validation-user.php';
	// include mail service
	include 'mail-service.php';

	// unique id for the user
	$sUniqueId = uniqid();

	// Posted values from the user form
	$sUsername = $_POST['txt-user-username'];
	$sEmail = $_POST['txt-user-email'];
	$sPassword = $_POST['txt-user-password'];
	$sPasswordRepeat = "";


	// Run though every user item check, if there is an error exit code.
	$bUsernameCheck = fnIsUsernameValid( $sUsername , 2 , 18 ); // true or false | 1 or nothing
	if ($bUsernameCheck == false){
		echo '{"status":"error", "description":"username-unfulfilled"}';
		exit;
	}

	$bEmailCheck =  fnIsEmailValid( $sEmail ); // true or false | 1 or nothing
	if ($bEmailCheck == false){
		echo '{"status":"error", "description":"email-unfulfilled"}';
		exit;
	}

	// If user was asked to re-enter password 
	// checks if the two password matches
	if (isset($_POST['txt-user-password-repeat'])) {
		$sPasswordRepeat = $_POST['txt-user-password-repeat'];

		if ($sPasswordRepeat != $sPassword) {
			echo '{"status":"error", "description":"password-not-identical"}';
			exit;
		}
	}
	$bPasswordCheck = fnValidatePassword( $sPassword );
	if ($bPasswordCheck == false) {
		echo '{"status":"error", "description":"password-unfulfilled"}';
		exit;
	}

	// Placeholder for users
	$ajUsers = [];

	// open the file and get the contents of it
	$sUsers = file_get_contents( "users.txt" );

	if ( $sUsers != null ){
		// At this moment I have text and text only
		// convert the text to an object
		$ajUsers = json_decode( $sUsers ); // array with json
		$sUserRole = "user";

	} else {
		$sUserRole = "superadmin";
	}

	if (isset($_POST['txt-user-role'])) {
		$sUserRole = $_POST['txt-user-role'];
	} 

	// Create a string that looks like JSON
	$sUser = '{}';

	// create a JSON object for the property 
	$jUser = json_decode( $sUser );

	// add properties to the userobject
	$jUser->id = $sUniqueId;
	$jUser->username = $sUsername;
	$jUser->email = $sEmail;
	$jUser->password = $sPassword;
	$jUser->userRole = $sUserRole;

	// push the json object to the array
	array_push( $ajUsers , $jUser );

	// convert the array to text and make it look nice
	$sajUsers = json_encode( $ajUsers , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the text back to the file 
	file_put_contents( "users.txt" , $sajUsers);

	// Send a welcome mail to the user
	fnSendWelcomeMail($sEmail,$sUsername,$sPassword);

	// echo status 
	echo '{"status":"ok"}';

?>