	<div id="wdw-create-edit-property" class="wdw">
		<h1>
			Create/Edit property
		</h1>

		<form id="frm-create-edit-user" method="post">

			<!-- <input type="hidden" id="txt-create-edit-id" name="txt-user-id" /> -->

			<div class="input-container">
				<span class="fa fa-location-arrow"></span>
				<input class="txt-input" id="txt-create-edit-address" placeholder="Address" type="text" name="txt-address">
			</div>
			<hr>

			<div class="input-container">
				<span class="fa fa-money"></span>
				<input class="txt-input" id="txt-create-edit-price" placeholder="Price" type="text" name="txt-price">
			</div>
			

		</form>


		<a data-go-to="wdw-properties-admin" type="button" id="btn-create-edit-property" class="btn link">Submit</a>
		<a data-go-to="wdw-properties-admin" type="button" class="btn link"> Back</a>
	</div>