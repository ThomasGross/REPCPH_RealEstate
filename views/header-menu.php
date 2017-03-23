<?php 
if (isset($_SESSION['userSession'])) {

	if ($userSession['userRole'] == "superadmin") {

		$sMenuItems = 	'
		<div class="link" data-go-to="wdw-properties-admin">Properties</div>
		<div class="link" data-go-to="wdw-users">Users</div>
		<div id="btn-logout">Logout</div>
		';

	} else if ($userSession['userRole'] == "admin"){

		$sMenuItems = 	'
		<div class="link" data-go-to="wdw-properties-admin">Properties</div>
		<div class="link" data-go-to="wdw-users">Users</div>
		<div id="btn-logout">Logout</div>
		';
	} else if ($userSession['userRole'] == "user") {

		$sMenuItems = 	'
		<div class="link" data-go-to="wdw-properties">Properties</div>
		<div id="btn-logout">Logout</div>
		';

	} 

} else {
	$sMenuItems ='';
}
?>




<div class="header-content">

	<div class="logo link" data-go-to="wdw-frontpage">
		<h1 id="logo1">REP</h1>
		<h1 id="logo2">|</h1>
		<h1 id="logo3">CPH</h1>
	</div>


	<div class="navigation">
		<?php echo $sMenuItems;?>
		

	</div>
</div>







