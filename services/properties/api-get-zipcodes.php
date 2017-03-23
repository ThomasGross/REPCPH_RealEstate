<?php

	$sFileName = "file-zipcodes.txt";

	$sajZipcodes = file_get_contents( $sFileName );
	$ajZipcodes = json_decode( $sajZipcodes );
	if( !is_array( $ajZipcodes ) ){
		echo '{"status":"error", "id":"001", "message":"could not work with the database"}';
		exit;
	}

	// SUCCESS
	// $sajProperties = json_encode( $ajProperties , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
	$sajZipcodes = json_encode( $ajZipcodes , JSON_UNESCAPED_UNICODE );
	echo $sajZipcodes;

?>