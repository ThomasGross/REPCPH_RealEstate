<!DOCTYPE html>
<html>
<head>
	<title></title>

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

	


</head>
<body>

	<div id="header-menu" class="header">
		<?php 
			require_once("views/header-menu.html");
		?>
	</div>


	<div id="wdw-login" class="wdw">
		<?php 
			require_once("views/view-login-menu.html");
		?>
	</div>


	<div id="wdw-signup" class="wdw">
		<?php 
		require_once("views/view-signup.html");
		?>
	</div>

	<div id="wdw-frontpage" class="wdw">
		<?php 
		require_once("views/view-frontpage.html");
		?>
	</div>

	<div id="wdw-properties" class="wdw">
		<?php 
		require_once("views/view-properties.html");
		?>
	</div>

	<div id="wdw-properties-admin" class="wdw">
		<?php 
		require_once("views/view-properties-admin.html");
		?>
	</div>

	<div id="wdw-create-edit-property" class="wdw">
		<?php 
		require_once("views/view-create-edit-property.html");
		?>
	</div>

	<div id="wdw-users" class="wdw">
		<?php 
		require_once("views/view-users.html");
		?>
	</div>

	<div id="wdw-create-edit-user" class="wdw">
		<?php 
		require_once("views/view-create-edit-user.html");
		?>
	</div>



	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script type="text/javascript" src="scripts/js-app.js"></script>
	<script type="text/javascript" src="scripts/js-signup.js"></script>
	<script type="text/javascript" src="scripts/js-login.js"></script>
	<script type="text/javascript" src="scripts/js-header.js"></script>
	<script type="text/javascript" src="scripts/js-properties.js"></script>

	<script src="scripts/jquery.easydropdown.js" type="text/javascript"></script>



</body>
</html>