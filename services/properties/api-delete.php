<?php 

	include 'property-functions.php';

	$sPropertyId = $_POST['id'];

	$sFileName = 'file-properties.txt';

	// Open the file and get the contents of it
	$sajProperties = file_get_contents( $sFileName );

	$ajProperties = json_decode( $sajProperties );

	for( $i = 0; $i < count($ajProperties) ; $i++ ){
			// check if the ids match
		if( $sPropertyId ==  $ajProperties[$i]->id  ){

			array_splice($ajProperties, $i, 1);

			$dirToRemove = './uploads/'.$sPropertyId;

			$message = fnDeletePropertyDirectory($dirToRemove);

			if ($message = false) {
				echo '{"status":"error"}';
				exit;
			}

			break;
		}
	}
	

	// object to text
	$sajProperties = json_encode( $ajProperties , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajProperties );

	echo '{"status":"ok"}';


?>