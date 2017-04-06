<div id="wdw-signup" class="wdw">

	<div class="background-img">
		<div class="background-layer">
			<div id="login-content">
				<div id="login-headline">
					<h1>
						Sign up
					</h1>
					<p>

					</p>
				</div>

				<form id="frm-user-create" method="post" action="services/users/api-create.php" autocomplete="off">

					<div class="input-container">
						<span class="fa fa-user"></span>
						<input class="txt-input validate username" id="txt-login-username" placeholder="Username" type="text" name="txt-user-username">
					</div>
					<hr>

					<div class="input-container">
						<span class="fa fa-envelope"></span>
						<input class="txt-input validate email" id="txt-login-email" placeholder="Email" type="text" name="txt-user-email">
					</div>
					<hr>

					<div class="input-container">
						<span class="fa fa-lock"></span>
						<input type="password" class="txt-input password validate" id="txt-login-password" placeholder="Password" type="text" name="txt-user-password">
					</div>
					<hr>

					<div class="input-container">
						<span class="fa fa-repeat"></span>
						<input type="password" class="txt-input password validate" id="txt-login-confirmPassword" placeholder="Comfirm password" type="text" name="txt-user-password-repeat">
					</div>
					<hr>

					<div class="input-container">
						<div class="input-option-remember">
							<input class="input-checkbox" type="checkbox" name="remember" value="remember">
							<p>Remember me</p>
						</div>
					</div>

				</form>


				<a type="button" id="btn-create-account" class="btn link">Create account</a>
				<a data-go-to="wdw-login" type="button" class="btn link"> Back</a>
			</div>
		</div>
	</div>
</div>
