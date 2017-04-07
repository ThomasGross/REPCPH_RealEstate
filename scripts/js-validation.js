//////////////////////////////////////////////
///// USER VALIDATION
//////////////////////////////////////////////

function fnValidateUserForm(form, fnCallBack){

	// Boolean check for each possible element
	var bUsernameCheck = false;
	var bEmailCheck = false;
	var bPasswordCheck = false;

	// Find each element with input and the class validate in the form
	var aoChildren = form.find('input.validate');

	// loop over each element
	for( var i = 0; i < aoChildren.length; i++ ){

		// convert to jQuery object
		var oInput = $( aoChildren[i] ); 

		// Validate element if it contains the class
		if (oInput.hasClass('username')) {
			// returns true/false
			bUsernameCheck = fnValidateUsername(oInput);
		}
		if (oInput.hasClass('email')) {
			// returns true/false
			bEmailCheck = fnValidateEmail(oInput);
		}
		if (oInput.hasClass('password')) {
			// returns true/false
			bPasswordCheck = fnValidatePassword(oInput);
		}

	}

	// Goes though each check
	if (bUsernameCheck && bEmailCheck && bPasswordCheck) {
		fnCallBack(true);
	}

}

// function validates the length of the username
function fnValidateUsername(oInput){

	var sText = oInput.val();
	var iMin = 2;
	var iMax = 18;

	if( sText.length < iMin || sText.length > iMax ){
		oInput.parent().addClass('invalid-user');
		return false;
	} else{
		oInput.parent().removeClass('invalid-user');
		return true;
	}
}

// function validates the email 
function fnValidateEmail(oInput) {

	// regular expression for validating email
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	// get the email string value 
	var sEmail = oInput.val();
	// test the regex with the email
	var bRegexTest = regex.test(sEmail);

	// if passed return true 
	// else return false and add invalid class
	if (bRegexTest) {
		oInput.parent().removeClass('invalid-user');
		return true;
	} else {
		oInput.parent().addClass('invalid-user');
		return false;
	}

}	

// function validates the password 
function fnValidatePassword(oInput) {

	// regular expression for validating password (letters, numbers, special character)
	var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

	// get the password string value 
	var sPassword = oInput.val();
	// test the regex with the password
	var bRegexTest = regex.test(sPassword);

	// if passed return true 
	// else return false and add invalid class
	if (bRegexTest) {
		oInput.parent().removeClass('invalid-user');
		return true;
	} else {
		oInput.parent().addClass('invalid-user');
		return false;
	}
}

//////////////////////////////////////////////
///// PROPERTY VALIDATION
//////////////////////////////////////////////

function fnValidatePropertyForm(form, fnCallBack){

	var bStreetCheck = false;
	var bCityCheck = false;
	var bMunicipalityCheck = false;
	var bZipcodeCheck = false;
	var bRegionCheck = false;
	var bPriceCheck = false;
	var bImageCheck = false;

	// :input can return all form types
	var aoChildren = form.find(":input.validate");

	// loop over each element
	for( var i = 0; i < aoChildren.length; i++ ){

		// convert to jquery
		var oInput = $( aoChildren[i] ); 

		// Validate element if it contains the class
		if (oInput.hasClass('street')) {
			bStreetCheck = fnValidateStreet(oInput);
		}
		if (oInput.hasClass('city')) {
			bCityCheck = fnValidateCity(oInput);
		}
		if (oInput.hasClass('municipality')) {
			bMunicipalityCheck = fnValidateMunicipality(oInput);
		}
		if (oInput.hasClass('zipcode')) {
			bZipcodeCheck = fnValidateZipcode(oInput);
		}
		if (oInput.hasClass('region')) {
			bRegionCheck = fnValidateRegion(oInput);
		}
		if (oInput.hasClass('price')) {
			bPriceCheck = fnValidatePrice(oInput);
		}
		if (oInput.hasClass('image')) {
			bImageCheck = fnValidateImage(oInput);
		}

	}

	// Goes though each check before returning 
	if ( bStreetCheck == true && bCityCheck == true && bMunicipalityCheck == true && bZipcodeCheck == true && bRegionCheck == true && bPriceCheck == true && bImageCheck == true ) {
		fnCallBack(true);
	}

}

// function validates the steet 
function fnValidateStreet(oInput){

	var sText = oInput.val();
	var iMin = 2;
	var iMax = 28;

	// checks for at least one character and one number, ignores spaces and commas.
	var regex = /^([0-9\s*]+[æøåa-zÆØÅA-Z\s\','*]+|[æøåa-zÆØÅAA-Z\s\','*]+[0-9\s*]+)[0-9\s\','*æøåa-z\s\','*ÆØÅAA-Z\s\','*]*$/;
	var bRegexTest = regex.test(sText);

	// checks length and regex
	if( sText.length < iMin || sText.length > iMax ){
		oInput.parent().addClass('invalid-property');
		return false;
	} else if (bRegexTest == false) {
		oInput.parent().addClass('invalid-property');
		return false;
	} else {
		oInput.parent().removeClass('invalid-property');
		return true;
	}
}

// function validates the city 
function fnValidateCity(oInput){

	var sText = oInput.val();
	var iMin = 2;
	var iMax = 18;

	// checks for other than characters, ignores spaces.
	var regex = /^[æøåa-z\s*ÆØÅA-Z\s*]*$/;
	var bRegexTest = regex.test(sText);

	// checks length and regex
	if( sText.length < iMin || sText.length > iMax ){
		oInput.parent().addClass('invalid-property');
		return false;
	} else if (bRegexTest == false) {
		oInput.parent().addClass('invalid-property');
		return false;
	} else {
		oInput.parent().removeClass('invalid-property');
		return true;
	}
}

// function validates the municipality 
function fnValidateMunicipality(oInput){

	var sText = oInput.val();
	var iMin = 2;
	var iMax = 18;

	// checks for other than characters, ignore spaces
	var regex = /^[æøåa-z\s*ÆØÅA-Z\s*]*$/;
	var bRegexTest = regex.test(sText);

	// checks length and regex
	if( sText.length < iMin || sText.length > iMax ){
		oInput.parent().addClass('invalid-property');
		return false;
	} else if (bRegexTest == false) {
		oInput.parent().addClass('invalid-property');
		return false;
	} else {
		oInput.parent().removeClass('invalid-property');
		return true;
	}
}

// function validates the zipcode 
function fnValidateZipcode(oInput){

	// Gets zipcode
	var sText = oInput.parent().siblings('.selected').text();

	// Checks that the value is changed
	if (sText == "Vælg postnummer her..") {
		oInput.parent().parent().addClass('invalid-property');
		return false;
	} else {
		oInput.parent().parent().removeClass('invalid-property');
		return true;
	}
}

// function validates the region 
function fnValidateRegion(oInput){

	// Gets region
	var sText = oInput.parent().siblings('.selected').text();

	// Checks that the value is changed
	if (sText == "Vælg region her..") {
		oInput.parent().parent().addClass('invalid-property');
		return false;
	} else {
		oInput.parent().parent().removeClass('invalid-property');
		return true;
	}
}

// function validates the price 
function fnValidatePrice(oInput){

	// get price
	var sText = oInput.val();
	var iMin = 1;
	var iMax = 28;

	// checks for other than numbers, ignore spaces and dots
	var regex = /^[0-9\s\'.']*$/;
	var bRegexTest = regex.test(sText);

	// checks length and regex
	if( sText.length < iMin || sText.length > iMax ){
		oInput.parent().addClass('invalid-property');
		return false;
	} else if (bRegexTest == false) {
		oInput.parent().addClass('invalid-property');
		return false;
	} else {
		oInput.parent().removeClass('invalid-property');
		return true;
	}
}

// function validates the images 
function fnValidateImage(oInput){

	var sPath = oInput.val();

	// checks length of the path - if zero no image is added
	if( sPath.length == 0 ){
		oInput.parent().addClass('invalid-property');
		return false;
	} else {
		oInput.parent().removeClass('invalid-property');
		return true;
	}
}
