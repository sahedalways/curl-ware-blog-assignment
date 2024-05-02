var jqOld = jQuery.noConflict();

jqOld(document).ready(function () {
    $("#downloadReceiptBtn").click(function () {
        $("#messageModal").modal("hide");
    });

    var game_name = "";
    var game_price = null;
    var total_price = null;
    var tax = null;
    var start_time = "";
    var end_time = "";
    var courtsIds = "";
    var courtsNames = "";

    $('button[name="start_time"]').prop("disabled", true);
    $('button[name="end_time"]').prop("disabled", true);
    var timeSlots = null;
    $("#datepicker").focusout(function () {
        $("#datepicker").css("border-color", "");
        $("#date_error").addClass("d-none").text("");
    });

    jqOld("#datepicker").datepicker({
        dateFormat: "yy-mm-dd",
        minDate: 0,
        onSelect: function (dateText) {
            start_time = "";
            end_time = "";
            $("#dropdownMenuButton_3").text("Select Time");
            $("#dropdownMenuButton_2").text("Select Time");
            getAvailableTimes();
        },
    });
    function getAvailableTimes() {
        var date = $("#datepicker").val();
        if (date && game_name) {
            $.ajax({
                url: "/get-available-times/" + date + "/" + game_name,
                type: "GET",
                contentType: false,

                success: function (response) {
                    timeSlots = response;
                    updateDropdowns(response);
                },
                error: function (xhr, status, error) {
                    var response = xhr.responseJSON;
                    var errorMessage = response.error;
                    toastr.error(errorMessage);
                },
            });
        }
    }

    function updateDropdowns(response) {
        // Update start time dropdown
        var startTimeDropdown = $("#start_time_dropdown");
        startTimeDropdown.empty(); // Clear previous options
        $.each(response, function (index, time) {
            startTimeDropdown.append(
                '<li style="cursor: pointer"><a id="start_time" class="dropdown-item_2 dropdown-item" data-start-time="' +
                    time +
                    '">' +
                    time +
                    "</a></li>"
            );
        });

        // Update end time dropdown
        var endTimeDropdown = $("#end_time_dropdown");
        endTimeDropdown.empty(); // Clear previous options
        $.each(response, function (index, time) {
            endTimeDropdown.append(
                '<li style="cursor: pointer"><a id="end_time" class="dropdown-item dropdown-item_3" data-end-time="' +
                    time +
                    '">' +
                    time +
                    "</a></li>"
            );
        });

        // Enable the dropdowns
        $('button[name="start_time"]').prop("disabled", false);
        $('button[name="end_time"]').prop("disabled", false);
    }

    $(".list-group").on(
        "change",
        '.list-group-item input[type="checkbox"]',
        function () {
            // Call getCheckboxInfo() to get updated checkbox information
            var checkboxInfo = getCheckboxInfo();
            courtsIds = checkboxInfo.ids.join(",");
            courtsNames = checkboxInfo.names;

            var totalCost = game_price * checkboxInfo.checkedCount;
            var calculationTax = (totalCost * 13) / 100;
            var totalBasePrice = totalCost + calculationTax;

            $("#total_cost").text("$" + formatNumberWithCommas(totalCost));
            $("#total_base_price").text(
                "$" + formatNumberWithCommas(totalBasePrice)
            );
            $("#total_tax").text("$" + formatNumberWithCommas(calculationTax));

            tax = calculationTax;
            total_price = totalBasePrice;
        }
    );

    // Function to update the game_price based on the selected start and end times
    function updateGamePrice() {
        if (start_time && end_time) {
            // Calculate the difference between start and end times in slots
            var startSlot = timeSlots.indexOf(start_time);
            var endSlot = timeSlots.indexOf(end_time);
            var slotDifference = endSlot - startSlot;
            console.log("slotDifference", slotDifference);

            // Calculate additional price
            var additionalPrice = slotDifference * game_price;

            // Add additional price to game_price
            game_price = additionalPrice;
        }
    }

    $("#previous_btn").on("click", function () {
        $("#check_available_court").show();
        $("#loadingSubmittingCheckBtn").attr("hidden", true);
        $("#court_area").addClass("d-none");
        $("#check_availability_area").removeClass("d-none");
    });

    // fetch courts data
    $("#check_available_court").on("click", function () {
        if (validateCheckAvailabilityForm()) {
            $("#check_available_court").hide();
            $("#loadingSubmittingCheckBtn").removeAttr("hidden");
            $(".list-group-item").empty();

            console.log("end_time", end_time);

            // Get the input field values
            var date = $("#datepicker").val();
            console.log("game_name", game_name, date, start_time, end_time);

            // Create FormData to send data as multipart/form-data
            var formData = new FormData();
            formData.append("game_name", game_name);
            formData.append("date", date);
            formData.append("start_time", start_time);
            formData.append("end_time", end_time);

            var csrfToken = $('meta[name="csrf-token"]').attr("content");

            // AJAX request
            $.ajax({
                url: "/check-booking-condition",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
                success: function (response) {
                    var gamePrice = response.gamePrice;
                    $("#total_cost").text("$0.00");
                    $("#total_base_price").text("$0.00");
                    $("#total_tax").text("$0.00");

                    game_price = gamePrice;

                    if (game_price) {
                        updateGamePrice();
                    }
                    // Handle success response
                    $("#check_available_court").show();
                    $("#loadingSubmittingCheckBtn").attr("hidden", true);
                    $("#court_area").removeClass("d-none");
                    $("#check_availability_area").addClass("d-none");

                    for (var courtId in response.filteredCourts) {
                        if (response.filteredCourts.hasOwnProperty(courtId)) {
                            var court = response.filteredCourts[courtId];

                            // Generate HTML markup for each court
                            var html =
                                '<div class="d-flex w-100 justify-content-between">';
                            html += '<p class="mb-1">' + court.name + "</p>";
                            html +=
                                '<input id="court_check_item" class="form-check-input" type="checkbox" value="' +
                                court.id +
                                '" id="' +
                                court.id +
                                '">'; // Insert court ID
                            html += "</div>";

                            // Append the HTML markup to the container with class "list-group-item"
                            var $element = $(html);
                            $(".list-group-item").append($element);

                            // Uncheck the checkbox input field
                            $(".list-group-item")
                                .find('input[type="checkbox"]')
                                .prop("checked", false);

                            $element.on("click", function () {
                                // Toggle the checked state of the checkbox
                                var $checkbox = $(this).find(
                                    'input[type="checkbox"]'
                                );
                                $checkbox.prop(
                                    "checked",
                                    !$checkbox.prop("checked")
                                );

                                $checkbox.trigger("change");
                            });
                        }
                    }

                    $("#loadingSubmittingCheckBtn").attr("hidden", true);
                },
                error: function (xhr, status, error) {
                    var response = xhr.responseJSON;

                    var message = response.errors
                        ? Object.values(response.errors).flat().join("<br>")
                        : response.message || "Something went wrong.";

                    // Show the toast message using Toastr
                    toastr.options = {
                        positionClass: "toast-top-right",
                        preventDuplicates: true,
                        progressBar: true,
                        closeButton: true,
                    };
                    toastr.error(message);

                    $("#check_available_court").show();

                    $("#loadingSubmittingCheckBtn").attr("hidden", true);
                },
            });
        }
    });

    $("#book_court_btn").on("click", function () {
        if (
            validateCourtForm() &&
            validateCheckAvailabilityForm() &&
            validatePersonalInfoForm()
        ) {
            $("#book_court_btn").hide();
            $("#loadingCourtBook").removeAttr("hidden");
            var vipCode = $("#vip_code").val();
            var email = $("#email").val();
            var name = $("#name").val();
            var phone_number = $("#phone_number").val();

            // Get the input field values
            var date = $("#datepicker").val();

            // Create FormData to send data as multipart/form-data
            var formData = new FormData();
            formData.append("game_name", game_name);
            formData.append("date", date);
            formData.append("start_time", start_time);
            formData.append("end_time", end_time);
            formData.append("court_ids", courtsIds);
            formData.append("court_names", courtsNames);
            formData.append("game_price", total_price);
            formData.append("tax", tax);
            formData.append("vip_code", vipCode);
            formData.append("customer_email", email);
            formData.append("customer_name", name);
            formData.append("phone_number", phone_number);

            var csrfToken = $('meta[name="csrf-token"]').attr("content");

            // AJAX request
            $.ajax({
                url: "/admin/proceed-book",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                headers: {
                    "X-CSRF-TOKEN": csrfToken, // Include CSRF token in the headers
                },
                success: function (response) {
                    $("#messageModalBody .mt-3").html(
                        "Your booking has been confirmed.<br>A receipt will be sent to the provided email."
                    );

                    $("#messageModal").modal("show");

                    // Reload the page
                    setTimeout(function () {
                        downloadFile(response.pdf_content);
                    }, 3000);

                    $("#book_court_btn").show();
                    $("#loadingCourtBook").attr("hidden", true);
                },
                error: function (xhr, status, error) {
                    var response = xhr.responseJSON;

                    var message = response.error;

                    // Show the toast message using Toastr

                    toastr.error(message);

                    $("#book_court_btn").show();
                    $("#loadingCourtBook").attr("hidden", true);
                },
            });
        }
    });
    function validateCourtForm() {
        // Reset error messages and border colors
        $("#check_item_error").text("").addClass("d-none");
        var is_auth_exist = $("#isAuthExist").val();

        // Validate game name
        if (!courtsIds) {
            $("#check_item_error")
                .removeClass("d-none")
                .text("Minimum one court is mandatory.");

            return false;
        }

        if (!is_auth_exist) {
            var confirmed = window.confirm(
                "For booking, you have to login first. Do you want to login now?"
            );

            if (confirmed) {
                // Redirect to the login page
                window.location.href = "/login";
                return false;
            } else {
                return false;
            }
        }

        if ($("#check_item_error").text() && !is_auth_exist) {
            return false; // There are errors
        }

        return true; // No errors
    }

    // validate check availability form
    function validateCheckAvailabilityForm() {
        // Retrieve values from input elements
        var game_name = $("button[name='game_name']").text().trim();
        var date = $("#datepicker").val();
        var start_time = $("button[name='start_time']").text().trim();
        var end_time = $("button[name='end_time']").text().trim();
        var startTime24 = convertTo24HourFormat(start_time);
        var endTime24 = convertTo24HourFormat(end_time);

        console.log("start_time", start_time);
        // Reset error messages and border colors
        $("#game_name_error, #date_error, #start_time_error, #end_time_error")
            .text("")
            .addClass("d-none");

        // Validate game name
        if (game_name == "Select Game") {
            $("#game_name_error")
                .removeClass("d-none")
                .text("Please select a game.");
        }

        // Validate date
        if (!date) {
            $("#date_error")
                .removeClass("d-none")
                .text("Please select a date.");
        }

        // Validate start and end times
        if (start_time == "Select Time") {
            $("#start_time_error")
                .removeClass("d-none")
                .text("Please select start time.");
        } else if (end_time == "Select Time") {
            $("#end_time_error")
                .removeClass("d-none")
                .text("Please select end time.");
        } else if (
            startTime24 >= endTime24 &&
            !(startTime24 === "23:30" && endTime24 === "00:00")
        ) {
            $("#end_time_error")
                .removeClass("d-none")
                .text("End time must be greater than start time.");
        }

        // Check if there are any errors
        if (
            $("#game_name_error").text() ||
            $("#date_error").text() ||
            $("#start_time_error").text() ||
            $("#end_time_error").text()
        ) {
            return false; // There are errors
        }

        return true; // No errors
    }

    // Game name error handling
    $(".game_name").on("click", function () {
        var gameName = $(this).data("game-id");
        game_name = gameName;
        start_time = "";
        end_time = "";
        $("#dropdownMenuButton_3").text("Select Time");
        $("#dropdownMenuButton_2").text("Select Time");

        getAvailableTimes();

        if (!gameName) {
            $("#game_name_error")
                .removeClass("d-none")
                .text("Please select a game.");
        } else {
            $("#game_name_error").text("").addClass("d-none");
        }
    });
    // Start time error handling
    $("#start_time_dropdown").on("click", "#start_time", function () {
        var startTime = $(this).data("start-time");
        start_time = startTime;
        var end_time = $("button[name='end_time']").text().trim();
        var startTime24 = convertTo24HourFormat(start_time);
        var endTime24 = convertTo24HourFormat(end_time);
        $("#dropdownMenuButton_2").text(startTime);
        updateGamePrice();

        if (!startTime) {
            $("#start_time_error")
                .removeClass("d-none")
                .text("Please select start time.");
        } else if (
            startTime24 >= endTime24 &&
            !(startTime24 === "23:30" && endTime24 === "00:00")
        ) {
            $("#end_time_error")
                .removeClass("d-none")
                .text("End time must be greater than start time.");
        } else {
            $("#start_time_error").text("").addClass("d-none");
        }
    });

    // End time error handling
    $("#end_time_dropdown").on("click", "#end_time", function () {
        var endTime = $(this).data("end-time");
        var startTime24 = convertTo24HourFormat(start_time);
        var endTime24 = convertTo24HourFormat(endTime);
        $("#dropdownMenuButton_3").text(endTime);

        end_time = endTime;
        updateGamePrice();

        if (!endTime) {
            $("#end_time_error")
                .removeClass("d-none")
                .text("Please select end time.");
        } else if (
            startTime24 >= endTime24 &&
            !(startTime24 === "23:30" && endTime24 === "00:00")
        ) {
            $("#end_time_error")
                .removeClass("d-none")
                .text("End time must be greater than start time.");
        } else {
            $("#end_time_error").text("").addClass("d-none");
        }
    });

    // checkbox validate
    $(".list-group").on(
        "change",
        '.list-group-item input[type="checkbox"]',
        function () {
            // Check if the checkbox is checked
            if (courtsIds) {
                $("#check_item_error").text("").addClass("d-none");
            } else {
                $("#check_item_error")
                    .removeClass("d-none")
                    .text("Minimum one court is mandatory.");
            }
        }
    );

    function validatePersonalInfoForm() {
        var name = $("#name").val();
        var email = $("#email").val();
        var phone_number = $("#phone_number").val();
        var existError = false;

        // Reset error messages and border colors
        $("#name_error", "#email_error", "phone_number_error")
            .addClass("d-none")
            .text("");
        $("#email", "#name", "#phone_number").css("border-color", "");

        if (!isNaN(name)) {
            $("#name_error")
                .removeClass("d-none")
                .text("Name should not include a number.");
            $("#name").css("border-color", "red");
            existError = true;
        } else if (!name) {
            $("#name_error").removeClass("d-none").text("Name is required.");
            $("#name").css("border-color", "red");
            existError = true;
        }

        if (isNaN(phone_number)) {
            $("#phone_number_error")
                .removeClass("d-none")
                .text("Phone number should include only number.");
            $("#phone_number").css("border-color", "red");
            existError = true;
        } else if (!phone_number) {
            $("#phone_number_error")
                .removeClass("d-none")
                .text("Phone number is required.");
            $("#phone_number").css("border-color", "red");
            existError = true;
        } else if (phone_number.length > 15) {
            $("#phone_number_error")
                .removeClass("d-none")
                .text("Phone number should be maximum 15 characters long.");
            $("#phone_number").css("border-color", "red");
            existError = true;
        }

        if (!isValidEmail(email)) {
            $("#email_error")
                .removeClass("d-none")
                .text("Please enter a valid email address.");
            $("#email").css("border-color", "red");
            existError = true;
        } else if (!email) {
            $("#email_error").removeClass("d-none").text("Email is required.");
            $("#email").css("border-color", "red");
            existError = true;
        }

        // Check if there are any errors
        if (existError) {
            return false;
        }

        // Set the values if they are valid
        $("#email").val(email);
        $("#name").val(name);
        $("#phone_number").val(phone_number);
        // $("#password_confirmation").val(password_confirmation);

        return true;
    }

    // phone number error handeling
    $("body").on("input", "#phone_number", function () {
        var phone_number = $(this).val();

        if (isNaN(phone_number)) {
            $("#phone_number_error")
                .removeClass("d-none")
                .text("Phone number should only number character.");
            $("#phone_number").css("border-color", "red");
        } else {
            if (!phone_number) {
                $("#phone_number_error")
                    .removeClass("d-none")
                    .text("Phone number is required.");
                $("#phone_number").css("border-color", "red");
            } else {
                $("#phone_number_error").addClass("d-none").text("");
                $("#phone_number").css("border-color", "");
            }
        }

        if (phone_number) {
            $(this).val(phone_number);
        } else {
            $(this).val("");
        }
    });

    // name error handeling
    $("body").on("input", "#name", function () {
        var name = $(this).val();

        if (!isNaN(name)) {
            $("#name_error")
                .removeClass("d-none")
                .text("Name should not include number.");
            $("#name").css("border-color", "red");
        } else {
            if (!name) {
                $("#name_error")
                    .removeClass("d-none")
                    .text("Name is required.");
                $("#name").css("border-color", "red");
            } else {
                $("#name_error").addClass("d-none").text("");
                $("#name").css("border-color", "");
            }
        }

        if (name) {
            $(this).val(name);
        } else {
            $(this).val("");
        }
    });

    function isValidEmail(email) {
        // Regular expression for a simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // email error handeling
    $("body").on("input", "#email", function () {
        var email = $(this).val();

        if (!isValidEmail(email)) {
            $("#email_error")
                .removeClass("d-none")
                .text("Please enter a valid email address.");
            $("#email").css("border-color", "red");
        } else {
            if (!email) {
                $("#email_error")
                    .removeClass("d-none")
                    .text("Email is required.");
                $("#email").css("border-color", "red");
            } else {
                $("#email_error").addClass("d-none").text("");
                $("#email").css("border-color", "");
            }
        }

        if (email) {
            $(this).val(email);
        } else {
            $(this).val("");
        }
    });

    function getCheckboxInfo() {
        var ids = []; // Array to store checkbox IDs
        var checkedCount = 0; // Variable to count checked checkboxes
        var names = []; // Variable to count checked checkboxes

        // Loop through each checkbox
        $('.list-group-item input[type="checkbox"]').each(function () {
            // Get the ID of the checkbox
            var id = $(this).attr("value");
            var name = $(this).siblings("p.mb-1").text().trim();

            // Check if the checkbox is checked
            if ($(this).prop("checked")) {
                checkedCount++; // Increment checked count if checkbox is checked
                ids.push(id);
                names.push(name);
            }
        });

        // Return the array of IDs and the count of checked checkboxes
        return { ids: ids, checkedCount: checkedCount, names: names };
    }
});

function formatNumberWithCommas(number) {
    const formatter = new Intl.NumberFormat("en-IN", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const formattedNumber = formatter.format(number);

    return formattedNumber;
}

function convertTo24HourFormat(time) {
    if (time !== "Select Time") {
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "PM" && hours < 12) hours = hours + 12;
        if (AMPM == "AM" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        return sHours + ":" + sMinutes;
    }
}
// Add a delegated click event for the download links
function downloadFile(file) {
    // Remove the prefix from the filename
    console.log("file", file);
    var filename = file.replace("http://127.0.0.1:8000/storage/app/pdf/", "");

    // Hit the route with the filename
    var downloadUrl = "/admin/download-pdf/" + filename;
    console.log("downloadUrl", downloadUrl);
    window.open(downloadUrl, "_blank");
    location.reload();
}
