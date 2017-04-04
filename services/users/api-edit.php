<?php 

	$sUserId = $_POST['txt-user-id'];
	$sUsername = $_POST['txt-user-username'];
	$sEmail = $_POST['txt-user-email'];
	$sPassword = $_POST['txt-user-password'];
	$sUserRole = $_POST['txt-user-role'];

	$sFileName = 'users.txt';

	// open the file and get the contents of it
	$sajUsers = file_get_contents( $sFileName );

	$ajUsers = json_decode( $sajUsers );

	if( !is_array( $ajUsers ) ){
		$sajUsers = [];
	}

	for( $i = 0; $i < count($ajUsers) ; $i++ ){
			// check if the ids match
		if( $sUserId ==  $ajUsers[$i]->id  ){


			$ajUsers[$i]->username = $sUsername;
			$ajUsers[$i]->email = $sEmail;
			$ajUsers[$i]->password = $sPassword;
			$ajUsers[$i]->userRole = $sUserRole;

			break;
		}
	}
	



	// object to text
	$sajUsers = json_encode( $ajUsers , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajUsers );

	echo '{"status":"ok"}';
	// echo '{"status":"error","id":"001","message":"file corrupted"}';
	

?>