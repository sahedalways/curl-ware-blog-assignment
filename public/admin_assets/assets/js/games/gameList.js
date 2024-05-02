// Function to serialize court data
$(document).ready(function () {
    $(".time-price-checkbox").change(function () {
        var isChecked = $(this).is(":checked") ? 1 : 0;
        var gameId = $(this).data("game-id");
        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        // Send AJAX request
        $.ajax({
            url: "/games/time-base-price-status",
            type: "POST",
            data: {
                isChecked: isChecked,
                gameId: gameId,
            },
            headers: {
                "X-CSRF-TOKEN": csrfToken, // Include CSRF token in the headers
            },
            success: function (response) {
                toastr.success(response.message);
            },
            error: function (xhr, status, error) {
                // Handle error response
                toastr.error(error.message);
            },
        });
    });

    $(".view-price-btn").click(function () {
        $("#priceModalBody").empty(); // Clear previous data

        // Get the index of the clicked button

        var timeBasePriceData = $(this).data("time-base-price");

        // Check if timesData is an array and contains data
        if (timeBasePriceData.length > 0) {
            // Clear previous content
            $("#priceModalBody").empty();

            // Iterate over each time base price data
            timeBasePriceData.forEach(function (timeBasePrice) {
                var price = parseFloat(timeBasePrice["price"]).toFixed(2);
                var startTime = timeBasePrice["start_time"];
                var endTime = timeBasePrice["end_time"];
                var timeRange = startTime + " - " + endTime;

                // Append the price details to the modal body
                $("#priceModalBody").append(
                    "<tr>" +
                        "<td>$" +
                        price +
                        "</td>" +
                        "<td>" +
                        timeRange +
                        "</td>" +
                        "</tr>"
                );
            });
        }
    });
});
