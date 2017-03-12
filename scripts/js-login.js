

function fnLoginUser(username, password) {

	console.log("asd");

	var startWindow = "wdw-frontpage";

	$.ajax({

		"url":"/CMSV1/services/users/login.php",
		"method":"post",
		"data":({"username": username , "password": password}),
		"cache":false,
		"dataType":"json"

	}).done( function( jData ){

		if (jData.status == "ok") {
			// TOO DOO SWEET ALERT success
		} else {
			// TOO DOO SWEET ALERT error
		}
				
	}).fail( function(){

	});

};


