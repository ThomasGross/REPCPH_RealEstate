<?php  


function fnValidateStreet($sStreet){

	// checks for at least one character and one number, ignores spaces and commas.
	$bRegexTest = preg_match("/^([0-9\s*]+[æøåa-zÆØÅA-Z\s\','*]+|[æøåa-zÆØÅAA-Z\s\','*]+[0-9\s*]+)[0-9\s\','*æøåa-z\s\','*ÆØÅAA-Z\s\','*]*$/", $sStreet);
	
	$iMin = 2;
	$iMax = 28;


	if( strlen($sStreet) < $iMin || strlen($sStreet) > $iMax ){
		return false;
	} else if ($bRegexTest == 0) {
		return false;
	} else {
		return true;
	}
}


function fnValidateCity($sCity){

	$iMin = 2;
	$iMax = 18;

	// checks for other than characters, ignores spaces.
	$bRegexTest = preg_match("/^[æøåa-z\s*ÆØÅA-Z\s*]*$/", $sCity);

	if( strlen($sCity) < $iMin || strlen($sCity) > $iMax ){
		return false;
	} else if ($bRegexTest == false) {
		return false;
	} else {
		return true;
	}
}


function fnValidateMunicipality($sMunicipality){

	$iMin = 2;
	$iMax = 18;

	// checks for other than characters, ignore spaces
	$bRegexTest = preg_match("/^[æøåa-z\s*ÆØÅA-Z\s*]*$/", $sMunicipality );

	if( strlen($sMunicipality) < $iMin || strlen($sMunicipality) > $iMax ){
		return false;
	} else if ($bRegexTest == false) {
		return false;
	} else {
		return true;
	}
}

function fnValidateZipcode($sZipcode){

	if (strlen($sZipcode) == 0) {
		return false;
	} else {
		return true;
	}
}

function fnValidateRegion($sRegion){

	if (strlen($sRegion) == 0) {
		return false;
	} else {
		return true;
	}
}

function fnValidatePrice($sPrice){

	$iMin = 1;
	$iMax = 28;

	// checks for other than numbers, ignore spaces and dots
	$bRegexTest = preg_match("/^[0-9\s\'.']*$/", $sPrice );

	if( strlen($sPrice) < $iMin || strlen($sPrice) > $iMax ){
		return false;
	} else if ($bRegexTest == false) {
		return false;
	} else {
		return true;
	}
}

function fnValidateImage($oFiles){

	$imgCount = 0;

	for($i=0 ; $i<count($_FILES) ; $i++){

		$imgCount++;

		if ($imgCount < 3) {
			if($_FILES['file-'.$i]["error"] == 4) {
				//means there is no file uploaded
				return false;
			} 
		} else {
			if($_FILES['file-'.$i]["error"] != 0) {
				//stands for any kind of errors happen during the uploading
				
				return false;
			} else {
				return true;
			}
		}
	}
}



?>