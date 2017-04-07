<?php
	
	// save filename
	$sFileName = "file-properties.txt";

	// open the file and get the contents of it
	$sajProperties = file_get_contents( $sFileName );

	// convert the text to an object
	$ajProperties = json_decode( $sajProperties );

	// if it is empty
	if( !is_array($ajProperties ) ){
		echo '{"status":"error", "id":"001", "message":"could not work with the database"}';
		exit;
	}

	// Check if id was send via the GET
	if (isset($_GET['id'])) {

		// store the id
		$id = $_GET['id'];

		// find the matching property
		for ($i=0; $i < count($ajProperties); $i++) { 
			if ($ajProperties[$i]->id == $id) {

				// make the property json text
				$sjProperty = json_encode( $ajProperties[$i] , JSON_UNESCAPED_UNICODE );

				// echo the property
				echo $sjProperty;
				exit;
			}	
		}

	// if no id was send - Send all properties back
	} else {

		$sajProperties = json_encode( $ajProperties , JSON_UNESCAPED_UNICODE );
		echo $sajProperties;

	}





?>