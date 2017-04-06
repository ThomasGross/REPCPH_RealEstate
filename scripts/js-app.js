
// NAVIGATION

$(document).on("click",".link", function() {

	var sGoToWindow = $(this).attr("data-go-to");

	switch(sGoToWindow) {
		case "wdw-users":
		fnGetUsers(function(data){
			fnCreateUserTable(data);
		}); 
		break;
		case "wdw-create-edit-user":
		if ($(this).parent().siblings(".lbl-user-id").text()) {
			fnMoveUserAttr(this);
		} else {
			fnRemoveUserAttr();
		}
		break;
		case "wdw-properties":
		fnGetProperties(function( data ){
			fnCreateUserPropertyTable( data );
		});
		break;
		case "wdw-properties-admin":
		fnGetProperties(function( data ){
			fnCreatePropertyTableAdmin(data);
		});
		break;
		case "wdw-create-edit-property":

		if ($(this).parent().parent().attr("data-id")) {

			var propertyId = $(this).parent().parent().attr("data-id");

			fnGetProperty(propertyId, function( jData ){
				fnPopulatePropertyForm(jData);
			});

		} else {
			fnRemovePropertyAttr();
		}
		break;
		default:

	}

	if (sGoToWindow != null || sGoToWindow != undefined) {

		$(".wdw").hide();

		$("#"+sGoToWindow).show();
	} 

});



fnGetZipcodes(function( data ){
	fnPopulateZipDropdowns( data );
});

function fnGetZipcodes(fnCallBack){
	var sUrl = "/CMSV1/services/properties/api-get-zipcodes.php";
	$.getJSON( sUrl , function( ajData ){
		fnCallBack(ajData);
	});
}

function fnPopulateZipDropdowns(ajData){

	var sUserTemplate= '<option value="{{zipcode1}}">{{zipcode2}} {{name}}</option>'

	for( var i = 0 ; i < ajData.length ; i++ ){

		userTemplate = sUserTemplate

		userTemplate = userTemplate.replace( "{{zipcode1}}" , ajData[i].zipcode );
		userTemplate = userTemplate.replace( "{{zipcode2}}" , ajData[i].zipcode );
		userTemplate = userTemplate.replace( "{{name}}" , ajData[i].name );

		$(".zipcode-dropdown").append( userTemplate );
	}
}


$("#btn-create-edit-account").click(function(){

	var sUserId = $("#txt-create-edit-id").val();
	var jFormData = $("#frm-create-edit-users").serialize();

	if (sUserId.length == 0){

		fnCreateUser(jFormData, function(jData){
			if (jData.status == "ok") {
				alert("user created");
				fnGetUsers(function(data){
					fnCreateUserTable(data);
				}); 
			}
		});

	} else  {
		fnEditUser(jFormData, function(jData){
			if (jData.status == "ok") {
				alert("user edited");
				fnGetUsers(function(data){
					fnCreateUserTable(data);
				}); 
			}
		});
	}
});

// USER DELETION

$(document).on("click", ".btn-user-delete", function(){

	var sUserIdToDelete = $(this).parent().siblings('.lbl-user-id').text();

	fnDeleteUser( sUserIdToDelete, function(jData){

		if (jData.status == "ok") {
			alert("user deleted");
			fnGetUsers(function(data){
				fnCreateUserTable(data);
			}); 
		}
	});
});


// PROPERTY DELETION

$(document).on("click", ".delete-property", function(){

	var sPropertyIdToDelete = $(this).parent().parent().attr("data-id");

	fnDeleteProperty( sPropertyIdToDelete, function(jData){

		if (jData.status == "ok") {

			alert("property deleted");
			fnGetProperties(function(data){
				fnCreatePropertyTableAdmin(data);
			}); 
		}
	});
});


//////////////////////////////////////////////
///// LOGIN FUNCTIONS
//////////////////////////////////////////////


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
		alert("ERROR");
	});
};

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


//////////////////////////////////////////////
///// USER CRUD FUNCTIONS
//////////////////////////////////////////////


///// GET

function fnGetUsers( fnCallBack ){

	// display properties
	var sUrl = "/CMSV1/services/users/api-get.php";
	$.getJSON( sUrl , function( jData ){

	}).done( function( jData ){
		fnCallBack(jData);
	}).fail( function( jData ){
		fnCallBack(jData);
	});
}

///// CREATE

function fnCreateUser( jFormData, fnCallBack ){

	var sUrl = "/CMSV1/services/users/api-create.php";

	$.ajax({
		"url": sUrl,
		"type":"post",
		"data": jFormData,
		"dataType":"json"

	}).done( function( data ){

		fnCallBack(data);
		
	}).fail( function( data ){
		console.log(data);
	});

}

///// EDIT

function fnEditUser( jFormData, fnCallBack ){

	sUrl = "/CMSV1/services/users/api-edit.php";

	$.ajax({
		"url": sUrl,
		"type":"post",
		"data": jFormData,
		"dataType":"json"

	}).done( function( data ){
		fnCallBack(data);
	}).fail( function( data ){
		console.log(data);
	});

}

///// DELETE

function fnDeleteUser(sUserId, fnCallBack){

	$.ajax({
		"url":"services/users/api-delete.php",
		"method":"post",
		"data":  ({ 'id': sUserId }),
		"dataType":"json"

	}).done( function(data){
		fnCallBack(data);
		
	}).fail( function(data){
		fnCallBack(data);
	});
};

//////////////////////////////////////////////
///// USER FORM FUNCTIONS
//////////////////////////////////////////////

function fnRemoveUserAttr(){
	$("#txt-create-edit-id").val( "" );
	$("#txt-create-edit-username").val( "" );
	$("#txt-create-edit-email").val( "" );
	$("#txt-create-edit-password").val( "" );
	$("#select-user-dropdown").parent().siblings(".selected").text( "user" );
}

function fnMoveUserAttr( element ){
	var sUserIdToEdit =  $(element).parent().siblings(".lbl-user-id").text();
	var sUsernameToEdit =  $(element).parent().siblings(".lbl-user-username").text();
	var sUserEmailToEdit =  $(element).parent().siblings(".lbl-user-email").text();
	var sUserPasswordToEdit =  $(element).parent().siblings(".lbl-user-password").text();
	var sUserUserRoleToEdit =  $(element).parent().siblings(".lbl-user-userRole").text();

	$("#txt-create-edit-id").val( sUserIdToEdit );
	$("#txt-create-edit-username").val( sUsernameToEdit );
	$("#txt-create-edit-email").val( sUserEmailToEdit );
	$("#txt-create-edit-password").val( sUserPasswordToEdit );
	$("#select-user-dropdown").parent().siblings(".selected").text( sUserUserRoleToEdit );
}

//////////////////////////////////////////////
///// USER TABLE FUNCTIONS
//////////////////////////////////////////////

function fnCreateUserTable( ajData ){

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
	<td><span data-go-to="wdw-create-edit-user" class="fa fa-edit link btn-edit-user"></span></td>\
	<td><span class="fa fa-trash btn-user-delete"></span></td>\
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
}


//////////////////////////////////////////////
///// PROPERTY CRUD FUNCTIONS
//////////////////////////////////////////////


///// GET

function fnGetProperty(sPropertyId , fnCallBack){

	// display properties
	var sUrl = "/CMSV1/services/properties/api-get.php?id="+sPropertyId;
	$.getJSON( sUrl , function( jData ){

	}).done( function( jData ){
		fnCallBack(jData);
	}).fail( function( jData ){
		fnCallBack(jData);
	});
}

function fnGetProperties( fnCallBack ){

	// display properties
	var sUrl = "/CMSV1/services/properties/api-get.php";
	$.getJSON( sUrl , function( jData ){
		
	}).done( function( jData ){
		fnCallBack(jData);
	}).fail( function( jData ){
		alert(jData);
	});
}

///// CREATE

function fnCreateProperty(formData, fnCallBack ){


	var sUrl = "/CMSV1/services/properties/api-create.php";

	$.ajax({
		"url": sUrl,
		"type":"post",
		"data": new FormData(formData),
		"contentType":false,
		"dataType": "json",
		"processData":false,
		"cache":false

	}).done( function( data ){
		fnCallBack(data);

	}).fail( function( data ){
		console.log(data);
	});
}

///// EDIT

function fnEditProperty( fnCallBack ){
	
}

///// DELETE

function fnDeleteProperty(sPropertyId, fnCallBack ){
	
	$.ajax({
		"url":"services/properties/api-delete.php",
		"method":"post",
		"data":  ({ 'id': sPropertyId }),
		"dataType":"json"

	}).done( function(data){

		console.log(data);

		fnCallBack(data);
		
	}).fail( function(data){
		fnCallBack(data);
	});

}


//////////////////////////////////////////////
///// PROPERTY FORM FUNCTIONS
//////////////////////////////////////////////

function fnRemovePropertyAttr(){
	$("#txt-create-edit-property-id").val( "" );
	$("#txt-create-edit-property-road").val( "" );
	$("#txt-create-edit-property-city").val( "" );
	$("#txt-create-edit-property-region").val( "" );
	$("#txt-create-edit-property-zipcode").val( "" );
	$("#txt-create-edit-property-price").val( "" );
	$("#txt-create-edit-property-long").val( "" );
	$("#txt-create-edit-property-lat").val( "" );
};

function fnPopulatePropertyForm(jData){
	$("#txt-create-edit-property-id").val( jData.id );
	$("#txt-create-edit-property-road").val( jData.street );
	$("#txt-create-edit-property-city").val( jData.city );
	$("#txt-create-edit-property-region").val( jData.region );
	$("#select-create-edit-property-zipcode").parent().siblings(".selected").text( jData.zipcode + " " + jData.city );
	$("#txt-create-edit-property-price").val( jData.price );
	$("#txt-create-edit-property-long").val( jData.long );
	$("#txt-create-edit-property-lat").val( jData.lat );

	$(self).parent().css("background-image", "url('" + event.target.result + "')" ); 
	$(self).siblings(".img-preview").attr("src", event.target.result);

}

function fnCreateUserPropertyTable(jsProperties){

	var sProperty = '<tr class="row-property">\
	<td class="img-property">\
	<div class="img"><img src={{image}}></div>\
	</td>\
	<td class="lbl-property" id="lbl-property-address">Address:<br><br>{{address}}</td>\
	<td class="lbl-property" id="lbl-property-price">Price:<br><br>{{price}}</td>\
	</tr>'

	$("#property-table").empty();

	for( var i = 0 ; i < jsProperties.length ; i++ ){
		var sPropertyTemplate = sProperty;

		sPropertyTemplate = sPropertyTemplate.replace( "{{id}}" , jsProperties[i].id );
		sPropertyTemplate = sPropertyTemplate.replace( "{{address}}" , jsProperties[i].street );
		sPropertyTemplate = sPropertyTemplate.replace( "{{price}}" , jsProperties[i].price );
		sPropertyTemplate = sPropertyTemplate.replace( "{{image}}" , jsProperties[i]['images'][0].imageUrl );
		$("#property-table").append( sPropertyTemplate );

	}
}


function fnCreatePropertyTableAdmin(jsProperties){

	var sProperty = '<tr  data-id="{{id}}" class="row-property">\
	<td class="img-property">\
	<div class="img"><img src={{image}}></div>\
	</td>\
	<td class="lbl-property" id="lbl-property-address">Address:<br><br>{{address}}</td>\
	<td class="lbl-property" id="lbl-property-price">Price:<br><br>{{price}}</td>\
	<td class="lbl-property"><span data-go-to="wdw-create-edit-property" class="fa fa-edit link"></span></td>\
	<td class="lbl-property"><span class="fa fa-trash delete-property"></span></td>\
	</tr>'

	$("#property-table-admin").empty();
	for( var i = 0 ; i < jsProperties.length ; i++ ){
		var sPropertyTemplate = sProperty;

		sPropertyTemplate = sPropertyTemplate.replace( "{{id}}" , jsProperties[i].id );
		sPropertyTemplate = sPropertyTemplate.replace( "{{address}}" , jsProperties[i].street );
		sPropertyTemplate = sPropertyTemplate.replace( "{{price}}" , jsProperties[i].price ); 

		sPropertyTemplate = sPropertyTemplate.replace( "{{image}}" , jsProperties[i]['images'][0].imageUrl );

		$("#property-table-admin").append( sPropertyTemplate );
	}
}




//////////////////////////////////////////////
///// Add property
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



$("#btn-create-edit-property").click(function(){
	$("#frm-create-edit-property").trigger('submit');
});

$("#frm-create-edit-property").on('submit', function(e){

	e.preventDefault();

	var sUrl = "/CMSV1/services/properties/api-create.php";

		// Display the key/value pairs
		// for (var pair of formData.entries()) {
	 	//    	console.log(pair[0]+ ', ' + pair[1]); 
		// }


		fnCreateProperty(this, function(jData){

			if (jData.status = "ok") {
				fnGetProperties(function( data ){
					fnCreatePropertyTableAdmin(data);
				});
			} else {

				alert("create failed");
			}



		});

	});



//////////////////////////////////////////////
///// DESKTOP NOTIFICATION
//////////////////////////////////////////////
	// TO DO : ONLY STARTS WHEN USER IS LOGGED IN


	var iPropertyCount = 0;

	fnGetProperties(function(ajData){

		iPropertyCount = ajData.length;

		setInterval(function(){

			fnGetProperties(function(ajData){

				console.log(iPropertyCount);

				if ( iPropertyCount < ajData.length ) {

					iPropertyCount = ajData.length;

					fnDesktopNotification();

					// get the sounds from this link: http://soundbible.com
					// build a sound object
					var oSound = new Audio('./assets/property-message.mp3');
					// play the sound
					oSound.play();
					// TO DO PLAY SOUND FUNCTION
					fnTitleNotification('- New Property Added -')

				} else if( iPropertyCount > ajData.length ) {

					iPropertyCount = ajData.length;
				}

			});

		}, 1000);

	});

	function fnTitleNotification(sText){

		var myVar = setInterval(myTimer, 1000);
		var oldtitle = document.title;

		var count = 0

		function myTimer() {

			if (count == 6) {

				clearInterval(myVar)

			} else if ((count % 2) == 1) {

				document.title = oldtitle;
				count++;

			} else {
				document.title = sText;
				count++;
				
			}
		}		

	}


	function fnDesktopNotification() {
	    // Let's check if the browser supports notifications
	    if (!("Notification" in window)) {
	    	alert("This browser does not support desktop notification");
	    }

	    // Let's check whether notification permissions have already been granted
	    else if (Notification.permission === "granted") {
	        // If it's okay let's create a notification

	        var options = {
	        	body: "A new property has been added",
	        	icon: "./assets/property-icon.png",
	        	dir : "ltr"
	        };

	        var notification = new Notification("REP | CPH",options);

	    }

	    // Otherwise, we need to ask the user for permission
	    else if (Notification.permission !== "denied") {
	    	Notification.requestPermission(function (permission) {
	        	// If the user accepts, let's create a notification
	        	if (permission === "granted") {

	        		var options = {
	        			body: "A new property has been added",
	        			icon: "./assets/property-icon.png",
	        			dir : "ltr"
	        		};

	        		var notification = new Notification("REP | CPH",options);

	        	}
	        });
	    }

      // At last, if the user has denied notifications, and you 
      // want to be respectful there is no need to bother them any more.
  }

//////////////////////////////////////////////
///// RIGHT CLICK NAVIGATION
//////////////////////////////////////////////

$('body').bind("contextmenu", function(e) {
	e.preventDefault();

        if(e.which == 3) //1: left, 2: middle, 3: right
        {
        	location.reload();
        }
    });

//////////////////////////////////////////////
///// FONTEND VALIDATION
//////////////////////////////////////////////

// Signup

function validate(form, fnCallBack){

	console.log(form);
	console.log("length "+form.length);

	var bValidateCheck = false;
	var bUsernameCheck = false;
	var bEmailCheck = false;
	var bPasswordCheck = false;


	var aoChildren = form.find('input.validate');


	for( var i = 0; i < aoChildren.length; i++ ){

		var oInput = $( aoChildren[i] ); // convert 

		if (oInput.hasClass('username')) {
			bUsernameCheck = validateUsername(oInput);
			console.log(bUsernameCheck);
		}
		if (oInput.hasClass('email')) {
			bEmailCheck = validateEmail(oInput);
			console.log(bEmailCheck);

		}
		if (oInput.hasClass('password')) {
			bPasswordCheck = validatePassword(oInput);
			console.log(bPasswordCheck);
		}

	}

	if (bUsernameCheck && bEmailCheck && bPasswordCheck) {
		fnCallBack(true);
	}

}

function validateUsername(oInput){

	var sText = oInput.val();
	var iMin = 2;
	var iMax = 18;

	if( sText.length < iMin || sText.length > iMax ){
		oInput.parent().addClass('invalid');
		return false;
	} else{
		oInput.parent().removeClass('invalid');
		return true;
	}
}


function validateEmail(oInput) {

	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	var sEmail = oInput.val();
	var bRegexTest = regex.test(sEmail);

	if (bRegexTest) {
		oInput.parent().removeClass('invalid');
		return true;
	} else {
		oInput.parent().addClass('invalid');
		return false;
	}

}	

function validatePassword(oInput) {

	var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

	var sPassword = oInput.val();
	var bRegexTest = regex.test(sPassword);

	if (bRegexTest) {
		oInput.parent().removeClass('invalid');
		return true;
	} else {
		oInput.parent().addClass('invalid');
		return false;
	}
}








