<?php 

// SESSION START 
// This is where the session is created. 
session_start();

// Global boolean that tells whether or not the user is logged in
$bUserLoggedIn = 0;

// if a usersession is active
if (isset($_SESSION['userSession'])) {

	// Encodes the usersession into a json object
	$ajs = json_encode($_SESSION['userSession']);

	// Takes a JSON and converts it into a global php variable.
	$userSession = json_decode($ajs, true);

	// User is logged in and therefore true
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
	// If there is an active usersession show following views
	// Else show loggin page
	if ($bUserLoggedIn) {

		// Differnt view are show for each userRole of the usersession
		// The userrole determins which view the user can interact with 
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


	<!-- TO DO CREATE FOOTER -->
	<div class="footer">

	</div>


	<!-- load jquery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

	<!-- load application specific scripts -->
	<script src="scripts/js-app.js"></script>
	<script src="scripts/js-login.js"></script>
	<script src="scripts/js-validation.js"></script>
	<script src="scripts/js-notification.js"></script>

	<!-- load downloaded libraries -->
	<script src="scripts/jquery.easydropdown.js" type="text/javascript"></script>
	<script src="scripts/sweetalert.min.js"></script>

</body>
</html>