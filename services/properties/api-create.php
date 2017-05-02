<?php 

// include validation functions
include 'validation-property.php'; 


// save filename
$sFileName = "file-properties.txt"; 

// unique id for the property id 
$sUniqueId = uniqid();

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
$bImageCheck = fnValidateImage( $_FILES ); // true or false | 1 or nothing
if ($bImageCheck == false){
	echo '{"status":"error", "description":"image-unfulfilled"}';
	exit;
}

// Placeholder for properties
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

// add properties to the object 
$jProperty->id = $sUniqueId;
$jProperty->street = $sPropertyStreet;
$jProperty->city = $sPropertyCity;
$jProperty->municipality = $sPropertyMunicipality;
$jProperty->zipcode = $sPropertyZipcode;
$jProperty->region = $sPropertyRegion;
$jProperty->price = $sPropertyPrice;
$jProperty->long = $sPropertyLong;
$jProperty->lat = $sPropertyLat;

// uploadDir is the directory for files and folders
$uploadDir = '../properties/uploads/'.$sUniqueId.'/';
// uploadDirForJson is the directory to json file
$uploadDirForJson = '/CMSV1/services/properties/uploads/'.$sUniqueId.'/';

// make a directory for images with 0777 permissions
mkdir($uploadDir, 0700);

// create image array
$imageArray = array();

// loop though each posted file
for($i=0 ; $i<count($_FILES) ; $i++){

	if($_FILES['file-'.$i]["error"] == 4) {
		//means there is no file uploaded
		break;
	} 

	// path to where the file moved to + name of the file
	$uploadfile = $uploadDir . $_FILES['file-'.$i]['name'];

	// Create json like object
	$sPropertyImg = '{}';
	// decode into a php object
	$jPropertyImg = json_decode( $sPropertyImg );

	// Add image id 
	$jPropertyImg->imageId = $i;
	// Add image url
	$jPropertyImg->imageUrl = $uploadDirForJson.$_FILES['file-'.$i]['name'];
	// Add image name
	$jPropertyImg->imageName = $_FILES['file-'.$i]['name'];

	// Push it to the image array
	array_push($imageArray, $jPropertyImg);

	// Move image to specified location
	move_uploaded_file($_FILES['file-'.$i]['tmp_name'], $uploadfile);

}

// Add imagesArray to jproperty under images 
$jProperty->images = $imageArray;

// push the json object to the array
array_push( $ajProperties , $jProperty );

// convert the array to text and make it look nice
$sajProperties = json_encode( $ajProperties , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

// save the text back to the file 
file_put_contents( $sFileName , $sajProperties);

// echo status 
echo '{"status":"ok"}';

?>

