$(document).ready(function () {
	var table;

	function addAppointment(data) {
		var settings = {
			async: true,
			crossDomain: true,
			url: "appointment",
			method: "POST",
			headers: {
				"content-type": "application/json",
				"cache-control": "no-cache",
				"postman-token": "2612534b-9ccd-ab7e-1f73-659029967199",
			},
			processData: false,
			data: JSON.stringify(data),
		};

		$.ajax(settings).done(function (response) {
			$.notify("Appointment Added Successfully", { status: "success" });

			$(".modal.in").modal("hide");
			table.destroy();
			$("#datatable4 tbody").empty(); // empty in case the columns change
			getAppointment();
		});
	}

	function deleteAppointment(id) {
		var settings = {
			async: true,
			crossDomain: true,
			url: "appointment/" + id,
			method: "DELETE",
			headers: {
				"cache-control": "no-cache",
				"postman-token": "28ea8360-5af0-1d11-e595-485a109760f2",
			},
		};

		swal(
			{
				title: "Are you sure?",
				text: "You will not be able to recover this data",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes, delete it!",
				closeOnConfirm: false,
			},
			function () {
				$.ajax(settings).done(function (response) {
					swal("Deleted!", "Appointment has been deleted.", "success");
					table.destroy();
					$("#datatable4 tbody").empty(); // empty in case the columns change
					getAppointment();
				});
			}
		);
	}

	function getAppointment() {
		var settings = {
			async: true,
			crossDomain: true,
			url: "appointment",
			method: "GET",
			headers: {
				"cache-control": "no-cache",
			},
		};

		$.ajax(settings).done(function (response) {
			// Adjust the response data structure before passing to DataTable
			for (i = 0; i < response.length; i++) {
				response[i].pat_fullname =
					response[i].pat_first_name + " " + response[i].pat_last_name;
				response[i].doc_fullname =
					response[i].doc_first_name + " " + response[i].doc_last_name;
			}

			table = $("#datatable4").DataTable({
				bDestroy: true,
				paging: true,
				ordering: true,
				info: true,
				aaData: response,
				aaSorting: [],
				columns: [
					{ data: "doc_fullname" }, // Correct reference for doctor name
					{ data: "pat_fullname" }, // Correct reference for patient name
					{ data: "appointment_date" }, // Correct reference for appointment date
					{
						data: "is_emergency",
						render: function (data, type, row) {
							return data ? "Yes" : "No"; // Display "Yes" or "No" for emergency
						},
					},
					{
						data: null,
						render: function (data, type, row) {
							return '<button class="btn-xs btn btn-danger delete-btn" type="button">Delete</button>';
						},
					},
				],
			});

			// Handle delete button click
			$("#datatable4 tbody").on("click", ".delete-btn", function () {
				var data = table.row($(this).parents("tr")).data();
				deleteAppointment(data.app_id);
			});
		});
	}

	$("#addpatient").click(function () {
		$("#myModal")
			.modal()
			.one("shown.bs.modal", function (e) {
				$("#doctor_select").html(doctorSelect);
				$("#patient_select").html(patientSelect);

				$(".form_datetime").datetimepicker({
					format: "yyyy-mm-dd hh:ii:ss",
					startDate: new Date(),
					initialDate: new Date(),
				});
				$("#savethepatient").click(function (e) {
					var instance = $("#detailform").parsley();
					instance.validate();
					if (instance.isValid()) {
						var jsondata = $("#detailform").serializeJSON();

						// Capture the emergency appointment status from the checkbox
						jsondata.is_emergency = $("#is_emergency").is(":checked");

						addAppointment(jsondata);
					}
				});
			});
	});

	var doctorSelect = "";
	function getDoctor() {
		var settings = {
			async: true,
			crossDomain: true,
			url: "doctor",
			method: "GET",
			headers: {
				"cache-control": "no-cache",
			},
		};

		$.ajax(settings).done(function (response) {
			for (i = 0; i < response.length; i++) {
				response[i].doc_fullname =
					response[i].doc_first_name + " " + response[i].doc_last_name;
				doctorSelect +=
					"<option value=" +
					response[i].doc_id +
					">" +
					response[i].doc_fullname +
					"</option>";
			}
		});
	}
	var patientSelect = "";
	function getPatient() {
		var settings = {
			async: true,
			crossDomain: true,
			url: "patient",
			method: "GET",
			headers: {
				"cache-control": "no-cache",
			},
		};

		$.ajax(settings).done(function (response) {
			for (i = 0; i < response.length; i++) {
				response[i].pat_fullname =
					response[i].pat_first_name + " " + response[i].pat_last_name;
				patientSelect +=
					"<option value=" +
					response[i].pat_id +
					">" +
					response[i].pat_fullname +
					"</option>";
			}
		});
	}

	getDoctor();
	getPatient();
	getAppointment();
});
