<?php

	$sFileName = "file-regions.txt";

	$sajRegions = file_get_contents( $sFileName );
	$ajRegions = json_decode( $sajRegions );
	if( !is_array( $ajRegions ) ){
		echo '{"status":"error", "id":"001", "message":"could not work with the database"}';
		exit;
	}

	// SUCCESS
	// $sajProperties = json_encode( $ajProperties , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
	$sajRegions = json_encode( $ajRegions , JSON_UNESCAPED_UNICODE );
	echo $sajRegions;

?>