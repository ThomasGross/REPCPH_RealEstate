//////////////////////////////////////////////
///// NAVIGATION 
//////////////////////////////////////////////

// When a the link class is clicked
$(document).on("click",".link", function() {

	// Get its data-go-to attribute
	var sGoToWindow = $(this).attr("data-go-to");

	// switch statement that determines which function should run before the window is shown
	switch(sGoToWindow) {
		case "wdw-users":
		// fnGetUsers are called and returns a array of users in a callback
		fnGetUsers(function(data){
			// Use the array of users to fill the usertable
			fnCreateUserTable(data);
		}); 
		break;
		case "wdw-create-edit-user":
		// If the user click on edit link and a id exists
		if ($(this).parent().siblings(".lbl-user-id").text()) {
			// attributes from usertable is moved
			fnMoveUserAttr(this);
		} else {
			// if theres no id it means that the user is trying to create and
			// we remove the values from userform
			fnRemoveUserAttr();
		}
		break;
		case "wdw-properties":
		// if user wants to go to propertywindow get properties 
		fnGetProperties(function( data ){
			// use array of properties to fill the table
			fnCreateUserPropertyTable( data );
		});
		break;
		// if user wants to go to propertyAdmin window then get properties 
		case "wdw-properties-admin":
		fnGetProperties(function( data ){
			// use array of properties to fill the table
			fnCreatePropertyTableAdmin(data);
		});
		break;
		case "wdw-create-edit-property":

		iElementNumber = 0;
		fnInitialImageInput();

		// if user wants to go to create edit property, check for an id
		if ($(this).parent().parent().attr("data-id")) {

			console.log("edit");

			// placeholder for the id
			var propertyId = $(this).parent().parent().attr("data-id");

			// get property by the id
			fnGetProperty(propertyId, function( jData ){
				// fill the property form with the data from callback 
				fnPopulatePropertyForm(jData);
			});

		} else {
			// if theres no id it means that the user is trying to create and
			// we remove the values from userform
			fnRemovePropertyAttr();
		}
		break;
		default:

	}

	// If the sGoToWindow is set, hide current window and show next one
	if (sGoToWindow != null || sGoToWindow != undefined) {

		$(".wdw").hide();

		$("#"+sGoToWindow).show();
	} 

});

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
///// SETUP DROPDOWNS
//////////////////////////////////////////////

// Get all zipcodes and fill the ZipDropdowns 
fnGetZipcodes(function( data ){
	fnPopulateZipDropdowns( data );
});

// Get all region and fill the RegionDropdowns 
fnGetRegions(function( data ){
	fnPopulateRegionDropdowns( data );
});

// Ajax get request that takes a function as a parametre 
// Gets all zipcodes and makes a callback
function fnGetZipcodes(fnCallBack){
	var sUrl = "/CMSV1/services/properties/api-get-zipcodes.php";
	$.getJSON( sUrl , function( ajData ){
		fnCallBack(ajData);
	});
}

// Ajax get request that takes a function as a parametre 
// Gets all regions and makes a callback
function fnGetRegions(fnCallBack){
	var sUrl = "/CMSV1/services/properties/api-get-regions.php";
	$.getJSON( sUrl , function( ajData ){
		fnCallBack(ajData);
	});
}

// function that fills zipcode dropdowns 
function fnPopulateZipDropdowns(ajData){

	// template for zipcode option
	var sUserTemplate= '<option value="{{zipcode1}}">{{zipcode2}} {{name}}</option>'

	// loops though each json element and replace the placeholders
	for( var i = 0 ; i < ajData.length ; i++ ){

		userTemplate = sUserTemplate;

		userTemplate = userTemplate.replace( "{{zipcode1}}" , ajData[i].zipcode );
		userTemplate = userTemplate.replace( "{{zipcode2}}" , ajData[i].zipcode );
		userTemplate = userTemplate.replace( "{{name}}" , ajData[i].name );

		// append to the dropdown		
		$(".zipcode-dropdown").append( userTemplate );
	}
}

// function that fills region dropdowns 
function fnPopulateRegionDropdowns(ajData){

	// template for region option
	var sUserTemplate= '<option value="{{name1}}">{{name2}}</option>'

	// loops though each json element and replace the placeholders
	for( var i = 0 ; i < ajData.length ; i++ ){

		userTemplate = sUserTemplate;

		userTemplate = userTemplate.replace( "{{id}}" , ajData[i].regionId );
		userTemplate = userTemplate.replace( "{{name1}}" , ajData[i].name );
		userTemplate = userTemplate.replace( "{{name2}}" , ajData[i].name );

		// append to the dropdown
		$(".region-dropdown").append( userTemplate );
	}
}



//////////////////////////////////////////////
///// CREATE OR EDIT USER
//////////////////////////////////////////////

// If the submit button in create-edit user window is clicked
$("#btn-create-edit-account").click(function(){

	// Get id from a hidden input field
	var sUserId = $("#txt-create-edit-id").val();

	// save the userform in a serilized variable
	var jFormData = $("#frm-create-edit-users").serialize();

	// Validate the userform and await callback with conformation
	fnValidateUserForm($("#frm-create-edit-users"), function(bValdationCheck){

		if (bValdationCheck == true) {

			// If sUserId is equal to 0 - create user 
			if (sUserId.length == 0){

				// call fnCreateUser and await conformation 
				fnCreateUser(jFormData, function(jData){

					// If status is ok - alert
					if (jData.status == "ok") {
						alert("user created");
						// TO DO: navigate to table
					} else {
						// TO DO: HANDLE ERROR
					}
				});


			// If sUserId is not equal to 0 - edit user 
		} else  {
				// call fnEditUser and await conformation 
				fnEditUser(jFormData, function(jData){

					// If status is ok - alert
					if (jData.status == "ok") {
						alert("user edited");
						// TO DO: navigate to table
					} else {
						// TO DO: HANDLE ERROR
					}
				});
			}
		}
	});
});


//////////////////////////////////////////////
///// USER DELETION
//////////////////////////////////////////////

$(document).on("click", ".btn-user-delete", function(){

	// Save user id in a variable
	var sUserIdToDelete = $(this).parent().siblings('.lbl-user-id').text();

	// Call fnDeleteUser and awaid conformation
	fnDeleteUser( sUserIdToDelete, function(jData){

		// If status is ok get all users and update user table
		if (jData.status == "ok") {
			alert("user deleted");
			fnGetUsers(function(data){
				fnCreateUserTable(data);
			}); 
		}
	});
});


//////////////////////////////////////////////
///// PROPERTY DELETION
//////////////////////////////////////////////

$(document).on("click", ".delete-property", function(){

	// Save property id in a variable
	var sPropertyIdToDelete = $(this).parent().parent().attr("data-id");

	// Call fnDeleteProperty and awaid conformation
	fnDeleteProperty( sPropertyIdToDelete, function(jData){

		// If status is ok get all users and update user table
		if (jData.status == "ok") {
			alert("property deleted");
			fnGetProperties(function(data){
				fnCreatePropertyTableAdmin(data);
			}); 
		}
	});
});



//////////////////////////////////////////////
///// USER CRUD FUNCTIONS
//////////////////////////////////////////////


///// GET

// function that get all users and send them back 
// though a callback
function fnGetUsers( fnCallBack ){

	var sUrl = "/CMSV1/services/users/api-get.php";

	// getJSON gets a json type object 
	$.getJSON( sUrl , function( jData ){

	}).done( function( jData ){
		fnCallBack(jData);
	}).fail( function( jData ){
		fnCallBack(jData);
	});
}

///// CREATE

// Function that takes a form and posts to the api though ajax  
// and returns conformation though a callback
function fnCreateUser( jFormData, fnCallBack ){

	var sUrl = "/CMSV1/services/users/api-create.php";

	// ajax call gets a json type object back
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

// Function that takes a form and posts to the api though ajax  
// and returns conformation though a callback
function fnEditUser( jFormData, fnCallBack ){

	sUrl = "/CMSV1/services/users/api-edit.php";

	// ajax call gets a json type object back
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

// Function that takes a user id and posts to the api though ajax  
// and returns conformation though a callback
function fnDeleteUser(sUserId, fnCallBack){

	// ajax call gets a json type object back
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

// function that removes all values on userform
function fnRemoveUserAttr(){
	$("#txt-create-edit-id").val( "" );
	$("#txt-create-edit-username").val( "" );
	$("#txt-create-edit-email").val( "" );
	$("#txt-create-edit-password").val( "" );
	$("#select-user-dropdown").parent().siblings(".selected").text( "user" );
}

// function that moves all values on usertable to userform
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

// function that takes array of json object and populates the usertable
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

	// remove all elements in usertable
	$("#users-table").empty();
	// add the header 
	$("#users-table").append( sTableTemplateHeader );

	for( var i = 0 ; i < ajData.length ; i++ ){

		userTemplate = sUserTemplate

		// replace the placeholders in the template
		userTemplate = userTemplate.replace( "{{id}}" , ajData[i].id );
		userTemplate = userTemplate.replace( "{{username}}" , ajData[i].username );
		userTemplate = userTemplate.replace( "{{email}}" , ajData[i].email );
		userTemplate = userTemplate.replace( "{{password}}" , ajData[i].password );
		userTemplate = userTemplate.replace( "{{userRole}}" , ajData[i].userRole );

		// append the user row
		$("#users-table").append( userTemplate );	
	}
}


//////////////////////////////////////////////
///// PROPERTY CRUD FUNCTIONS
//////////////////////////////////////////////


///// GET

// Function that get specific property by an id
// the json object is afterwards return though a callback
function fnGetProperty(sPropertyId , fnCallBack){

	var sUrl = "/CMSV1/services/properties/api-get.php?id="+sPropertyId;
	$.getJSON( sUrl , function( jData ){

	}).done( function( jData ){
		fnCallBack(jData);
	}).fail( function( jData ){
		fnCallBack(jData);
	});
}

// Function that gets all properties 
// the array of json object is afterwards return though a callback
function fnGetProperties( fnCallBack ){

	var sUrl = "/CMSV1/services/properties/api-get.php";
	$.getJSON( sUrl , function( ajData ){
		
	}).done( function( ajData ){
		fnCallBack(ajData);
	}).fail( function( ajData ){
		alert(ajData);
	});
}

///// CREATE

// Function that takes a propertyform and posts to the api though ajax  
// and returns conformation though a callback
function fnCreateProperty(formData, fnCallBack ){

	// var form = new FormData(formData);
	// //Display the key/value pairs in a FormData object
	// for (var pair of form.entries()) {
	// 	console.log(pair[0]+ ', ' + pair[1]); 
	// }

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

	});
}

///// EDIT

// TO DO: CREATE EDIT FUNCTION
function fnEditProperty(formData, fnCallBack ){

	var sUrl = "/CMSV1/services/properties/api-edit.php";

	$.ajax({
		"url": sUrl,
		"type":"post",
		"data": new FormData(formData),
		"contentType":false,
		// "dataType": "json",
		"processData":false,
		"cache":false

	}).done( function( data ){
		// fnCallBack(data);
		console.log(data);

	}).fail( function( data ){

	});

	
}

///// DELETE

// Function that takes a propertyid and posts to the api though ajax  
// and returns conformation though a callback if the property is deleted or not
function fnDeleteProperty(sPropertyId, fnCallBack ){

	$.ajax({
		"url":"services/properties/api-delete.php",
		"method":"post",
		"data":  ({ 'id': sPropertyId }),
		"dataType":"json"

	}).done( function(data){

		fnCallBack(data);
		
	}).fail( function(data){
		fnCallBack(data);
	});

}


//////////////////////////////////////////////
///// PROPERTY FORM FUNCTIONS
//////////////////////////////////////////////

// function that removes all values on propertyform
function fnRemovePropertyAttr(){
	$("#txt-create-edit-property-id").val( "" );
	$("#txt-create-edit-property-road").val( "" );
	$("#txt-create-edit-property-city").val( "" );
	$("#txt-create-edit-property-region").val( "" );
	$("#select-create-edit-property-zipcode").parent().siblings(".selected").text( "Vælg postnummer her.." );
	$("#select-create-edit-property-region").parent().siblings(".selected").text( "Vælg region her.." );
	$("#txt-create-edit-property-price").val( "" );
	$("#txt-create-edit-property-long").val( "" );
	$("#txt-create-edit-property-lat").val( "" );
	

	$("#uploads-container").remove();
	$("#uploaded-img").remove();


};

// function that moves all values on propertytable to propertyform
function fnPopulatePropertyForm(jData){
	$("#txt-create-edit-property-id").val( jData.id );
	$("#txt-create-edit-property-road").val( jData.street );
	$("#txt-create-edit-property-city").val( jData.city );
	$("#txt-create-edit-property-region").val( jData.municipality );
	$("#select-create-edit-property-zipcode").parent().siblings(".selected").text( jData.zipcode + " " + jData.city );
	$("#select-create-edit-property-region").parent().siblings(".selected").text( jData.region );
	$("#txt-create-edit-property-price").val( jData.price );
	$("#txt-create-edit-property-long").val( jData.long );
	$("#txt-create-edit-property-lat").val( jData.lat );


	$("#uploads-container").remove();
	$("#uploaded-img").remove();

	var imgArray = jData.images

	var sUploadedImages = '<div id="uploads-container" class="property-table-header">Uploadede Billeder</div>\
	<div class="add-img-container" id="uploaded-img">\
	</div>'

	$(".property-create-edit-contet").prepend(sUploadedImages);

	for (var i = 0; i < imgArray.length; i++) {

		// Template 
		var sDiv = '<div id="add-image-'+imgArray[i].imageId+'" class="add-image-placeholder"></div>';
		$("#uploaded-img").prepend(sDiv);
		$("#add-image-"+imgArray[i].imageId).css("background-image", "url('/CMSV1/services/properties/uploads/"+ jData.id +"/"+ imgArray[i].imageName +"')" ); 
		
	}

}

//////////////////////////////////////////////
///// PROPERTY TABLE FUNCTIONS
//////////////////////////////////////////////


// function that takes array of json object and populates the propertytable for the users
function fnCreateUserPropertyTable(jsProperties){

	// property row template 
	var sProperty = '<tr class="row-property">\
	<td class="img-property">\
	<div class="img"><img src={{image}}></div>\
	</td>\
	<td class="lbl-property" id="lbl-property-address">Address:<br><br>{{address}}</td>\
	<td class="lbl-property" id="lbl-property-price">Price:<br><br>{{price}}</td>\
	</tr>'

	// remove all elements in table
	$("#property-table").empty();

	for( var i = 0 ; i < jsProperties.length ; i++ ){
		var sPropertyTemplate = sProperty;

		// Replace placeholders 
		sPropertyTemplate = sPropertyTemplate.replace( "{{id}}" , jsProperties[i].id );
		sPropertyTemplate = sPropertyTemplate.replace( "{{address}}" , jsProperties[i].street );
		sPropertyTemplate = sPropertyTemplate.replace( "{{price}}" , jsProperties[i].price );
		sPropertyTemplate = sPropertyTemplate.replace( "{{image}}" , jsProperties[i]['images'][0].imageUrl );
		
		// add row to table
		$("#property-table").append( sPropertyTemplate );

	}
}

// function that takes array of json object and populates the propertytable for the admin
function fnCreatePropertyTableAdmin(jsProperties){

	// property row template 
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

		// Replace placeholders 
		sPropertyTemplate = sPropertyTemplate.replace( "{{id}}" , jsProperties[i].id );
		sPropertyTemplate = sPropertyTemplate.replace( "{{address}}" , jsProperties[i].street );
		sPropertyTemplate = sPropertyTemplate.replace( "{{price}}" , jsProperties[i].price ); 
		sPropertyTemplate = sPropertyTemplate.replace( "{{image}}" , jsProperties[i]['images'][0].imageUrl );

		// add row to table
		$("#property-table-admin").append( sPropertyTemplate );
	}
}


//////////////////////////////////////////////
///// PROPERTY FORM
//////////////////////////////////////////////

// Global variable - tacks the number of files in propertyform
var iElementNumber = 0;

// If the image placeholder is clicked invoke the file input
$('.add-image-placeholder').on('click', function(){
	$(this).children('.file-input')[0].click();
});

// If the input field with the type "file" changes 
$(document).on('change' , '[type="file"]' , function(){

	// Create fileReader to read the image 
	var preview = new FileReader();

	// Read first file in input 
	preview.readAsDataURL( this.files[0] );
	var self = this;
	preview.onload = function(event){
		// insert the loaded img in the parent imageplaceholder 
		$(self).parent().css("background-image", "url('" + event.target.result + "')" ); 
	}

	// if there is tree images uploadet add another image input 
	if (iElementNumber >= 2) {
		iElementNumber++
		fnCreateImageInput();
	} else {
		iElementNumber++
	}
});

function fnInitialImageInput(){
	var sDiv = '<div class="add-image-placeholder add-image-0" id="add-image-0">\
	<div class="add-symbol fa fa-plus"></div>\
	<input id="input-file-0" class="file-input file-input-0 image validate" type="file" name="file-0">\
	</div>\
	<div class="add-image-placeholder add-image-1" id="add-image-1">\
	<div class="add-symbol fa fa-plus" aria-hidden="true""></div>\
	<input id="input-file-1" class="file-input file-input-1 image validate" type="file" name="file-1">\
	</div>\
	<div class="add-image-placeholder add-image-2" id="add-image-2">\
	<div class="add-symbol fa fa-plus"></div>\
	<input id="input-file-2" class="file-input file-input-2 image validate" type="file" name="file-2">\
	</div>'

	$('#add-img').children().remove();
	$('#add-img').append(sDiv);


	console.log(i);

	// for each template added add click invoker
	$('.add-image-0').on('click', function(){
		$(this).children('.file-input-0')[0].click();
	});
	$('.add-image-1').on('click', function(){
		$(this).children('.file-input-1')[0].click();
	});	
	$('.add-image-2').on('click', function(){
		$(this).children('.file-input-2')[0].click();
	});


}

// Adds image input to list of image inputs
function fnCreateImageInput(){

	// Template 
	var sDiv = '<div class="add-image-placeholder add-image-'+iElementNumber+'">\
	<div class="add-symbol fa fa-plus"></div>\
	<input class="file-input file-input-'+iElementNumber+'" type="file" name="file-'+iElementNumber+'">\
	</div>';

	// append template to add-img div
	$(sDiv).appendTo("#add-img").each(function () {

		var number = iElementNumber

		// for each template added add click invoker
		$('.add-image-'+number).on('click', function(){
			$(this).children('.file-input-'+iElementNumber)[0].click();
		});
	});
}

// when the btn-create-edit-property butten is clicked trigger 
// the form submit function
$("#btn-create-edit-property").click(function(){
	$("#frm-create-edit-property").trigger('submit');
});

// called when the frm-create-edit-property is submitted
$("#frm-create-edit-property").on('submit', function(e){
	// prevent the default submit operation
	e.preventDefault();

	// temporary placeholder for the form
	var form = this;

	console.log(form);


	// Validate Property fontend
	fnValidatePropertyForm($(form), function(bValdationCheck){

		// if the validation passed continue
		if(bValdationCheck){

			// Get id from a hidden input field
			var sPropertyId = $("#txt-create-edit-property-id").val();

			if (sPropertyId.length == 0 ) {
				// Create property and awaid conformation
				fnCreateProperty(form, function(jData){

					if (jData.status = "ok") {
						alert("Property created");

					} else {

						alert("create failed");
					}

				});
			} else {
				fnEditProperty(form, function(jData){

					if (jData.status = "ok") {
						alert("Property edited");

					} else {

						alert("edit failed");
					}
				});

			}

		}

	});

});












