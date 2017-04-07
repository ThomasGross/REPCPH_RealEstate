<?php

// Resume existing session to use it in the php file
session_start();

// Get users from files
$sajUsers = file_get_contents( "users.txt" );

// Save posted username and password in variable
$sUsername = $_POST['username'];
$sPassword = $_POST['password'];

// Decode filecontent to a array of users in json format
$ajUsers = json_decode( $sajUsers );

// loops over all the users
for( $i = 0; $i < count($ajUsers) ; $i++ ){

	// Check if the username and password matches the posted ones
	if( $sUsername == $ajUsers[$i]->username && $sPassword ==  $ajUsers[$i]->password){

		// json string placeholder for the usersession
		$jsUserSession = '{
			"id":"'.$ajUsers[$i]->id.'",
			"username":"'.$ajUsers[$i]->username.'",
			"password":"'.$ajUsers[$i]->password.'",
			"userRole":"'.$ajUsers[$i]->userRole.'"}';

		// decode json string to a php variable
		$ajsUserSession = json_decode($jsUserSession);

		// Save it in the usersession
		$_SESSION['userSession'] = $ajsUserSession;

		// Echo status 
		echo '{"status":"ok"}';
		exit;
	}
}

// Echo status
echo '{"status":"error"}';

?>