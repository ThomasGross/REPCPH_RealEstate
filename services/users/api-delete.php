<?php 

	// save posted id in variable
	$sUserId = $_POST['id'];

	// save filename
	$sFileName = 'users.txt';

	// open the file and get the contents of it
	$sajUsers = file_get_contents( $sFileName );

	// convert the text to an object
	$ajUsers = json_decode( $sajUsers );

	// loop though each user
	for( $i = 0; $i < count($ajUsers) ; $i++ ){

		// check if the ids match
		if( $sUserId ==  $ajUsers[$i]->id  ){

			// Remove specific element
			array_splice($ajUsers, $i, 1);

			// no need to contiue 
			break;
		}
	}
	

	// object to text
	$sajUsers = json_encode( $ajUsers , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajUsers );

	// echo status
	echo '{"status":"ok"}';

?>