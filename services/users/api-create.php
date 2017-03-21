<?php 

	$sUniqueId = uniqid();

	$sUsername = $_POST['txt-user-username'];
	$sEmail = $_POST['txt-user-email'];
	$sPassword = $_POST['txt-user-password'];

	

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

	// add a new key/property to the object - Id
	$jUser->id = $sUniqueId;

	// create a key and assign a value to the object
	$jUser->username = $sUsername;
	$jUser->email = $sEmail;
	$jUser->password = $sPassword;
	$jUser->userRole = $sUserRole;


	// push the json object to the array
	array_push( $ajUsers , $jUser );

	// NOW THE OPPOSITE
	// convert the array to text and make it look nice
	$sajUsers = json_encode( $ajUsers , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the text back to the file 
	file_put_contents( "users.txt" , $sajUsers);

	echo '{"status":"ok"}';

?>