<?php
	
	$sFileName = "file-properties.txt";

	$sajProperties = file_get_contents( $sFileName );
	$ajProperties = json_decode( $sajProperties );
	if( !is_array($ajProperties ) ){
		echo '{"status":"error", "id":"001", "message":"could not work with the database"}';
		exit;
	}

	if (isset($_GET['id'])) {
		$id = $_GET['id'];
		for ($i=0; $i < count($ajProperties); $i++) { 
			if ($ajProperties[$i]->id == $id) {

				$sjProperty = json_encode( $ajProperties[$i] , JSON_UNESCAPED_UNICODE );
				echo $sjProperty;
				exit;
			}	
		}
	}

	// SUCCESS
	// $sajProperties = json_encode( $ajProperties , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
	$sajProperties = json_encode( $ajProperties , JSON_UNESCAPED_UNICODE );
	echo $sajProperties;


?>