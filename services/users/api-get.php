<?php 

	// read the file
	$sajUsers = file_get_contents( "users.txt" );

	// convert the text to an object
	$ajUsers = json_decode( $sajUsers );

	// if it is empty
	if( !is_array($ajUsers ) ){
		echo '{"status":"error", "id":"001", "message":"could not work with the database"}';
		exit;
	}

	echo $sajUsers;

?>