<?php 

	// include property functions
	include 'property-functions.php';

	// save posted id in variable
	$sPropertyId = $_POST['id'];

	// save filename
	$sFileName = 'file-properties.txt';

	// Open the file and get the contents of it
	$sajProperties = file_get_contents( $sFileName );

	// convert the text to an object
	$ajProperties = json_decode( $sajProperties );

	// loop though each property
	for( $i = 0; $i < count($ajProperties) ; $i++ ){
		
		// check if the ids match
		if( $sPropertyId ==  $ajProperties[$i]->id  ){

			// Remove specific element
			array_splice($ajProperties, $i, 1);

			// The property image directory 
			$dirToRemove = './uploads/'.$sPropertyId;

			// Removes the directory and images
			$message = fnDeletePropertyDirectory($dirToRemove);

			// If deletion failed - exit
			if ($message = false) {
				echo '{"status":"error"}';
				exit;
			}

			// no need to contiue 
			break;
		}
	}
	

	// object to text
	$sajProperties = json_encode( $ajProperties , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajProperties );

	// echo status
	echo '{"status":"ok"}';


?>