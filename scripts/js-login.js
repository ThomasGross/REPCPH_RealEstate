

function fnLoginUser(username, password) {

	$.ajax({

		"url":"/CMSV1/services/users/login.php",
		"method":"post",
		"data":({"username": username , "password": password}),
		"cache":false,
		"dataType":"json"

	}).done( function( jData ){

		if (jData.status == "ok") {
			// TOO DOO SWEET ALERT success
			location.reload();
		} else {

			swal({
				title: "Incorrect username or password",
				text: "Please try again..",
				type: "error",
				confirmButtonText: "OK"
			})
		}
				
	}).fail( function(){

	});

};

function fnUserSignUp() {

	$.ajax({

		"url":"services/users/api-create.php",
		"method":"post",
		"data": $("#frm-user-create").serialize(),
		"cache":false,
		"dataType":"json"

	}).done( function( jData ){

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
		} else {
			// TOO DOO SWEET ALERT error
		}
				
	}).fail( function(){
		console.log("error");
	});

};

function fnUserLogOut(){

	$.ajax({
		type: 'GET',
		url: 'services/users/logout.php',
	}).done(function(){
		location.reload();
	}).fail(function(){

	});

}




