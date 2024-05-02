$(document).ready(function () {
    $("#login-btn").on("click", function () {
        if (validateLoginForm()) {
            $("#login-btn").hide();
            $("#loadingSubmittingBtn").removeAttr("hidden");

            var form = $("#loginForm");
            var formData = form.serialize();
            var actionUrl = form.data("action");

            $.ajax({
                url: actionUrl,
                type: form.attr("method"),
                data: formData,
                success: function (response) {
                    window.location.href = "/";

                    // Handle success response
                },
                error: function (xhr, status, error) {
                    var response = xhr.responseJSON;
                    toastr.error(response.message);

                    $("#login-btn").show();

                    $("#loadingSubmittingBtn").attr("hidden", true);
                },
            });
        }
    });

    function validateLoginForm() {
        var email = $("#email").val();
        var password = $("#password").val();

        // Reset error messages and border colors
        $("#email_error", "#password_error").text("");
        $("#email", "#password").css("border-color", "");

        if (!email) {
            $("#email_error").text("Email is required.").css("color", "red");
            $("#email").css("border-color", "red");
        } else if (!isValidEmail(email)) {
            $("#email_error")
                .text("Please enter a valid email address.")
                .css("color", "red");
            $("#email").css("border-color", "red");
        }

        if (!password) {
            $("#password_error")
                .text("Password is required.")
                .css("color", "red");
            $("#password").css("border-color", "red");
        }

        // Check if there are any errors
        if ($("#email_error").text() || $("#password_error").text()) {
            return false;
        }

        // Set the values if they are valid
        $("#email").val(email);
        $("#password").val(password);

        return true;
    }

    function isValidEmail(email) {
        // Regular expression for a simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // email error handeling
    $("body").on("input", "#email", function () {
        var email = $(this).val();

        if (!email) {
            $("#email_error").text("Email is required.").css("color", "red");
            $("#email").css("border-color", "red");
        } else if (!isValidEmail(email)) {
            $("#email_error")
                .text("Please enter a valid email address.")
                .css("color", "red");
            $("#email").css("border-color", "red");
        } else {
            $("#email_error").text("");
            $("#email").css("border-color", "");
        }

        if (email) {
            $(this).val(email);
        } else {
            $(this).val("");
        }
    });

    // Password input event handler
    $("#password").on("input", function () {
        var password = $(this).val();

        if (!password) {
            $("#password_error")
                .text("Password is required.")
                .css("color", "red");
            $("#password").css("border-color", "red");
        } else {
            $("#password_error").text("");
            $("#password").css("border-color", "");
        }
    });
});
