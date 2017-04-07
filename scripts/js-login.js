//////////////////////////////////////////////
///// LOGIN SELECTORS 
//////////////////////////////////////////////

// LOGIN

$('#btn-login').on("click", function() {
	
	// select username and password
	var sUsername = $("#txt-login-username").val();
	var sPassword = $("#txt-login-password").val();

	// call the fnLoginUser function and awaid conformation
	fnLoginUser(sUsername,sPassword, function(jData){
		
		if (jData.status == "ok") {
			// TOO DOO SWEET ALERT success

			// Reloads page
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
	
	// call the fnUserLogOut function and awaid conformation
	fnUserLogOut(function( jData ){
		if (jData.status == "ok") {

			// TO DO : CREATE SUCCESS SWAL

			// Reloads page
			location.reload();
		}
	});

});


// SIGNUP

$("#btn-create-account").on('click', function(){

	// Validate the signup-form awaid callback
	fnValidateUserForm($("#frm-user-create"), function(bValdationCheck){

		// if validation passed contuinue
		if (bValdationCheck == true) {

			// serialize the form 
			var jFormData = $("#frm-user-create").serialize();

			// call fnCreateUser to create the user account - await callback
			fnCreateUser( jFormData, function(jData){

				// if status is "ok" run sweetalert
				if (jData.status == "ok") {
					swal({
						title: "User created",
						text: "Thanks for joining REP_CPH",
						type: "success",
						confirmButtonText: "GO TO LOGIN"
					},
					// after pressed confirm button on sweetalert reload page
					function(){
						location.reload();
					});
				}
			});
		}

	});

});

//////////////////////////////////////////////
///// LOGIN FUNCTIONS
//////////////////////////////////////////////

// function that takes username and password
// and calls the backend login service 
// resives a confirmation and returns it though callback
function fnLoginUser(username, password, fnCallBack) {

	$.ajax({

		"url":"/CMSV1/services/users/login.php",
		"method":"post",
		"data":({"username": username , "password": password}),
		"cache":false,
		"dataType":"json"

	}).done( function( jData ){

		fnCallBack(jData);

	}).fail( function(){
		// to do : handle error
	});
};

// function that calls the backend logout service
// and resives the a conformation 
function fnUserLogOut(fnCallBack){

	$.ajax({
		type: 'post',
		url: 'services/users/logout.php',
		dataType: 'json' 
	}).done(function( jData ){
		fnCallBack(jData)

	}).fail(function(){
		alert("ERROR");
	});

}

