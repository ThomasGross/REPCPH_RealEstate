<?php
	// Resume existing session to use it in the php file
	session_start();
	// End the session
	session_destroy();
	// Echo status message
	echo '{"status":"ok"}';
?>