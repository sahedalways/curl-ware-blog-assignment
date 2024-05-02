$(document).ready(function () {
    addCourtsRow();

    if ($("#is_time_price").prop("checked")) {
        if ($("#timeFields .row").length === 0) {
            addTimeRow();
        }
        $("#timeFields").show();
        $("#addTimeAreaButton").removeAttr("hidden");
    } else {
        $("#timeFields").hide();
        $("#addTimeAreaButton").attr("hidden", "hidden");
    }

    // Add row button click event
    $("#addCourtsButton").on("click", function () {
        addCourtsRow();
    });

    // Remove row button click event (event delegation for dynamically added buttons)
    $("#courts-container").on("click", ".delete-row", function () {
        var rowId = $(this).data("row-id");
        $("#" + rowId).remove();
    });

    // Function to add a new courts row
    function addCourtsRow() {
        var newRowId = "row-" + ($("#courts-container").children().length + 1);
        var newRow =
            '<div class="d-flex align-items-center mb-2" id="' +
            newRowId +
            '">' +
            '<input required class="custom-input-width me-3 form-control courts-input" type="text" name="courts[]"  id="courts-' +
            newRowId +
            '" placeholder="Enter court name">' +
            '<button  type="button" class="btn btn-danger cross-btn btn-sm delete-row ml-3" data-row-id="' +
            newRowId +
            '">' +
            '<i class="fa-solid fa-xmark"></i>' +
            "</button>" +
            "</div>";

        $("#courts-container").append(newRow);
    }

    // for adding new row of time base price
    $("#addTimeAreaButton").click(function () {
        addTimeRow();
    });

    $("#timeFields").on("click", ".delete-row", function () {
        $(this).closest(".row").remove();

        if ($("#timeFields .row").length === 0) {
            $("#is_time_price").prop("checked", false);
            $("#addTimeAreaButton").attr("hidden", "hidden");
        } else {
            $("#is_time_price").prop("checked", true);
            $("#addTimeAreaButton").removeAttr("hidden");
        }
    });

    // Function to add a new row with time-based fields
    function addTimeRow() {
        var newRowId = "row-" + ($("#timeFields").children().length + 1);

        var newRow =
            '<div class="row">' +
            '<div class="col">' +
            '<div class="form-group">' +
            '<label>Time-Based Price<sup style="color:red;">(*)</sup></label>' +
            '<input type="text" class="form-control time-price" placeholder="ex. 45.00" name="time_price[]" required>' +
            '<div class="alert alert-danger mt-1 error-message" style="display: none;"></div>' +
            "</div>" +
            "</div>" +
            '<div class="col">' +
            '<div class="form-group">' +
            '<label for="start_time">Start Time<sup style="color:red;">(*)</sup></label>' +
            '<input type="time" class="form-control start-time" name="start_time[]" required>' +
            '<div class="alert alert-danger mt-1 error-message" style="display: none;"></div>' +
            "</div>" +
            "</div>" +
            '<div class="col">' +
            '<div class="form-group d-flex align-items-end">' +
            "<div class='w-100'>" +
            '<label for="end_time">End Time<sup style="color:red;">(*)</sup></label>' +
            '<input type="time" class="form-control end-time" name="end_time[]" required>' +
            "</div>" +
            '<div class="alert alert-danger mt-1 error-message" style="display: none;">' +
            "</div>" +
            '<button type="button" class="btn btn-danger cross-btn btn-sm delete-row ml-3 mb-2" data-row-id="' +
            newRowId +
            '">' +
            '<i class="fa-solid fa-xmark"></i>' +
            "</button>" +
            "</div>" +
            "</div>" +
            "</div>";

        // Append the new row to the container
        $("#timeFields").append(newRow);
    }

    $("#is_time_price").change(function () {
        if (this.checked) {
            if ($("#timeFields .row").length === 0) {
                addTimeRow();
            }
            $("#timeFields").show();
            $("#addTimeAreaButton").removeAttr("hidden");
        } else {
            $("#timeFields").hide();
            $("#addTimeAreaButton").attr("hidden", "hidden");
        }
    });
});
