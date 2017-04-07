<?php 
	
	// include validation functions
	include 'validation-user.php';

	// Posted values from the user form
	$sUserId = $_POST['txt-user-id'];
	$sUsername = $_POST['txt-user-username'];
	$sEmail = $_POST['txt-user-email'];
	$sPassword = $_POST['txt-user-password'];
	$sUserRole = $_POST['txt-user-role'];


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

	$bPasswordCheck = fnValidatePassword( $sPassword );
	if ($bPasswordCheck == false) {
		echo '{"status":"error", "description":"password-unfulfilled"}';
		exit;
	}

	// Placeholder for users
	$ajUsers = [];

	// fileName of the userfile
	$sFileName = 'users.txt';

	// open the file and get the contents of it
	$sajUsers = file_get_contents( $sFileName );

	// convert the text to an object
	$ajUsers = json_decode( $sajUsers );

	// loop though each user
	for( $i = 0; $i < count($ajUsers) ; $i++ ){
		// check if the ids match
		if( $sUserId ==  $ajUsers[$i]->id  ){

			// change object
			$ajUsers[$i]->username = $sUsername;
			$ajUsers[$i]->email = $sEmail;
			$ajUsers[$i]->password = $sPassword;
			$ajUsers[$i]->userRole = $sUserRole;

			// no need to contiue 
			break;
		}
	}
	

	// object to text
	$sajUsers = json_encode( $ajUsers , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajUsers );

	echo '{"status":"ok"}';

?>