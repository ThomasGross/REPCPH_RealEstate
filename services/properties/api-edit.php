<?php  

// include validation functions
include 'validation-property.php'; 


// save filename
$sFileName = "file-properties.txt"; 

// unique id for the property id 
$sPropertyId = $_POST['txt-property-id'];

// Posted values from the property form
$sPropertyStreet = $_POST['txt-property-street'];
$sPropertyCity = $_POST['txt-property-city'];
$sPropertyMunicipality = $_POST['txt-property-municipality'];
$sPropertyZipcode = $_POST['txt-property-zipcode'];
$sPropertyRegion = $_POST['txt-property-region'];
$sPropertyPrice = $_POST['txt-property-price'];
$sPropertyLong = $_POST['txt-property-long'];
$sPropertyLat = $_POST['txt-property-lat'];


// Run though every property item check, if there is an error exit code.
$bStreetCheck = fnValidateStreet( $sPropertyStreet ); // true or false | 1 or nothing
if ($bStreetCheck == false){
	echo '{"status":"error", "description":"streetname-unfulfilled"}';
	exit;
}
$bCityCheck = fnValidateCity( $sPropertyCity ); // true or false | 1 or nothing
if ($bCityCheck == false){
	echo '{"status":"error", "description":"cityname-unfulfilled"}';
	exit;
}
$bMunicipalityCheck = fnValidateMunicipality( $sPropertyMunicipality ); // true or false | 1 or nothing
if ($bMunicipalityCheck == false){
	echo '{"status":"error", "description":"municipalityname-unfulfilled"}';
	exit;
}
$bZipcodeCheck = fnValidateZipcode( $sPropertyZipcode ); // true or false | 1 or nothing
if ($bZipcodeCheck == false){
	echo '{"status":"error", "description":"zipcode-unfulfilled"}';
	exit;
}
$bRegionCheck = fnValidateRegion( $sPropertyRegion ); // true or false | 1 or nothing
if ($bRegionCheck == false){
	echo '{"status":"error", "description":"region-unfulfilled"}';
	exit;
}
$bPriceCheck = fnValidatePrice( $sPropertyPrice ); // true or false | 1 or nothing
if ($bPriceCheck == false){
	echo '{"status":"error", "description":"price-unfulfilled"}';
	exit;
}

// open the file and get the contents of it
$sProperties = file_get_contents( $sFileName );

$ajProperties = json_decode( $sProperties ); // array with json


// uploadDir is the directory for files and folders
$uploadDir = '../properties/uploads/'.$sPropertyId.'/';
// uploadDirForJson is the directory to json file
$uploadDirForJson = '/CMSV1/services/properties/uploads/'.$sPropertyId.'/';


// Create a string that looks like JSON 
$sProperty = '{}';

// create a JSON object for the property 
$jProperty = json_decode( $sProperty );


// loop though each user
for( $i = 0; $i < count($ajProperties) ; $i++ ){
		// check if the ids match
	if( $sPropertyId ==  $ajProperties[$i]->id  ){

		// change object
		$jProperty->id = $sPropertyId;
		$jProperty->street = $sPropertyStreet;
		$jProperty->city = $sPropertyCity;
		$jProperty->municipality = $sPropertyMunicipality;
		$jProperty->zipcode = $sPropertyZipcode;
		$jProperty->region = $sPropertyRegion;
		$jProperty->price = $sPropertyPrice;
		$jProperty->long = $sPropertyLong;
		$jProperty->lat = $sPropertyLat;

		// create image array
		$imageArray = array();

		// create image array
		$imageArray = $ajProperties[$i]->images;

		$count = count($imageArray) - 1;

		// loop though each posted file
		for($j=0 ; $j<count($_FILES) ; $j++){

			if($_FILES['file-'.$j]["error"] == 4) {
				//means there is no file uploaded
				break;
			} 

			// path to where the file moved to + name of the file
			$uploadfile = $uploadDir . $_FILES['file-'.$j]['name'];

			// Create json like object
			$sPropertyImg = '{}';
			// decode into a php object
			$jPropertyImg = json_decode( $sPropertyImg );

			$count++;
			// Add image id 
			$jPropertyImg->imageId = $count;
			// Add image url
			$jPropertyImg->imageUrl = $uploadDirForJson.$_FILES['file-'.$j]['name'];
			// Add image name
			$jPropertyImg->imageName = $_FILES['file-'.$j]['name'];

			// Push it to the image array
			array_push($imageArray, $jPropertyImg);

			// Move image to specified location
			move_uploaded_file($_FILES['file-'.$j]['tmp_name'], $uploadfile);

		}

		// echo count($imageArray);

		$jProperty->images = $imageArray;

		echo count($ajProperties);

		echo $i;

		array_splice($ajProperties, $i, 1);

		array_push( $ajProperties , $jProperty );
		// replace the json object to the array
		// $ajProperties[$i] = $jProperty;

		echo count($ajProperties);

		// exit;

		// no need to contiue 
		break;
	}
}

// convert the array to text and make it look nice
$sajProperties = json_encode( $ajProperties , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

// save the text back to the file 
file_put_contents( $sFileName , $sajProperties);

// echo status 
echo '{"status":"ok"}';

?>
