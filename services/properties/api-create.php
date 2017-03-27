<?php 


$sFileName = "file-properties.txt";

$sUniqueId = uniqid();

$sPropertyStreet = $_POST['txt-property-street'];
$sPropertyCity = $_POST['txt-property-city'];
$sPropertyRegion = $_POST['txt-property-region'];
$sPropertyZipcode = $_POST['txt-property-zipcode'];
$sPropertyPrice = $_POST['txt-property-price'];
$sPropertyLong = $_POST['txt-property-long'];
$sPropertyLat = $_POST['txt-property-lat'];



$ajProperties = [];

	// open the file and get the contents of it
$sProperties = file_get_contents( $sFileName );

if ( $sProperties != null ){
		// At this moment I have text and text only
		// convert the text to an object
		$ajProperties = json_decode( $sProperties ); // array with json

	} 

	// Create a string that looks like JSON
	$sProperty = '{}';

	// create a JSON object for the property 
	$jProperty = json_decode( $sProperty );

	// add a new key/property to the object - Id
	$jProperty->id = $sUniqueId;

	// create a key and assign a value to the object
	$jProperty->street = $sPropertyStreet;
	$jProperty->city = $sPropertyCity;
	$jProperty->region = $sPropertyRegion;
	$jProperty->zipcode = $sPropertyZipcode;
	$jProperty->price = $sPropertyPrice;
	$jProperty->long = $sPropertyLong;
	$jProperty->lat = $sPropertyLat;


	for($i=0 ; $i<count($_FILES) ; $i++){

		if($_FILES['file-'.$i]["error"] == 4) {
			//means there is no file uploaded
			echo "no file uploaded";
			break;
		}

		if($_FILES['file-'.$i]["error"] != 0) {
			//stands for any kind of errors happen during the uploading
			echo "error file";
			break;
		} 


		$uploadDir = '../properties/uploads/';
		$uploadDirForJson = '/CMSV1/services/properties/uploads/';
		$uploadfile = $uploadDir . basename($sUniqueId.'_'.$_FILES['file-'.$i]['name']);


		$jProperty->imageUrl = $uploadDirForJson . basename($sUniqueId.'_'.$_FILES['file-'.$i]['name']);

		echo "$uploadDir";

		move_uploaded_file($_FILES['file-'.$i]['tmp_name'], $uploadfile);
		
	}


	// push the json object to the array
	array_push( $ajProperties , $jProperty );

	// NOW THE OPPOSITE
	// convert the array to text and make it look nice
	$sajUsers = json_encode( $ajProperties , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the text back to the file 
	file_put_contents( $sFileName , $sajUsers);

	// echo '{"status":"ok"}';






	// echo "x";
	?>

