// $(document).ready(function () {
// 	var table;

// 	function addDoctor(data) {
// 		var settings = {
// 			async: true,
// 			crossDomain: true,
// 			url: "doctor",
// 			method: "POST",
// 			headers: {
// 				"content-type": "application/json",
// 				"cache-control": "no-cache",
// 				"postman-token": "2612534b-9ccd-ab7e-1f73-659029967199",
// 			},
// 			processData: false,
// 			data: JSON.stringify(data),
// 		};

// 		$.ajax(settings).done(function (response) {
// 			$(".modal.in").modal("hide");
// 			$.notify("Doctor Added Successfully", { status: "success" });
// 			table.destroy();
// 			$("#datatable4 tbody").empty(); // empty in case the columns change
// 			getDoctor();
// 		});
// 	}

// 	function deleteDoctor(id) {
// 		var settings = {
// 			async: true,
// 			crossDomain: true,
// 			url: "doctor/" + id, // Ensure the URL is correct and includes the doctor id
// 			method: "DELETE",
// 			headers: {
// 				"cache-control": "no-cache",
// 				"postman-token": "28ea8360-5af0-1d11-e595-485a109760f2",
// 			},
// 		};

// 		swal(
// 			{
// 				title: "Are you sure?",
// 				text: "You will not be able to recover this data",
// 				type: "warning",
// 				showCancelButton: true,
// 				confirmButtonColor: "#DD6B55",
// 				confirmButtonText: "Yes, delete it!",
// 				closeOnConfirm: false,
// 			},
// 			function () {
// 				$.ajax(settings).done(function (response) {
// 					swal("Deleted!", "Doctor has been deleted.", "success");
// 					table.destroy();
// 					$("#datatable4 tbody").empty(); // empty in case the columns change
// 					getDoctor(); // Refresh the table after deletion
// 				});
// 			}
// 		);
// 	}

// 	function updateDoctor(data, id) {
// 		var settings = {
// 			async: true,
// 			crossDomain: true,
// 			url: "doctor/" + id,
// 			method: "PUT",
// 			headers: {
// 				"content-type": "application/json",
// 				"cache-control": "no-cache",
// 			},
// 			processData: false,
// 			data: JSON.stringify(data),
// 		};

// 		$.ajax(settings).done(function (response) {
// 			$.notify("Doctor Updated Successfully", { status: "success" });
// 			$(".modal.in").modal("hide");
// 			table.destroy();
// 			$("#datatable4 tbody").empty(); // empty in case the columns change
// 			getDoctor();
// 		});
// 	}

// 	function getDoctor() {
// 		var settings = {
// 			async: true,
// 			crossDomain: true,
// 			url: "doctor",
// 			method: "GET",
// 			headers: {
// 				"cache-control": "no-cache",
// 			},
// 		};

// 		// $.ajax(settings).done(function (response) {
// 		// 	table = $("#datatable4").DataTable({
// 		// 		bDestroy: true,
// 		// 		paging: true, // Table pagination
// 		// 		ordering: true, // Column ordering
// 		// 		info: true, // Bottom left status text
// 		// 		aaData: response,
// 		// 		aaSorting: [],
// 		// 		aoColumns: [
// 		// 			{
// 		// 				mData: "doc_first_name",
// 		// 			},
// 		// 			{
// 		// 				mData: "doc_last_name",
// 		// 			},
// 		// 			{
// 		// 				mData: "doc_address",
// 		// 			},
// 		// 			{
// 		// 				mData: "doc_ph_no",
// 		// 			},

// 		// 			{
// 		// 				mRender: function (o) {
// 		// 					return '<button class="btn-xs btn btn-info btn-edit" type="button">Edit</button>';
// 		// 				},
// 		// 			},
// 		// 			{
// 		// 				mRender: function (o) {
// 		// 					return '<button class="btn-xs btn btn-danger delete-btn" type="button">Delete</button>';
// 		// 				},
// 		// 			},
// 		// 		],
// 		// 	});
// 		// 	$("#datatable4 tbody").on("click", ".delete-btn", function () {
// 		// 		var data = table.row($(this).parents("tr")).data();
// 		// 		console.log(data);
// 		// 		deleteDoctor(data.doc_id);
// 		// 	});
// 		// 	$(".btn-edit").one("click", function (e) {
// 		// 		var data = table.row($(this).parents("tr")).data();
// 		// 		$("#myModal")
// 		// 			.modal()
// 		// 			.one("shown.bs.modal", function (e) {
// 		// 				for (var key in data) {
// 		// 					$("[name=" + key + "]").val(data[key]);
// 		// 				}
// 		// 				$("#savethepatient")
// 		// 					.off("click")
// 		// 					.on("click", function (e) {
// 		// 						var instance = $("#detailform").parsley();
// 		// 						instance.validate();
// 		// 						console.log(instance.isValid());
// 		// 						if (instance.isValid()) {
// 		// 							jsondata = $("#detailform").serializeJSON();
// 		// 							updateDoctor(jsondata, data.doc_id);
// 		// 						}
// 		// 					});
// 		// 			});
// 		// 	});
// 		// });
// 		$.ajax(settings).done(function (response) {
// 			console.log(response); // Log the response to ensure data is correct

// 			if ($.fn.DataTable.isDataTable("#datatable4")) {
// 				$("#datatable4").DataTable().destroy();
// 			}

// 			$("#datatable4").DataTable({
// 				data: response, // Use 'data' instead of 'aaData'
// 				paging: true, // Enable pagination
// 				ordering: true, // Enable column ordering
// 				info: true, // Enable info text
// 				columns: [
// 					// Define columns
// 					{ data: "doc_first_name" },
// 					{ data: "doc_last_name" },
// 					{ data: "doc_address" },
// 					{ data: "doc_ph_no" },
// 					{ data: "doc_specialty" },

// 					{
// 						data: null,
// 						render: function () {
// 							return '<button class="btn-xs btn btn-info btn-edit" type="button">Edit</button>';
// 						},
// 					},
// 					{
// 						data: null,
// 						render: function () {
// 							return '<button class="btn-xs btn btn-danger delete-btn" type="button">Delete</button>';
// 						},
// 					},
// 				],
// 			});
// 		});
// 	}

// 	$("#addpatient").click(function () {
// 		$("#myModal")
// 			.modal()
// 			.one("shown.bs.modal", function (e) {
// 				$("#savethepatient")
// 					.off("click")
// 					.on("click", function (e) {
// 						console.log("inn");
// 						var instance = $("#detailform").parsley();
// 						instance.validate();
// 						if (instance.isValid()) {
// 							jsondata = $("#detailform").serializeJSON();
// 							addDoctor(jsondata);
// 						}
// 					});
// 			});
// 	});

// 	getDoctor();
// });

$(document).ready(function () {
	var table;

	// Function to add a doctor
	function addDoctor(data) {
		$.ajax({
			url: "doctor",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function () {
				$("#myModal").modal("hide");
				$.notify("Doctor added successfully", { status: "success" });
				refreshTable();
			},
			error: function () {
				$.notify("Failed to add doctor", { status: "danger" });
			},
		});
	}

	// Function to delete a doctor
	function deleteDoctor(id) {
		swal(
			{
				title: "Are you sure?",
				text: "This action cannot be undone.",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes, delete it!",
				closeOnConfirm: false,
			},
			function () {
				$.ajax({
					url: "doctor/" + id,
					method: "DELETE",
					success: function () {
						swal("Deleted!", "Doctor has been deleted.", "success");
						refreshTable();
					},
					error: function () {
						swal("Error!", "Failed to delete doctor.", "error");
					},
				});
			}
		);
	}

	// Function to update a doctor
	function updateDoctor(data, id) {
		$.ajax({
			url: "doctor/" + id,
			method: "PUT",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function () {
				$.notify("Doctor updated successfully", { status: "success" });
				$("#myModal").modal("hide");
				refreshTable();
			},
			error: function () {
				$.notify("Failed to update doctor", { status: "danger" });
			},
		});
	}

	// Fetch doctors and populate the table
	function getDoctor() {
		$.ajax({
			url: "doctor",
			method: "GET",
			success: function (response) {
				if ($.fn.DataTable.isDataTable("#datatable4")) {
					table.destroy();
				}

				table = $("#datatable4").DataTable({
					data: response,
					columns: [
						{ data: "doc_first_name" },
						{ data: "doc_last_name" },
						{ data: "doc_specialty" },
						{ data: "doc_address" },
						{ data: "doc_ph_no" },
						{
							data: null,
							render: function () {
								return '<button class="btn-xs btn btn-info btn-edit" type="button">Edit</button>';
							},
						},
						{
							data: null,
							render: function () {
								return '<button class="btn-xs btn btn-danger delete-btn" type="button">Delete</button>';
							},
						},
					],
				});

				// Delegate event handlers for dynamically added buttons
				$("#datatable4 tbody").on("click", ".delete-btn", function () {
					var data = table.row($(this).parents("tr")).data();
					deleteDoctor(data.doc_id);
				});

				$("#datatable4 tbody").on("click", ".btn-edit", function () {
					var data = table.row($(this).parents("tr")).data();
					openEditModal(data);
				});
			},
			error: function () {
				$.notify("Failed to fetch doctors", { status: "danger" });
			},
		});
	}

	// Refresh table data
	function refreshTable() {
		getDoctor();
	}

	// Open modal to edit doctor details
	function openEditModal(data) {
		$("#myModal")
			.modal("show")
			.one("shown.bs.modal", function () {
				for (var key in data) {
					$("[name=" + key + "]").val(data[key]);
				}
				$("#savethepatient")
					.off("click")
					.on("click", function () {
						var instance = $("#detailform").parsley();
						instance.validate();
						if (instance.isValid()) {
							var jsondata = $("#detailform").serializeJSON();
							updateDoctor(jsondata, data.doc_id);
						}
					});
			});
	}

	// Open modal to add doctor
	$("#addpatient").click(function () {
		$("#myModal")
			.modal("show")
			.one("shown.bs.modal", function () {
				$("#detailform")[0].reset(); // Clear the form
				$("#savethepatient")
					.off("click")
					.on("click", function () {
						var instance = $("#detailform").parsley();
						instance.validate();
						if (instance.isValid()) {
							var jsondata = $("#detailform").serializeJSON();
							addDoctor(jsondata);
						}
					});
			});
	});

	// Initialize table on page load
	getDoctor();
});
