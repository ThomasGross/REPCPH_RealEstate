<?php 
	session_start();
?>

<!DOCTYPE html>
<html>
<head>
	<title>Real Estate Partner CPH</title>

	<link rel="stylesheet" type="text/css" href="styles/easydropdown.css"/>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

	<link rel="stylesheet" type="text/css" href="styles/style-login.css">
	<link rel="stylesheet" type="text/css" href="styles/style-main.css">
	<link rel="stylesheet" type="text/css" href="styles/style-header.css">
	<link rel="stylesheet" type="text/css" href="styles/style-frontpage.css">
	<link rel="stylesheet" type="text/css" href="styles/style-properties.css">
	<link rel="stylesheet" type="text/css" href="styles/style-users.css">
	<link rel="stylesheet" type="text/css" href="styles/style-properties-admin.css">
	<link rel="stylesheet" type="text/css" href="styles/style-properties-create-edit.css">

	<link rel="stylesheet" type="text/css" href="styles/sweetalert.css">

	
</head>
<body>

	
	<?php 

	if (isset($_SESSION['userSession'])) {

		$ajs = json_encode($_SESSION['userSession']);

		$userSession = json_decode($ajs, true);

		

		require_once("views/header-menu.php");
		require_once("views/view-frontpage.php");
		require_once("views/view-properties.php");

		if ($userSession['userRole'] == 'superadmin') {

			require_once("views/view-properties-admin.php");
			require_once("views/view-create-edit-property.php");
			require_once("views/view-create-edit-user.php");
			require_once("views/view-users.php");
			
		} else if ($userSession['userRole'] == 'admin'){

			require_once("views/view-properties-admin.php");
			require_once("views/view-create-edit-property.php");
			require_once("views/view-users.php");

		}

	} else {
			
		require_once("views/view-login-menu.php");

		require_once("views/view-signup.php");
	
	}

	?>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

	<script type="text/javascript" src="scripts/js-app.js"></script>
	<script type="text/javascript" src="scripts/js-login.js"></script>
	<script src="scripts/jquery.easydropdown.js" type="text/javascript"></script>
	<script src="scripts/sweetalert.min.js"></script>



</body>
</html>