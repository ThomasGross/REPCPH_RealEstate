
<div id="wdw-properties-admin" class="wdw">

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

					<select class="dropdown zipcode-dropdown" name="txt-user-role">
						<option value="" disabled selected>Select your option...</option>
					</select>

				</div>
			</form>

			<div class="filter-head">Tilføj ny egendom</div>
			<div class="filter-body">
				<button type="button" class="filters-search-button full-width link" data-go-to="wdw-create-edit-property">Opret</button>
			</div>
		</div>
		<div class="property-table-container">
			<div class="property-table-header">Search Results</div>
			<div class="property-table-navigation">
				<div class="box box-property-nav">
					<div class="btn-group btn-group-property-nav">
						<button type="button" class="btn btn-active link" data-go-to="wdw-properties-admin">Liste</button>
						<button type="button" class="btn">Galleri</button>
						<button type="button" class="btn link" data-go-to="wdw-property-map">Kort</button>
					</div>

					<div class="dropdown-property-per-page">
						<div class="dropdown-decript">Vis pr. side</div>
						<select class="dropdown dropdown-property-per-page" name="txt-user-role">
							<option value="2600">30</option>
							<option value="admin">60</option>
							<option value="superadmin">90</option>
						</select>
					</div>

					<div class="page-navigation btn-group">
						<button type="button" class="btn"><</button>
						<div class="page-navigation-info">side * af *</div>
						<button type="button" class="btn">></button>
					</div>

				</div>
			</div>
			<table id="property-table-admin"></table>
		</div>
	</div>
</div>
