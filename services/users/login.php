<?php

session_start();

$sajUsers = file_get_contents( "users.txt" );

$sUsername = $_POST['username'];
$sPassword = $_POST['password'];

$ajUsers = json_decode( $sajUsers );

for( $i = 0; $i < count($ajUsers) ; $i++ ){
			// check if the ids match
	if( $sUsername ==  $ajUsers[$i]->username && $sPassword ==  $ajUsers[$i]->password){


		$jsUserSession = '{
			"id":"'.$ajUsers[$i]->id.'",
			"username":"'.$ajUsers[$i]->username.'",
			"password":"'.$ajUsers[$i]->password.'",
			"userRole":"'.$ajUsers[$i]->userRole.'"}';

		$ajsUserSession = json_decode($jsUserSession);

		$_SESSION['userSession'] = $ajsUserSession;


		echo '{"status":"ok"}';
		exit;
	}
}

echo '{"status":"error"}';


?>