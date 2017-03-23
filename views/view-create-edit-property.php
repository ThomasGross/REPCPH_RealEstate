
<div id="wdw-create-edit-property" class="wdw">

	<div class="properties-container">

		<div class="create-edit-container">
			<div class="property-create-edit">

				<div class="filters-title">Opret/Rediger Bolig</div>

				<div class="filter-head">Bolig type</div>
				<div class="filter-body">
					<div class="filter-checkbox-row">
						<div>
							<input type="checkbox" id="cbVilla" class="cb"><label for="cbVilla" class="cb-label">Villa</label>
						</div>
						<div>
							<input type="checkbox" id="cbRækkehus" class="cb"><label for="cbRækkehus" class="cb-label">Rækkehus</label>
						</div>
						<div>
							<input type="checkbox" id="cbEjerlejlighed" class="cb"><label for="cbEjerlejlighed" class="cb-label">Ejerlejlighed</label>
						</div>

					</div>
					<div class="filter-checkbox-row">
						<div>
							<input type="checkbox" id="cbFritidsbolig" class="cb"><label for="cbFritidsbolig" class="cb-label">Fritidsbolig</label>
						</div>
						<div>
							<input type="checkbox" id="cbAndelsbolig" class="cb"><label for="cbAndelsbolig" class="cb-label">Andelsbolig</label>
						</div>
						<div>
							<input type="checkbox" id="cbVillalejlighed" class="cb"><label for="cbVillalejlighed" class="cb-label">Villalejlighed</label>
						</div>

					</div>
					<div class="filter-checkbox-row">
						<div>
							<input type="checkbox" id="cbLandejendom" class="cb"><label for="cbLandejendom" class="cb-label">Landejendom</label>
						</div>

						<div>
							<input type="checkbox" id="cbHelårsgrund" class="cb"><label for="cbHelårsgrund" class="cb-label">Helårsgrund</label>
						</div>

						<div>
							<input type="checkbox" id="cbFritidsgrund" class="cb"><label for="cbFritidsgrund" class="cb-label">Fritidsgrund</label>
						</div>
					</div>

				</div>

				<div class="filter-head">Beliggenhed</div>
				<div class="filter-body">
					<div class="search-desc">Indtast vej</div>
					<div class="input-fluid">
						<input type="text" class="filters-text-input" placeholder="Enter search here...">
					</div>
					<div class="search-desc">Indtast by</div>
					<div class="input-fluid">
						<input type="text" class="filters-text-input" placeholder="Enter search here...">
					</div>
					<div class="search-desc">Indtast kommune</div>
					<div class="input-fluid">
						<input type="text" class="filters-text-input" placeholder="Enter search here...">
					</div>
					<div class="search-desc">Vælg postnummer.</div>
					<select class="dropdown region-dropdown" id="zipcode-dropdown" name="txt-user-role">
						<option value="" disabled selected>Select your option...</option>


<!-- 						<option value="2600">2600</option>
						<option value="admin">Admin</option>
						<option value="superadmin">Superadmin</option>
						<option value="2600">2600</option>
						<option value="admin">Admin</option>
						<option value="superadmin">Superadmin</option>
						<option value="2600">2600</option>
						<option value="admin">Admin</option>
						<option value="superadmin">Superadmin</option>
						<option value="2600">2600</option>
						<option value="admin">Admin</option>
						<option value="superadmin">Superadmin</option> -->
					</select>

				</div>
			</div>
		</div>
		<div class="property-create-edit-contet">
			<div class="property-table-header">Tilføj Billeder</div>
			<div class="add-img-container" id="add-img">
				<div class="add-image-placeholder">
					<img class="img-preview" src="">
					<div class="add-symbol">
						<div class="add-symbol-1"></div>
						<div class="add-symbol-2"></div>
					</div>        
					<input class="file-input" type="file" name="file-1">
				</div>
				<div class="add-image-placeholder img-preview">
					<div class="add-symbol">
						<div class="add-symbol-1"></div>
						<div class="add-symbol-2"></div>
					</div>        
					<input class="file-input" type="file" name="file-2">
				</div>
				<div class="add-image-placeholder">
					<img class="img-preview" src="">
					<div class="add-symbol">
						<div class="add-symbol-1"></div>
						<div class="add-symbol-2"></div>
					</div>        
					<input class="file-input" type="file" name="file-3">
				</div>
			</div>

			<div class="property-table-header">Tilføj Position</div>
		</div>
	</div>


	<a data-go-to="wdw-properties-admin" type="button" id="btn-create-edit-property" class="btn link">Submit</a>
	<a data-go-to="wdw-properties-admin" type="button" class="btn link"> Back</a>
</div>



<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>


<script>


	var iElementNumber = 0;

	$('.add-image-placeholder').on('click', function(){
		$(this).children('.file-input')[0].click();
	});
	

	$(document).on('change' , '[type="file"]' , function(){
		
		iElementNumber++

		console.log(iElementNumber);

		var preview = new FileReader();
		preview.readAsDataURL( this.files[0] );
		var self = this;
		preview.onload = function(event){
			$(self).parent().css("background-image", "url('" + event.target.result + "')" ); 
			$(self).siblings(".img-preview").attr("src", event.target.result);
		}

		if (iElementNumber >= 3) {
			fnCreateImageInput();
		}
	});


    function fnCreateImageInput(){

      var sDiv = '<div class="add-image-placeholder">\
					<img class="img-preview" src="">\
					<div class="add-symbol">\
						<div class="add-symbol-1"></div>\
						<div class="add-symbol-2"></div>\
					</div>\
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




</script>
