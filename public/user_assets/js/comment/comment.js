$(document).ready(function () {
    // after clicking edit comment button
    $("#comment-edit-submit-btn").on("click", function () {
        if (validateEditCommentBoxForm()) {
            $("#comment-edit-submit-btn").hide();
            $("#loadingEditSubmittingBtn").removeAttr("hidden");

            var form = $("#edit-comment-box-form");
            var formData = form.serialize();

            $.ajax({
                url: `/update-comment`,
                type: "post",
                data: formData,
                success: function (response) {
                    $("#comment-edit-submit-btn").show();
                    $("#loadingEditSubmittingBtn").attr("hidden", true);
                    toastr.success("Your comment has been updated.");

                    // Parse the response JSON
                    var comment = response.comment;

                    // Find the corresponding elements based on the comment ID
                    var authorNameElement = $(
                        `#author_name_text_${comment.id}`
                    );
                    var commentTextElement = $(`#comment_text_${comment.id}`);

                    // Update the text content of the elements
                    authorNameElement.text(comment.author_name);
                    commentTextElement.text(comment.text);

                    $("#edit_comment").val("");
                    $("#edit_author_name").val("");

                    $("#editCommentModal").modal("hide");
                },
                error: function (xhr, status, error) {
                    var response = xhr.responseJSON;
                    toastr.error(response.message);

                    $("#comment-edit-submit-btn").show();
                    $("#loadingEditSubmittingBtn").attr("hidden", true);
                },
            });
        }
    });

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
                    var commentId = comment.id;
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
                        "<h4 id='author_name_text_" +
                        commentId +
                        "'>" +
                        comment.author_name +
                        "</h4>" +
                        "<span>- " +
                        formattedDate +
                        "</span>" +
                        "<br>" +
                        "<p id='comment_text_" +
                        commentId +
                        "'>" +
                        comment.text +
                        "</p>" +
                        "<div class='comment-edit-dlt'>" +
                        "<a class='edit-icon text-white edit_comment_btn' data-comment-id='" +
                        commentId +
                        "'>" +
                        "<i class='fas fa-edit'></i>" +
                        "</a>" +
                        "</div>" +
                        "</div>";

                    // Append the new comment HTML to the container
                    $(".comments-container").prepend(newCommentHtml);

                    $(".comments-container")
                        .find(".edit_comment_btn")
                        .first()
                        .on("click", openModal);

                    // open edit comment modal
                    function openModal(event) {
                        const commentId = $(event.currentTarget).data(
                            "comment-id"
                        );
                        getInfoFromComment(commentId);

                        $("#editCommentModal").modal("show");
                    }
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
        } else if (!isNaN(name)) {
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
        } else if (!isNaN(name)) {
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

    // validate edit comment box form
    function validateEditCommentBoxForm() {
        var comment = $("#edit_comment").val();
        var name = $("#edit_author_name").val();

        // Reset error messages and border colors
        $("#edit_comment_error", "#edit_author_name_error").text("");
        $("#edit_comment", "#edit_author_name").css("border-color", "");

        if (!comment) {
            $("#edit_comment_error")
                .text("Comment is required.")
                .css("color", "red");
            $("#edit_comment").css("border-color", "red");
        } else if (comment.length > 255) {
            $("#edit_comment_error")
                .text("Comment cannot exceed 255 characters")
                .css("color", "red");
            $("#edit_comment").css("border-color", "red");
        }

        if (!name) {
            $("#edit_author_name_error")
                .text("Name is required.")
                .css("color", "red");
            $("#edit_author_name").css("border-color", "red");
        } else if (name.length > 255) {
            $("#edit_author_name_error")
                .text("Name cannot exceed 255 characters")
                .css("color", "red");
            $("#edit_author_name").css("border-color", "red");
        } else if (!isNaN(name)) {
            $("#edit_author_name_error")
                .text("Name should contain only letters")
                .css("color", "red");
            $("#edit_author_name").css("border-color", "red");
        }

        // Check if there are any errors
        if (
            $("#edit_comment_error").text() ||
            $("#edit_author_name_error").text()
        ) {
            return false;
        }

        // Set the values if they are valid
        $("#edit_comment").val(comment);
        $("#edit_author_name").val(name);

        return true;
    }

    // edit comment field  error handeling on changing
    $("body").on("input", "#edit_comment", function () {
        var comment = $(this).val();

        if (!comment) {
            $("#edit_comment_error")
                .text("Comment is required.")
                .css("color", "red");
            $("#edit_comment").css("border-color", "red");
        } else if (comment.length > 255) {
            $("#edit_comment_error")
                .text("Comment cannot exceed 255 characters")
                .css("color", "red");
            $("#edit_comment").css("border-color", "red");
        } else {
            $("#edit_comment_error").text("");
            $("#edit_comment").css("border-color", "");
        }

        if (comment) {
            $(this).val(comment);
        } else {
            $(this).val("");
        }
    });

    // edit name field  error handeling on changing
    $("body").on("input", "#edit_author_name", function () {
        var name = $(this).val();

        if (!name) {
            $("#edit_author_name_error")
                .text("Name is required.")
                .css("color", "red");
            $("#edit_author_name").css("border-color", "red");
        } else if (name.length > 255) {
            $("#edit_author_name_error")
                .text("Name cannot exceed 255 characters")
                .css("color", "red");
            $("#edit_author_name").css("border-color", "red");
        } else if (!isNaN(name)) {
            $("#edit_author_name_error")
                .text("Name should contain only letters")
                .css("color", "red");
            $("#edit_author_name").css("border-color", "red");
        } else {
            $("#edit_author_name_error").text("");
            $("#edit_author_name").css("border-color", "");
        }

        if (name) {
            $(this).val(name);
        } else {
            $(this).val("");
        }
    });
});

// after clicking edit button from comment
document.addEventListener("DOMContentLoaded", function () {
    const editButtons = document.querySelectorAll(".edit_comment_btn");
    editButtons.forEach((button) => {
        button.addEventListener("click", openModal);
    });
});

// open edit comment modal
function openModal(event) {
    const commentId = event.currentTarget.getAttribute("data-comment-id");
    console.log("commentId", commentId);
    getInfoFromComment(commentId);
    //   get all information from specific comment

    $("#editCommentModal").modal("show");
}

// after clicking close button from edit comment
document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.querySelector(".close-edit-comment-modal");

    closeButton.addEventListener("click", function () {
        $("#editCommentModal").modal("hide");
    });
});

// ajax  for getting info from specific comment
function getInfoFromComment(commentId) {
    $.ajax({
        url: `/get-comment/${commentId}`,
        type: "get",
        success: function (response) {
            var comment = response.comment;
            $("#comment_id").val(commentId);
            $("#edit_comment").val(comment.text);
            $("#edit_author_name").val(comment.author_name);
        },
        error: function (xhr, status, error) {
            var response = xhr.responseJSON;
            toastr.error(response.message);
        },
    });
}
