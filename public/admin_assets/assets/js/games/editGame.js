$(document).ready(function () {
    // Function to serialize court data
    var timePricesData = JSON.parse($("#time_prices_arr").val());
    if (timePricesData.length > 0) {
        renderTimePricesInitial(timePricesData);
        $("#addTimeAreaButton").removeAttr("hidden");
    } else {
        addEmptyTimeRow();
        $("#timeFields").hide();
        $("#addTimeAreaButton").removeAttr("hidden");
    }

    if ($("#time_price_exist").val() == 1) {
        $("#is_time_price").prop("checked", true);
        $("#timeFields").show();
    }

    var isCourtData = false;
    var isTimePriceData = false;
    var isStartTimeData = false;
    var isEndTimeData = false;

    function serializeCourtsData() {
        var courtsData = [];
        $(".courts-input").each(function () {
            courtsData.push($(this).val());
        });
        console.log("courtsData", courtsData);
        if (courtsData.length > 0 && courtsData[0].trim() !== "") {
            isCourtData = true;
        } else {
            isCourtData = false;
        }
        return JSON.stringify(courtsData);
    }

    function serializeTimePriceData() {
        var timePriceData = [];
        $(".time-price").each(function () {
            timePriceData.push($(this).val());
        });

        if (timePriceData.length > 0 && timePriceData[0].trim() !== "") {
            isTimePriceData = true;
        } else {
            isTimePriceData = false;
        }
        return timePriceData;
    }

    function serializeStartTimeData() {
        var startTimeData = [];
        $(".start-time").each(function () {
            startTimeData.push($(this).val());
        });
        console.log("startTimeData", startTimeData);
        if (startTimeData.length > 0 && startTimeData[0].trim() !== "") {
            isStartTimeData = true;
        } else {
            isStartTimeData = false;
        }

        return startTimeData;
    }

    function serializeEndTimeData() {
        var endTimeData = [];
        $(".end-time").each(function () {
            endTimeData.push($(this).val());
        });

        if (endTimeData.length > 0 && endTimeData[0].trim() !== "") {
            isEndTimeData = true;
        } else {
            isEndTimeData = false;
        }

        return endTimeData;
    }

    // Add click event listener to submit button
    $("#submitButton").on("click", function () {
        serializeCourtsData();
        serializeTimePriceData();
        serializeStartTimeData();
        serializeEndTimeData();

        // Serialize the form data
        if (isCourtData == false) {
            $("#courts-error")
                .text("Minimum one court is required.")
                .removeAttr("hidden");
        } else {
            $("#courts-error").attr("hidden", true);
        }

        if ($("#is_time_price").prop("checked")) {
            if (isTimePriceData == false) {
                $("#time-error")
                    .text("Time-based price is required.")
                    .removeAttr("hidden");
            } else {
                $("#time-error").attr("hidden", true);
            }

            if (isStartTimeData == false) {
                $("#start-time-error")
                    .text("Start time is required.")
                    .removeAttr("hidden");
            } else {
                $("#start-time-error").attr("hidden", true);
            }

            if (isEndTimeData == false) {
                $("#end-time-error")
                    .text("End time is required.")
                    .removeAttr("hidden");
            } else {
                $("#end-time-error").attr("hidden", true);
            }
        }
        console.log(
            "isTimePriceData",
            isTimePriceData,
            isStartTimeData,
            isEndTimeData
        );
        if (
            !isCourtData ||
            ($("#is_time_price").prop("checked") &&
                (isTimePriceData == false ||
                    isStartTimeData == false ||
                    isEndTimeData == false))
        ) {
            return;
        }

        if ($("#is_time_price").prop("checked")) {
            var isTimePrice = 1;
        } else {
            var isTimePrice = 0;
        }
        var formData = {
            _token: $("input[name='_token']").val(),
            _method: $("input[name='_method']").val(),
            name: $("#name").val(),
            normal_price: $("#normal_price").val(),
            holiday_price: $("#holiday_price").val(),
            time_price: serializeTimePriceData(),
            is_time_price: isTimePrice,
            start_time: serializeStartTimeData(),
            end_time: serializeEndTimeData(),
            courts: serializeCourtsData(),
        };

        // Submit the form
        $.ajax({
            url: $("#gameForm").attr("action"),
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                location.reload();
            },
            error: function (xhr, status, error) {
                var errors = xhr.responseJSON.errors;
                $.each(errors, function (key, value) {
                    console.log("errors", key);

                    $("#" + key)
                        .siblings(".error-msg")
                        .text(value[0]);
                    // Remove hidden attribute
                    $("#" + key)
                        .siblings(".error-msg")
                        .removeAttr("hidden");
                    $("#" + key).css("border-color", "red");
                });
            },
        });
    });

    // Function to add a new courts row
    function addCourtsRow(courtName) {
        var newRowId = "row-" + ($("#courts-container").children().length + 1);
        var newRow =
            '<div class="d-flex align-items-center mb-2" id="' +
            newRowId +
            '">' +
            '<input class="custom-input-width me-3 form-control courts-input" type="text" name="courts[]"  id="courts-' +
            newRowId +
            '" placeholder="Enter court name" value="' +
            (courtName || "") +
            '" required>' +
            '<button  type="button" class="btn btn-danger cross-btn mx-3 btn-sm delete-row" data-row-id="' +
            newRowId +
            '">' +
            '<i class="fa-solid fa-xmark"></i>' +
            "</button>" +
            "</div>";

        $("#courts-container").append(newRow);
    }

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

    // Function to render time prices initially
    function renderTimePricesInitial(timePricesData) {
        if (timePricesData.length > 0) {
            timePricesData.forEach(function (data) {
                var newRowId =
                    "row-" + ($("#timeFields").children().length + 1);

                var newRow =
                    '<div class="row">' +
                    '<div class="col">' +
                    '<div class="form-group">' +
                    '<label>Time-Based Price<sup style="color:red;">(*)</sup></label>' +
                    '<input type="text" class="form-control time-price" placeholder="ex. 45.00" name="time_price[]" required value="' +
                    data.price +
                    '">' +
                    '<div class="alert alert-danger mt-1 error-msg" id="time-error" hidden></div>' +
                    "</div>" +
                    "</div>" +
                    '<div class="col">' +
                    '<div class="form-group">' +
                    '<label for="start_time">Start Time<sup style="color:red;">(*)</sup></label>' +
                    '<input type="time" class="form-control start-time" name="start_time[]" required value="' +
                    data.start_time +
                    '">' +
                    '<div class="alert alert-danger mt-1 error-msg" id="start-time-error" hidden></div>' +
                    "</div>" +
                    "</div>" +
                    '<div class="col">' +
                    '<div class="form-group">' +
                    '<label for="end_time">End Time<sup style="color:red;">(*)</sup></label>' +
                    '<input type="time" class="form-control end-time" name="end_time[]" required value="' +
                    data.end_time +
                    '">' +
                    '<div class="alert alert-danger mt-1 error-msg" id="end-time-error" hidden></div>' +
                    '<button type="button" class="btn btn-danger cross-btn btn-sm delete-row" data-row-id="' +
                    newRowId +
                    '">' +
                    '<i class="fa-solid fa-xmark"></i>' +
                    "</button>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                // Append the new row to the container
                $("#timeFields").append(newRow);
            });
        }
    }

    function addEmptyTimeRow() {
        var newRowId = "row-" + ($("#timeFields").children().length + 1); // Generate unique row ID

        var newRow =
            '<div class="row">' +
            '<div class="col">' +
            '<div class="form-group">' +
            '<label>Time-Based Price<sup style="color:red;">(*)</sup></label>' +
            '<input type="text" class="form-control time-price" placeholder="ex. 45.00" name="time_price[]" required>' +
            '<div class="alert alert-danger mt-1 error-msg" id="time-error" hidden></div>' +
            "</div>" +
            "</div>" +
            '<div class="col">' +
            '<div class="form-group">' +
            '<label for="start_time">Start Time<sup style="color:red;">(*)</sup></label>' +
            '<input type="time" class="form-control start-time" name="start_time[]" required>' +
            '<div class="alert alert-danger mt-1 error-msg" id="start-time-error" hidden></div>' +
            "</div>" +
            "</div>" +
            '<div class="col">' +
            '<div class="form-group">' +
            '<label for="end_time">End Time<sup style="color:red;">(*)</sup></label>' +
            '<div class="d-flex align-items-center">' +
            '<input type="time" class="form-control end-time" name="end_time[]" required>' +
            '<div class="alert alert-danger mt-1 error-msg" id="end-time-error" hidden></div>' +
            '<button type="button" class="ml-3 btn btn-danger cross-btn btn-sm delete-row" data-row-id="' +
            newRowId +
            '">' +
            '<i class="fa-solid fa-xmark"></i>' +
            "</button>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";

        // Append the new row to the container
        $("#timeFields").append(newRow);
    }

    // Check if initial data exists
    var courtsData = $("#courtsArray").val();
    if (courtsData) {
        try {
            var courtsDataArray = JSON.parse(courtsData);

            if (Array.isArray(courtsDataArray)) {
                courtsDataArray.forEach(function (court) {
                    addCourtsRow(court.name);
                });
            }
        } catch (error) {
            console.error("Error parsing courtsData:", error);
        }
    }

    // Remove row button click event (event delegation for dynamically added buttons)
    $("#courts-container").on("click", ".delete-row", function () {
        var rowId = $(this).data("row-id");
        $("#" + rowId).remove();
    });

    // Add courts row when add button is clicked
    $("#addCourtsButton").on("click", function () {
        addCourtsRow();
    });

    $("#addTimeAreaButton").click(function () {
        addEmptyTimeRow();
        $("#is_time_price").prop("checked", true);
    });

    $("#is_time_price").change(function () {
        if (this.checked) {
            $("#addTimeAreaButton").removeAttr("hidden");
            $("#timeFields").show();
            if ($("#timeFields .row").length === 0) {
                addEmptyTimeRow();
            }
        } else {
            $("#timeFields").hide();
            $("#addTimeAreaButton").attr("hidden", "hidden");
        }
    });
});
