<?php  

	// function validates the length of the username
	function fnIsUsernameValid( $sText, $iMin, $iMax  ){
		if(  strlen($sText) < $iMin || strlen($sText) > $iMax ){
			return false;
		}
		return true;
	}

	// function validates the email 
	function fnIsEmailValid( $sEmail ) {
		// two regular expression for validating email
	    return filter_var(  $sEmail , FILTER_VALIDATE_EMAIL) && preg_match('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/', $sEmail);
	}	

	// function validates the password 
	function fnValidatePassword( $sPassword ) {
		// regular expression for validating password (letters, numbers, special character)
		return filter_var( preg_match('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/', $sPassword));
	}


?>