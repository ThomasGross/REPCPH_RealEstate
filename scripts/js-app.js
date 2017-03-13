$(document).on("click",".link", function() {

	fnRemoveUserAttr();

	var sGoToWindow = $(this).attr("data-go-to");

	if ($(this).parent().siblings(".lbl-user-id").text()) {
		fnEditData(this);
	};

	fnShowWindow(sGoToWindow);

});

$('[data-go-to="wdw-properties"]').click(function(){

	setTimeout(function(){ 

		fnGetProperties();

	}, 500);
	
});

$('[data-go-to="wdw-properties-admin"]').click(function(){

	setTimeout(function(){ 

		fnGetPropertiesAdmin();

	}, 500);
	
});

$('[data-go-to="wdw-users"]').click(function(){
	setTimeout(function(){ 

		fnGetUsers(); 

	}, 500);
	
});

$('#btn-login').on("click", function() {
	
	var sUsername = $("#txt-login-username").val();
	var sPassword = $("#txt-login-password").val();

	fnLoginUser(sUsername,sPassword);

});


$("#btn-create-account").on('click', function(){
	var jsStatus = fnUserSignUp();

});


$(document).on("click", ".fa-trash", function(){

	var sUserIdToDelete = $(this).parent().siblings('.lbl-user-id').text();

	$(this).parent().parent().remove();
	fnDeleteUser( sUserIdToDelete );

});

function fnRemoveUserAttr(){
	$("#txt-create-edit-id").val( "" );
	$("#txt-create-edit-username").val( "" );
	$("#txt-create-edit-email").val( "" );
	$("#txt-create-edit-password").val( "" );
	$("#select-user-dropdown").parent().siblings(".selected").text( "user" );
}

function fnEditData(data){

	var sUserIdToEdit =  $(data).parent().siblings(".lbl-user-id").text();
	var sUsernameToEdit =  $(data).parent().siblings(".lbl-user-username").text();
	var sUserEmailToEdit =  $(data).parent().siblings(".lbl-user-email").text();
	var sUserPasswordToEdit =  $(data).parent().siblings(".lbl-user-password").text();
	var sUserUserRoleToEdit =  $(data).parent().siblings(".lbl-user-userRole").text();

	$("#txt-create-edit-id").val( sUserIdToEdit );
	$("#txt-create-edit-username").val( sUsernameToEdit );
	$("#txt-create-edit-email").val( sUserEmailToEdit );
	$("#txt-create-edit-password").val( sUserPasswordToEdit );
	$("#select-user-dropdown").parent().siblings(".selected").text( sUserUserRoleToEdit );
		// $('.dropdown').find('.active').text(sUserUserRoleToEdit);

	}


	$("#btn-create-edit-account").click(function(){

		var sUrl = "";

		var sUserId = $("#txt-create-edit-id").val();

		console.log(sUserId);

		if (sUserId.length == 0){

			sUrl = "/CMSV1/services/users/api-create.php";

			console.log("create");
		} else  {

			sUrl = "/CMSV1/services/users/api-edit.php";
			console.log("edit");
		}

		$.ajax({
			"url": sUrl,
			"type":"post",
			"data": $("#frm-create-edit-users").serialize()

		}).done( function( data ){
			console.log(data);
		}).fail( function( data ){
			console.log(data);
		});

	});


	function fnShowWindow(sWindow) {

		if (sWindow != null || sWindow != undefined) {

			$(".wdw").hide();
			var sWindowToShow = sWindow;

			$("#"+sWindowToShow).show();
		} 

	};




//////////////////////////////////////////////
//////////////////////////////////////////////


function fnGetProperties(){

	// display properties
	var sUrl = "/CMSV1/services/properties/api-get.php";
	$.getJSON( sUrl , function( jData ){

		var sProperty = '	    <tr class="row-property">\
		<td class="img-property">\
		<div class="img"></div>\
		</td>\
		<td class="lbl-property" id="lbl-property-address">Address:<br><br>{{address}}</td>\
		<td class="lbl-property" id="lbl-property-price">Price:<br><br>{{price}}</td>\
		</tr>'

		$("#property-table").empty();
		for( var i = 0 ; i < jData.length ; i++ ){
			var sPropertyTemplate = sProperty;

			sPropertyTemplate = sPropertyTemplate.replace( "{{id}}" , jData[i].sUniqueId );
			sPropertyTemplate = sPropertyTemplate.replace( "{{address}}" , jData[i].sAddress );
			sPropertyTemplate = sPropertyTemplate.replace( "{{price}}" , jData[i].iPrice );
			$("#property-table").append( sPropertyTemplate );
			
		}
	});
}

function fnGetPropertiesAdmin(){

	// display properties
	var sUrl = "/CMSV1/services/properties/api-get.php";
	$.getJSON( sUrl , function( jData ){

		var sProperty = '	    <tr class="row-property">\
		<td class="img-property">\
		<div class="img"></div>\
		</td>\
		<td class="lbl-property" id="lbl-property-address">Address:<br><br>{{address}}</td>\
		<td class="lbl-property" id="lbl-property-price">Price:<br><br>{{price}}</td>\
		<td class="lbl-property"><span data-go-to="wdw-create-edit-property" class="fa fa-edit link"></span></td>\
		<td class="lbl-property"><span class="fa fa-trash delete-property"></span></td>\
		</tr>'

		$("#property-table-admin").empty();
		for( var i = 0 ; i < jData.length ; i++ ){
			var sPropertyTemplate = sProperty;

			sPropertyTemplate = sPropertyTemplate.replace( "{{id}}" , jData[i].sUniqueId );
			sPropertyTemplate = sPropertyTemplate.replace( "{{address}}" , jData[i].sAddress );
			sPropertyTemplate = sPropertyTemplate.replace( "{{price}}" , jData[i].iPrice );
			$("#property-table-admin").append( sPropertyTemplate );
			
		}
	});
}

function fnGetUsers(){

	// display properties
	var sUrl = "/CMSV1/services/users/api-get.php";
	$.getJSON( sUrl , function( ajData ){

		var sTableTemplateHeader = '	\
		<tr>\
		<th>ID#</th>\
		<th>Username</th>\
		<th>Email</th>\
		<th>Password</th>\
		<th>Userrole</th>\
		<th>Edit</th>\
		<th>Delete</th>\
		</tr>'

		var sUserTemplate= '	\
		<tr>\
		<td class="lbl-user-id">{{id}}</td>\
		<td class="lbl-user-username">{{username}}</td>\
		<td class="lbl-user-email">{{email}}</td>\
		<td class="lbl-user-password">{{password}}</td>\
		<td class="lbl-user-userRole">{{userRole}}</td>\
		<td><span data-go-to="wdw-create-edit-user" class="fa fa-edit link"></span></td>\
		<td><span class="fa fa-trash user-delete"></span></td>\
		</tr>'

		$("#users-table").empty();
		$("#users-table").append( sTableTemplateHeader );

		for( var i = 0 ; i < ajData.length ; i++ ){

			userTemplate = sUserTemplate

			userTemplate = userTemplate.replace( "{{id}}" , ajData[i].id );
			userTemplate = userTemplate.replace( "{{username}}" , ajData[i].username );
			userTemplate = userTemplate.replace( "{{email}}" , ajData[i].email );
			userTemplate = userTemplate.replace( "{{password}}" , ajData[i].password );
			userTemplate = userTemplate.replace( "{{userRole}}" , ajData[i].userRole );
			$("#users-table").append( userTemplate );	
		}
	});
}




function fnDeleteUser(sUserId){

	$.ajax({
		"url":"services/users/api-delete.php",
		"method":"post",
		"data":  ({
			'id': sUserId,
		})
	}).done( function(data){
		console.log(data);
		// sStatus = '{"status":"success"}';
	}).fail( function(data){
		console.log(data);
		// sStatus = '{"status":"fail"}';
	});
};


//////////////////////////////////////////////
//////////////////////////////////////////////







