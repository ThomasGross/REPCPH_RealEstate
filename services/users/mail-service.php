<?php

// function that welcomes user over email
function fnSendWelcomeMail($sEmail,$sUsername,$sPassword){
	// the message
	$msg = "WELCOME TO REP_CPH ".$sUsername."\n";
	$msg .= "\n Your email:\n ";
	$msg .= "\n $sEmail \n ";
	$msg .= "\n Your username:\n ";
	$msg .= "\n $sUsername\n ";
	$msg .= "\n Your password:\n ";
	$msg .= "\n $sPassword\n ";


	// use wordwrap if lines are longer than 70 characters
	$msg = wordwrap($msg,70);

	// send email
	mail($sEmail,"Welcome to REP_CPH",$msg);
} 


?>