<?php
	
	// save filename
	$sFileName = "file-regions.txt";

	// open the file and get the contents of it
	$sajRegions = file_get_contents( $sFileName );

	// convert the text to an object
	$ajRegions = json_decode( $sajRegions );

	// if it is empty
	if( !is_array( $ajRegions ) ){
		echo '{"status":"error", "id":"001", "message":"could not work with the database"}';
		exit;
	}

	// convert the array to text
	$sajRegions = json_encode( $ajRegions , JSON_UNESCAPED_UNICODE );
	echo $sajRegions;

?>