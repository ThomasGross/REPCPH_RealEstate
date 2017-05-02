
<div id="wdw-create-edit-property" class="wdw">

	<div class="create-edit-wrapper">

		<form id="frm-create-edit-property" method="post">
			<div class="create-edit-container">
				<div class="property-create-edit">

					<input type="hidden" id="txt-create-edit-property-id" name="txt-property-id" />

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
						<div class="search-desc">Indtast vej, husnummer og etage</div>
						<div class="input-fluid">
							<input type="text" id="txt-create-edit-property-road" class="filters-text-input validate street" placeholder="Indtast vej, husnummer og etage her.." name="txt-property-street">
						</div>
						<div class="search-desc">Indtast by</div>
						<div class="input-fluid">
							<input type="text" id="txt-create-edit-property-city" class="filters-text-input validate city" placeholder="Indtast by her.." name="txt-property-city">
						</div>
						<div class="search-desc">Indtast kommune</div>
						<div class="input-fluid">
							<input type="text" id="txt-create-edit-property-region" class="filters-text-input municipality validate" placeholder="Indtast kommune her.." name="txt-property-municipality">
						</div>

						<div  class="search-desc">Vælg postnummer</div>
						<select id="select-create-edit-property-zipcode" class="dropdown zipcode-dropdown zipcode validate" name="txt-property-zipcode">
							<option value="" selected>Vælg postnummer her..</option>

						</select>

						<div  class="search-desc">Vælg region</div>
						<select id="select-create-edit-property-region" class="dropdown region-dropdown validate region" name="txt-property-region">
							<option value="" selected>Vælg region her..</option>

						</select>

					</div>

					<div class="filter-head">Pris</div>
					<div class="filter-body">
						<div class="search-desc">Indtast pris</div>
						<div class="input-fluid">
							<input id="txt-create-edit-property-price" type="text" class="filters-text-input validate price" placeholder="Indtast pris her.." name="txt-property-price">
						</div>
					</div>

					<div class="filter-head">Opret/Rediger</div>
					<div class="filter-body">

						<div class="input-fluid">
							<button type="button" id="btn-create-edit-property" class="btn filters-submit-button link">Submit</button>
							<button data-go-to="wdw-properties-admin" type="button" class="btn link filters-back-button"> Back</button>
						</div>
					</div>

				</div>
			</div>
			<div class="property-create-edit-contet">
				<div class="property-table-header">Tilføj Billeder</div>
				<div class="add-img-container" id="add-img">
					
				</div>

				<div class="property-table-header">Tilføj Position</div>
				<div class="filter-body">
					<div class="search-desc">Indtast længegrad</div>
					<div class="input-fluid">
						<input id="txt-create-edit-property-long" type="text" class="filters-text-input" placeholder="Indtast længegrad her.." name="txt-property-long">
					</div>
					<div class="search-desc">Indtast breddegrad</div>
					<div class="input-fluid">
						<input id="txt-create-edit-property-lat" type="text" class="filters-text-input" placeholder="Indtast breddegrad her.." name="txt-property-lat">
					</div>
				</div>

			</div>
		</form>
	</div>

</div>


