<?php 

	if ($userSession['userRole'] == "superadmin") {

		$sMenuItems = 	'
		<div class="link" data-go-to="wdw-properties">Properties</div>
		<div class="link" data-go-to="wdw-properties-admin">Properties admin</div>
		<div class="link" data-go-to="wdw-users">Users</div>
		';

	} else if ($userSession['userRole'] == "admin"){

		$sMenuItems = 	'
		<div class="link" data-go-to="wdw-properties">Properties</div>
		<div class="link" data-go-to="wdw-users">Users</div>
		';
	} else if ($userSession['userRole'] == "user") {

		$sMenuItems = 	'
			<div class="link" data-go-to="wdw-properties">Properties</div>
		';
		
	} else {

		$sMenuItems = 	'
		
		';
	}

?>

<div id="header-menu" class="header">
	<div class="header-container">


		<div class="logo">

			<h1 id="logo1">REP</h1>
			<h1 id="logo2">|</h1>
			<h1 id="logo3">CPH</h1>
		</div>


		<div class="navigation">
			<?php echo $sMenuItems;?>

		</div>

	</div>

</div>
