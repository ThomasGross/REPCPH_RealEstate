
// LOGIN

$('#btn-login').on("click", function() {
	
	var sUsername = $("#txt-login-username").val();
	var sPassword = $("#txt-login-password").val();

	fnLoginUser(sUsername,sPassword, function(jData){
		
		if (jData.status == "ok") {
			// TOO DOO SWEET ALERT success
			location.reload();
		} else {
			swal({
				title: "Incorrect username or password",
				text: "Please try again..",
				type: "error",
				confirmButtonText: "OK"
			}, function(){
				
				
			});
		}
	});
});

// LOGOUT

$("#btn-logout").on('click', function(){
	
	fnUserLogOut(function( jData ){
		if (jData.status == "ok") {
			location.reload();
		}
	});

});


// SIGNUP

$("#btn-create-account").on('click', function(){

	validate($("#frm-user-create"), function(bValdationCheck){

		if (bValdationCheck == true) {
			var jFormData = $("#frm-user-create").serialize();
			fnCreateUser( jFormData, function(jData){

				if (jData.status == "ok") {
					swal({
						title: "User created",
						text: "Thanks for joining REP_CPH",
						type: "success",
						confirmButtonText: "GO TO LOGIN"
					},
					function(){
						location.reload();
					});
				}
			});
		}

	});



});


