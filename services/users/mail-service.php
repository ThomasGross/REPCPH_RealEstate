<?php


function fnSendWelcomeMail($sEmail){
	// the message
	$msg = "WELCOME TO REP_CPH";
	$msg .= "\n Your email:\n ";
	$msg .= "\n $sEmail \n ";
	$msg .= "\n Your username:\n ";

	// use wordwrap() if lines are longer than 70 characters
	$msg = wordwrap($msg,70);

	// send email
	mail('thomagrossrasmussen@gmail.com',"My subject",$msg);
} 


?>