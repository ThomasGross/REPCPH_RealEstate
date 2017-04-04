<?php 

	$sUserId = $_POST['id'];

	$sFileName = 'users.txt';

	// open the file and get the contents of it
	$sajUsers = file_get_contents( $sFileName );

	$ajUsers = json_decode( $sajUsers );

	for( $i = 0; $i < count($ajUsers) ; $i++ ){
			// check if the ids match
		if( $sUserId ==  $ajUsers[$i]->id  ){

			array_splice($ajUsers, $i, 1);

			break;
		}
	}
	

	// object to text
	$sajUsers = json_encode( $ajUsers , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajUsers );

	echo '{"status":"ok"}';

?>