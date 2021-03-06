
<div id="wdw-create-edit-user" class="wdw">
	<h1>
		Create/Edit user
	</h1>

	<form id="frm-create-edit-users" method="post" enctype="multipart/form-data" autocomplete="off">

		<input type="hidden" id="txt-create-edit-id" name="txt-user-id" />

		<div class="input-container">
			<span class="fa fa-user"></span>
			<input class="txt-input username validate" id="txt-create-edit-username" placeholder="Username" type="text" name="txt-user-username">
		</div>
		<hr>

		<div class="input-container">
			<span class="fa fa-envelope"></span>
			<input class="txt-input email validate" id="txt-create-edit-email" placeholder="Email" type="text" name="txt-user-email">
		</div>
		<hr>

		<div class="input-container">
			<span class="fa fa-lock"></span>
			<input class="txt-input validate password" id="txt-create-edit-password" placeholder="Password" type="text" name="txt-user-password">
		</div>
		<hr>

		<div class="input-container" id="dropdown-group">

			<span>Please select userrole:</span>

			<select id="select-user-dropdown" class="dropdown" name="txt-user-role">
				<option value="user">User</option>
				<option value="admin">Admin</option>
				<option value="superadmin">Superadmin</option>
			</select>

		</div>

	</form>


	<a type="button" id="btn-create-edit-account" class="btn link">Submit</a>
	<a data-go-to="wdw-users" type="button" class="btn link"> Back</a>




</div>
