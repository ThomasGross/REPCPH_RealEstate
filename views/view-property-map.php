<div id="wdw-property-map" class="wdw">

	<div class="properties-container">

		<div class="search-options-container">
			<form class="frm-property-search">

				<div class="filters-title">Justér søgning</div>

				<div class="filter-head">Resident type</div>
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

					<div class="search-desc">Indtast vej, stednavn, by, postnr., kommune eller landsdel</div>

					<div class="input-fluid">
						<input type="text" class="filters-text-input" placeholder="Enter search here...">
						<button type="submit" class="filters-search-button">Search</button>
					</div>

				</div>

				<div class="filter-head">Valgte søgning</div>
				<div class="filter-body">
					2600
				</div>
				<div class="filter-head">Tilføj område</div>
				<div class="filter-body">
					<div class="headline">Tilføj nyt postnummer</div>

					<select class="dropdown region-dropdown" name="txt-user-role">
						<option value="" disabled selected>Select your option...</option>
						<option value="2600">2600</option>
						<option value="admin">Admin</option>
						<option value="superadmin">Superadmin</option>
					</select>

				</div>
			</form>
		</div>
		<div class="property-table-container">
			<div class="property-table-header">Search Results</div>
			<div class="property-table-navigation">
				<div class="box box-property-nav">
					<div class="btn-group btn-group-property-nav">
						<button type="button" class="btn link" data-go-to="wdw-properties-admin">Liste</button>
						<button type="button" class="btn">Galleri</button>
						<button type="button" class="btn link btn-active" data-go-to="wdw-property-map">Kort</button>
					</div>

				</div>
			</div>
			<div id="property-search-map">


			</div>
			
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

			<script>

				$('[data-go-to="wdw-property-map"]').click(function(){

					loadScript()
					
				});

				var bScriptLoad = 0;

				function loadScript() {

					if (bScriptLoad == 0) {
						bScriptLoad = 1;
						var script = document.createElement('script');
						script.setAttribute("type","text/javascript");
						script.setAttribute("src","http://maps.google.com/maps/api/js?key=AIzaSyBtrjAjyq_r69KeQzH_TETRAa41hm1T5IM&callback=initializeMap");
						document.body.appendChild(script);
					} 
				}

				function initializeMap() {

					var myLatLng = {lat: 55.951410, lng: 10.480957};
					var mapCanvas = document.getElementById('property-search-map');
					var mapOptions =  {
						zoom: 7,
						center: myLatLng
					}

					var map = new google.maps.Map(mapCanvas, mapOptions);


					var sUrl = "/CMSV1/services/properties/api-get.php";
					$.getJSON( sUrl , function( jData ){

						for( var i = 0 ; i < jData.length ; i++ ){

							

							var myLatLng = {lat: parseFloat(jData[i].lat), lng: parseFloat(jData[i].lng)};

							var infowindow = new google.maps.InfoWindow({
								content: "loading..."
							});

							var marker = new google.maps.Marker({
								position: myLatLng,
								map: map,
								content: '<h1>'+jData[i].street+'</h1>'
							});

							google.maps.event.addListener(marker, 'click', function () {
									// where I have added .html to the marker object.
									infowindow.setContent(this.content);
									infowindow.open(map, this);
							});
							
							
						}
					});

				}





			</script>


		</div>
	</div>


</div>