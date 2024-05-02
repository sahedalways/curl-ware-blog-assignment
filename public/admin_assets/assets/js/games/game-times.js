$(document).ready(function () {
    $(".game-time-checkbox").change(function () {
        var itemId = $(this).data("item-id");
        var isChecked = $(this).prop("checked");
        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        // Send AJAX request to update is_enabled attribute
        $.ajax({
            url: "/update-time-status",
            method: "POST",
            data: {
                itemId: itemId,
                isChecked: isChecked ? 1 : 0,
            },
            headers: {
                "X-CSRF-TOKEN": csrfToken, // Include CSRF token in the headers
            },
            success: function (response) {
                toastr.success(response.message);
            },
            error: function (xhr, status, error) {
                toastr.error(error.message);
            },
        });
    });
});
