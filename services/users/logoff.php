<?php
	session_start();
	session_destroy();
	header('Location: /CMSV1/services/users/api-create.php');
?>