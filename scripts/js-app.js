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

$("#btn-logout").on('click', function(){
	fnUserLogOut()

});



$("#btn-create-account").on('click', function(){
	fnUserSignUp();

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
		<div class="img"><img src={{image}}></div>\
		</td>\
		<td class="lbl-property" id="lbl-property-address">Address:<br><br>{{address}}</td>\
		<td class="lbl-property" id="lbl-property-price">Price:<br><br>{{price}}</td>\
		</tr>'

		$("#property-table").empty();
		for( var i = 0 ; i < jData.length ; i++ ){
			var sPropertyTemplate = sProperty;

			sPropertyTemplate = sPropertyTemplate.replace( "{{id}}" , jData[i].id );
			sPropertyTemplate = sPropertyTemplate.replace( "{{address}}" , jData[i].street );
			sPropertyTemplate = sPropertyTemplate.replace( "{{price}}" , jData[i].price );
			sPropertyTemplate = sPropertyTemplate.replace( "{{image}}" , jData[i].imageUrl );
			$("#property-table").append( sPropertyTemplate );
			
		}
	});
}

function fnGetPropertiesAdmin(){

	// display properties
	var sUrl = "/CMSV1/services/properties/api-get.php";
	$.getJSON( sUrl , function( jData ){


	}).done(function(jData){

		var sProperty = '<tr class="row-property">\
		<td class="img-property">\
		<div class="img"><img src={{image}}></div>\
		</td>\
		<td class="lbl-property" id="lbl-property-address">Address:<br><br>{{address}}</td>\
		<td class="lbl-property" id="lbl-property-price">Price:<br><br>{{price}}</td>\
		<td class="lbl-property"><span data-go-to="wdw-create-edit-property" class="fa fa-edit link"></span></td>\
		<td class="lbl-property"><span class="fa fa-trash delete-property"></span></td>\
		</tr>'

		$("#property-table-admin").empty();
		for( var i = 0 ; i < jData.length ; i++ ){
			var sPropertyTemplate = sProperty;

			sPropertyTemplate = sPropertyTemplate.replace( "{{id}}" , jData[i].id );
			sPropertyTemplate = sPropertyTemplate.replace( "{{address}}" , jData[i].street );
			sPropertyTemplate = sPropertyTemplate.replace( "{{price}}" , jData[i].price );

			if (jData[i].imageUrl != undefined ) {
				sPropertyTemplate = sPropertyTemplate.replace( "{{image}}" , jData[i].imageUrl );
			}
			
			$("#property-table-admin").append( sPropertyTemplate );
			
		}

	}).fail(function(jData){
		console.log(jData);
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
//Add properties
//////////////////////////////////////////////



	var iElementNumber = 0;

	$('.add-image-placeholder').on('click', function(){
		$(this).children('.file-input')[0].click();
	});
	

	$(document).on('change' , '[type="file"]' , function(){
		


		console.log(iElementNumber);

		var preview = new FileReader();
		preview.readAsDataURL( this.files[0] );
		var self = this;
		preview.onload = function(event){
			$(self).parent().css("background-image", "url('" + event.target.result + "')" ); 
			$(self).siblings(".img-preview").attr("src", event.target.result);
		}

		if (iElementNumber >= 2) {
			iElementNumber++
			fnCreateImageInput();
		} else {
			iElementNumber++
		}

		
	});


	function fnCreateImageInput(){

		var sDiv = '<div class="add-image-placeholder">\
		<img class="img-preview" src="">\
		<div class="add-symbol fa fa-plus"></div>\
		<input class="file-input" type="file" name="file-'+iElementNumber+'">\
	</div>';


	$(sDiv).appendTo("#add-img").each(function () {
		$('.add-image-placeholder').on('click', function(){
			$(this).children('.file-input')[0].click();
		});
	});
}



var sUrl = "/CMSV1/services/properties/api-get-zipcodes.php";
$.getJSON( sUrl , function( ajData ){

	var sUserTemplate= '<option value="{{zipcode1}}">{{zipcode2}} {{name}}</option>'

	for( var i = 0 ; i < ajData.length ; i++ ){

		userTemplate = sUserTemplate

		userTemplate = userTemplate.replace( "{{zipcode1}}" , ajData[i].zipcode );
		userTemplate = userTemplate.replace( "{{zipcode2}}" , ajData[i].zipcode );
		userTemplate = userTemplate.replace( "{{name}}" , ajData[i].name );

		$("#zipcode-dropdown").append( userTemplate );	
	}
});

$("#btn-create-edit-property").click(function(){
	$("#frm-create-edit-property").trigger('submit');
});

$("#frm-create-edit-property").on('submit', function(e){

	e.preventDefault();

		var sUrl = "";

		sUrl = "/CMSV1/services/properties/api-create.php";

		$.ajax({
			"url": sUrl,
			"type":"post",
			"data": new FormData(this),
			"contentType":false,
			"processData":false,
			"cache":false

		}).done( function( data ){
			console.log(data);
		}).fail( function( data ){
			console.log(data);
		});

});







