$(document).ready(function () {
    var isCodeData = false;
    var isTimePriceData = false;
    var isStartTimeData = false;
    var isEndTimeData = false;

    function serializeCourtsData() {
        var codesData = [];
        $(".codes-input").each(function () {
            codesData.push($(this).val());
        });

        if (codesData.length > 0 && codesData[0].trim() !== "") {
            isCodeData = true;
        } else {
            isCodeData = false;
        }
        return JSON.stringify(codesData);
    }

    // Function to add a new codes row
    function addCodesRow(courtName) {
        var newRowId = "row-" + ($("#codes-container").children().length + 1);
        var newRow =
            '<div class="d-flex align-items-center mb-2" id="' +
            newRowId +
            '">' +
            '<input class="custom-input-width me-3 form-control codes-input" type="text" name="codes[]"  id="codes-' +
            newRowId +
            '" placeholder="Enter code" value="' +
            (courtName || "") +
            '" required maxlength="5">' +
            '<button  type="button" class="btn btn-danger cross-btn mx-3 btn-sm delete-row" data-row-id="' +
            newRowId +
            '">' +
            '<i class="fa-solid fa-xmark"></i>' +
            "</button>" +
            "</div>";

        $("#codes-container").append(newRow);
    }

    // Check if initial data exists
    var codesData = $("#codesArray").val();
    if (codesData) {
        try {
            var codesDataArray = JSON.parse(codesData);

            if (Array.isArray(codesDataArray)) {
                codesDataArray.forEach(function (code) {
                    addCodesRow(code.code);
                });
            }
        } catch (error) {
            console.error("Error parsing codeData:", error);
        }
    }

    // Remove row button click event (event delegation for dynamically added buttons)
    $("#codes-container").on("click", ".delete-row", function () {
        var rowId = $(this).data("row-id");
        $("#" + rowId).remove();
    });

    // Add courts row when add button is clicked
    $("#addCodesButton").on("click", function () {
        addCodesRow();
    });

    $("#my-form").submit(function (event) {
        event.preventDefault();

        // Clear any previous error messages
        $("#codes-error").attr("hidden", true);
        // Perform AJAX request to submit the form data
        $.ajax({
            url: $(this).attr("action"),
            type: "POST",
            data: new FormData(this),
            processData: false,
            contentType: false,
            success: function (response) {
                $("#codes-error").attr("hidden", true);
                alert(response.message);
            },
            error: function (xhr, status, error) {
                // If the request fails, display validation errors

                var errorMessage = xhr.responseJSON.error;

                $("#codes-error").text(errorMessage).removeAttr("hidden");
            },
        });
    });
});
