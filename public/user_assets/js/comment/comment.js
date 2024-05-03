$(document).ready(function () {
    // after clicking post comment button
    $("#comment-post-btn").on("click", function () {
        if (validateCommentBoxForm()) {
            $("#comment-post-btn").hide();
            $("#loadingSubmittingBtn").removeAttr("hidden");

            var form = $("#comment-box-form");
            var formData = form.serialize();
            var actionUrl = form.data("action");

            $.ajax({
                url: actionUrl,
                type: form.attr("method"),
                data: formData,
                success: function (response) {
                    $("#comment-post-btn").show();
                    $("#loadingSubmittingBtn").attr("hidden", true);
                    toastr.success("You have posted a comment.");
                    $("#comment").val("");
                    $("#name").val("");

                    // Parse the response JSON
                    var comment = response.comment;
                    var createdAt = new Date(comment.created_at);
                    var formattedDate =
                        createdAt.getDate() +
                        " " +
                        monthNames[createdAt.getMonth()] +
                        ", " +
                        createdAt.getFullYear();

                    // Construct the HTML for the new comment
                    var newCommentHtml =
                        "<div class='comment mb-3'>" +
                        "<h4>" +
                        comment.author_name +
                        "</h4>" +
                        "<span>- " +
                        formattedDate +
                        "</span>" +
                        "<br>" +
                        "<p>" +
                        comment.text +
                        "</p>" +
                        "</div>";

                    // Append the new comment HTML to the container
                    $(".comments-container").prepend(newCommentHtml);
                },
                error: function (xhr, status, error) {
                    var response = xhr.responseJSON;
                    toastr.error(response.message);

                    $("#comment-post-btn").show();
                    $("#loadingSubmittingBtn").attr("hidden", true);
                },
            });
        }
    });

    // validate comment box form
    function validateCommentBoxForm() {
        var comment = $("#comment").val();
        var name = $("#name").val();

        // Reset error messages and border colors
        $("#comment_error", "#name_error").text("");
        $("#comment", "#name").css("border-color", "");

        if (!comment) {
            $("#comment_error")
                .text("Comment is required.")
                .css("color", "red");
            $("#comment").css("border-color", "red");
        } else if (comment.length > 255) {
            $("#comment_error")
                .text("Comment cannot exceed 255 characters")
                .css("color", "red");
            $("#comment").css("border-color", "red");
        }

        if (!name) {
            $("#name_error").text("Name is required.").css("color", "red");
            $("#name").css("border-color", "red");
        } else if (name.length > 255) {
            $("#name_error")
                .text("Name cannot exceed 255 characters")
                .css("color", "red");
            $("#name").css("border-color", "red");
        } else if (!/^[a-zA-Z\s]+$/.test($(name).val())) {
            $("#name_error")
                .text("Name should contain only letters")
                .css("color", "red");
            $("#name").css("border-color", "red");
        }

        // Check if there are any errors
        if ($("#comment_error").text() || $("#name_error").text()) {
            return false;
        }

        // Set the values if they are valid
        $("#comment").val(comment);
        $("#name").val(name);

        return true;
    }

    // comment field  error handeling on changing
    $("body").on("input", "#comment", function () {
        var comment = $(this).val();

        if (!comment) {
            $("#comment_error")
                .text("Comment is required.")
                .css("color", "red");
            $("#comment").css("border-color", "red");
        } else if (comment.length > 255) {
            $("#comment_error")
                .text("Comment cannot exceed 255 characters")
                .css("color", "red");
            $("#comment").css("border-color", "red");
        } else {
            $("#comment_error").text("");
            $("#comment").css("border-color", "");
        }

        if (comment) {
            $(this).val(comment);
        } else {
            $(this).val("");
        }
    });

    // name field  error handeling on changing
    $("body").on("input", "#name", function () {
        var name = $(this).val();

        if (!name) {
            $("#name_error").text("Name is required.").css("color", "red");
            $("#name").css("border-color", "red");
        } else if (name.length > 255) {
            $("#name_error")
                .text("Name cannot exceed 255 characters")
                .css("color", "red");
            $("#name").css("border-color", "red");
        } else if (!/^[a-zA-Z\s]+$/.test($(name).val())) {
            $("#name_error")
                .text("Name should contain only letters")
                .css("color", "red");
            $("#name").css("border-color", "red");
        } else {
            $("#name_error").text("");
            $("#name").css("border-color", "");
        }

        if (name) {
            $(this).val(name);
        } else {
            $(this).val("");
        }
    });

    // all months name below
    var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
});
