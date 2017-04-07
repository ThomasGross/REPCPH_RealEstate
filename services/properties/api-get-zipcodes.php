<?php

	// save filename
	$sFileName = "file-zipcodes.txt";

	// open the file and get the contents of it
	$sajZipcodes = file_get_contents( $sFileName );

	// convert the text to an object
	$ajZipcodes = json_decode( $sajZipcodes );

	// if it is empty
	if( !is_array( $ajZipcodes ) ){
		echo '{"status":"error", "id":"001", "message":"could not work with the database"}';
		exit;
	}

	// convert the array to text
	$sajZipcodes = json_encode( $ajZipcodes , JSON_UNESCAPED_UNICODE );
	echo $sajZipcodes;

?>