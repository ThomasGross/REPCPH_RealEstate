<?php 
session_start();

$bUserLoggedIn = 0;

if (isset($_SESSION['userSession'])) {

	$ajs = json_encode($_SESSION['userSession']);

	$userSession = json_decode($ajs, true);

	$bUserLoggedIn = 1;

} 

?>

<!DOCTYPE html>
<html>
<head>
	<title>Real Estate Partner CPH</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="styles/easydropdown.css"/>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

	<link rel="stylesheet" type="text/css" href="styles/style-login.css">
	<link rel="stylesheet" type="text/css" href="styles/style-main.css">
	<link rel="stylesheet" type="text/css" href="styles/style-header.css">
	<link rel="stylesheet" type="text/css" href="styles/style-frontpage.css">
	<link rel="stylesheet" type="text/css" href="styles/style-properties.css">
	<link rel="stylesheet" type="text/css" href="styles/style-users.css">
	<link rel="stylesheet" type="text/css" href="styles/style-properties-admin.css">
	<link rel="stylesheet" type="text/css" href="styles/style-property-map.css">

	<link rel="stylesheet" type="text/css" href="styles/sweetalert.css">

	
</head>
<body>


	<div class="header">
		<div class="container">
			<?php 
			require_once("views/header-menu.php");   		
			?>
		</div>
	</div>


	<?php 
	if ($bUserLoggedIn) {

		if ($userSession['userRole'] == 'superadmin') {

			require_once("views/view-frontpage.php");
			require_once("views/view-properties-admin.php");
			require_once("views/view-create-edit-property.php");
			require_once("views/view-create-edit-user.php");
			require_once("views/view-users.php");
			require_once("views/view-property-map.php");

		} else if ($userSession['userRole'] == 'admin'){

			require_once("views/view-frontpage.php");
			require_once("views/view-properties-admin.php");
			require_once("views/view-create-edit-property.php");
			require_once("views/view-users.php");
			require_once("views/view-property-map.php");

		} else {

			require_once("views/view-frontpage.php");
			require_once("views/view-properties.php");
			require_once("views/view-property-map.php");	

		}

	}else {

		require_once("views/view-login-menu.php");
		require_once("views/view-signup.php");

	}
	?>



	<div class="footer">

	</div>



	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

	<script src="scripts/js-app.js"></script>
	<script src="scripts/js-login.js"></script>
	<script src="scripts/js-validation.js"></script>
	<script src="scripts/js-notification.js"></script>
	<script src="scripts/jquery.easydropdown.js" type="text/javascript"></script>
	<script src="scripts/sweetalert.min.js"></script>



</body>
</html>