//////////////////////////////////////////////
///// FONTEND VALIDATION
//////////////////////////////////////////////

// USER VALIDATION

function fnValidateUserForm(form, fnCallBack){

	console.log(form);
	console.log("length "+form.length);

	var bValidateCheck = false;
	var bUsernameCheck = false;
	var bEmailCheck = false;
	var bPasswordCheck = false;


	var aoChildren = form.find('input.validate');


	for( var i = 0; i < aoChildren.length; i++ ){

		var oInput = $( aoChildren[i] ); // convert 

		if (oInput.hasClass('username')) {
			bUsernameCheck = fnValidateUsername(oInput);
			console.log(bUsernameCheck);
		}
		if (oInput.hasClass('email')) {
			bEmailCheck = fnValidateEmail(oInput);
			console.log(bEmailCheck);
		}
		if (oInput.hasClass('password')) {
			bPasswordCheck = fnValidatePassword(oInput);
			console.log(bPasswordCheck);
		}

	}

	if (bUsernameCheck && bEmailCheck && bPasswordCheck) {
		fnCallBack(true);
	}

}

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


function fnValidateEmail(oInput) {

	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	var sEmail = oInput.val();
	var bRegexTest = regex.test(sEmail);

	if (bRegexTest) {
		oInput.parent().removeClass('invalid-user');
		return true;
	} else {
		oInput.parent().addClass('invalid-user');
		return false;
	}

}	

function fnValidatePassword(oInput) {

	var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

	var sPassword = oInput.val();
	var bRegexTest = regex.test(sPassword);

	if (bRegexTest) {
		oInput.parent().removeClass('invalid-user');
		return true;
	} else {
		oInput.parent().addClass('invalid-user');
		return false;
	}
}

// PROPERTY VALIDATION

function fnValidatePropertyForm(form, fnCallBack){

	console.log(form);
	console.log("length "+form.length);

	var bValidateCheck = false;
	var bStreetCheck = false;
	var bCityCheck = false;
	var bMunicipalityCheck = false;
	var bZipcodeCheck = false;
	var bRegionCheck = false;
	var bPriceCheck = false;
	var bImageCheck = false;


	var aoChildren = form.find(":input.validate");

	console.log("C length "+aoChildren.length);

	for( var i = 0; i < aoChildren.length; i++ ){

		var oInput = $( aoChildren[i] ); // convert 

		if (oInput.hasClass('street')) {
			bStreetCheck = fnValidateStreet(oInput);
			console.log("street "+bStreetCheck);
		}

		if (oInput.hasClass('city')) {
			bCityCheck = fnValidateCity(oInput);
			console.log("city "+bCityCheck);
		}

		if (oInput.hasClass('municipality')) {
			bMunicipalityCheck = fnValidateMunicipality(oInput);
			console.log("municipality "+bMunicipalityCheck);
		}

		if (oInput.hasClass('zipcode')) {
			bZipcodeCheck = fnValidateZipcode(oInput);
			console.log("zipcode "+bZipcodeCheck);
		}

		if (oInput.hasClass('region')) {
			bRegionCheck = fnValidateRegion(oInput);
			console.log("region "+bRegionCheck);
		}

		if (oInput.hasClass('price')) {
			bPriceCheck = fnValidatePrice(oInput);
			console.log("price "+bPriceCheck);
		}

		if (oInput.hasClass('image')) {
			bImageCheck = fnValidateImage(oInput);
			console.log("image "+bImageCheck);
		}


	}

	if ( bStreetCheck == true && bCityCheck == true && bMunicipalityCheck == true && bZipcodeCheck == true && bRegionCheck == true && bPriceCheck == true && bImageCheck == true ) {
		fnCallBack(true);
	}

}

function fnValidateStreet(oInput){

	var sText = oInput.val();
	var iMin = 2;
	var iMax = 28;

	// checks for at least one character and one number, ignores spaces and commas.
	var regex = /^([0-9\s*]+[æøåa-zÆØÅA-Z\s\','*]+|[æøåa-zÆØÅAA-Z\s\','*]+[0-9\s*]+)[0-9\s\','*æøåa-z\s\','*ÆØÅAA-Z\s\','*]*$/;
	var bRegexTest = regex.test(sText);

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

function fnValidateCity(oInput){

	var sText = oInput.val();
	var iMin = 2;
	var iMax = 18;

	// checks for other than characters, ignores spaces.
	var regex = /^[æøåa-z\s*ÆØÅA-Z\s*]*$/;
	var bRegexTest = regex.test(sText);

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


function fnValidateMunicipality(oInput){

	var sText = oInput.val();
	var iMin = 2;
	var iMax = 18;

	// checks for other than characters, ignore spaces
	var regex = /^[æøåa-z\s*ÆØÅA-Z\s*]*$/;
	var bRegexTest = regex.test(sText);

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

function fnValidateZipcode(oInput){

	var sText = oInput.parent().siblings('.selected').text();

	if (sText == "Vælg postnummer her..") {
		oInput.parent().parent().addClass('invalid-property');
		return false;
	} else {
		oInput.parent().parent().removeClass('invalid-property');
		return true;
	}
}

function fnValidateRegion(oInput){

	var sText = oInput.parent().siblings('.selected').text();

	if (sText == "Vælg region her..") {
		oInput.parent().parent().addClass('invalid-property');
		return false;
	} else {
		oInput.parent().parent().removeClass('invalid-property');
		return true;
	}
}

function fnValidatePrice(oInput){

	var sText = oInput.val();
	var iMin = 1;
	var iMax = 28;

	// checks for other than numbers, ignore spaces and dots
	var regex = /^[0-9\s\'.']*$/;
	var bRegexTest = regex.test(sText);

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

function fnValidateImage(oInput){

	var sPath = oInput.val();
	var iMin = 1;
	var iMax = 28;

	if( sPath.length == 0 ){
		oInput.parent().addClass('invalid-property');
		return false;
	} else {
		oInput.parent().removeClass('invalid-property');
		return true;
	}
}
