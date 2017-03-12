
<h1>
	Create/Edit user
</h1>

<form id="frm-create-edit-users" method="post" enctype="multipart/form-data">

	<input type="hidden" id="txt-create-edit-id" name="txt-user-id" />

	<div class="input-container">
		<span class="fa fa-user"></span>
		<input class="txt-input" id="txt-create-edit-username" placeholder="Username" type="text" name="txt-user-username">
	</div>
	<hr>

	<div class="input-container">
		<span class="fa fa-envelope"></span>
		<input class="txt-input" id="txt-create-edit-email" placeholder="Email" type="text" name="txt-user-email">
	</div>
	<hr>

	<div class="input-container">
		<span class="fa fa-lock"></span>
		<input class="txt-input" id="txt-create-edit-password" placeholder="Password" type="text" name="txt-user-password">
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


<a data-go-to="wdw-users" type="button" id="btn-create-edit-account" class="btn link">Submit</a>
<a data-go-to="wdw-users" type="button" class="btn link"> Back</a>




