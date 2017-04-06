<?php  

	function fnIsUsernameValid( $sText, $iMin, $iMax  ){
		if(  strlen($sText) < $iMin || strlen($sText) > $iMax ){
			return false;
		}
		return true;
	}

	function fnIsEmailValid( $sEmail ) {
	    return filter_var(  $sEmail , FILTER_VALIDATE_EMAIL) && preg_match('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/', $sEmail);
	}	

	function fnValidatePassword( $sPassword ) {
		return filter_var( preg_match('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/', $sPassword));
	}


?>