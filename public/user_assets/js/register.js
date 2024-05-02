$(document).ready(function () {
    $("#register-btn").on("click", function () {
        if (validateRegisterForm()) {
            $("#register-btn").hide();
            $("#loadingRegisteringBtn").removeAttr("hidden");

            var form = $("#registerForm");
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
                    $("#messageModal").modal("show");
                    $("#register-btn").show();

                    $("#loadingRegisteringBtn").attr("hidden", true);
                },
            });
        }
    });

    function validateRegisterForm() {
        var name = $("#name").val();
        var email = $("#registerEmail").val();
        var phone_number = $("#phone_number").val();
        var password = $("#registerPassword").val();
        var password_confirmation = $("#password_confirmation").val();

        // Reset error messages and border colors
        $(
            "#name_error",
            "#register_email_error",
            "#phone_number_error",
            "#register_password_error",
            "#confirm_password_error"
        ).text("");
        $(
            "#registerEmail",
            "#name",
            "#phone_number",
            "#registerPassword",
            "#password_confirmation"
        ).css("border-color", "");

        if (!name) {
            $("#name_error").text("Name is required.").css("color", "red");
            $("#name").css("border-color", "red");
        }

        if (!email) {
            $("#register_email_error")
                .text("Email address is required.")
                .css("color", "red");
            $("#registerEmail").css("border-color", "red");
        } else if (!isValidEmail(email)) {
            $("#register_email_error")
                .text("Please enter a valid email address.")
                .css("color", "red");
            $("#registerEmail").css("border-color", "red");
        }

        if (!phone_number) {
            $("#phone_number_error")
                .text("Phone number is required.")
                .css("color", "red");
            $("#phone_number").css("border-color", "red");
        } else if (!/^\d+$/.test(phone_number)) {
            $("#phone_number_error")
                .text(
                    "Please enter a valid phone number with only numeric digits."
                )
                .css("color", "red");
            $("#phone_number").css("border-color", "red");
        } else if (phone_number.length > 15) {
            $("#phone_number_error")
                .text("Phone number should not exceed 15 digits.")
                .css("color", "red");
            $("#phone_number").css("border-color", "red");
        }

        if (!password) {
            $("#register_password_error")
                .text("Password is required.")
                .css("color", "red");
            $("#registerPassword").css("border-color", "red");
        }

        // else if (!validatePassword(password)) {
        //     $("#register_password_error")
        //         .text(
        //             "Password must be 8-20 characters, include at least 1 special character, and 1 number."
        //         )
        //         .css("color", "red");
        //     $("#registerPassword").css("border-color", "red");
        // }

        if (password != password_confirmation) {
            $("#confirm_password_error")
                .text("Passwords does not match.")
                .css("color", "red");
            $("#password_confirmation").css("border-color", "red");
        }

        // Check if there are any errors
        if (
            $("#confirm_password_error").text() ||
            $("#phone_number_error").text() ||
            $("#register_email_error").text() ||
            $("#name_error").text() ||
            $("#register_password_error").text()
        ) {
            return false;
        }

        // Set the values if they are valid
        $("#registerEmail").val(email);
        $("#name").val(name);
        $("#phone_number").val(phone_number);
        $("#registerPassword").val(password);
        $("#password_confirmation").val(password_confirmation);

        return true;
    }

    // first name error handeling
    $("body").on("input", "#name", function () {
        var name = $(this).val();

        if (!isNaN(name)) {
            $("#name_error")
                .text("Name should not include a number.")
                .css("color", "red");
            $("#name").css("border-color", "red");
        } else {
            if (!name) {
                $("#name_error").text("Name is required.").css("color", "red");
                $("#name").css("border-color", "red");
            } else {
                $("#name_error").text("");
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
    $("body").on("input", "#registerEmail", function () {
        var email = $(this).val();

        if (!email) {
            $("#register_email_error")
                .text("Email is required.")
                .css("color", "red");
            $("#registerEmail").css("border-color", "red");
        } else if (!isValidEmail(email)) {
            $("#register_email_error")
                .text("Please enter a valid email address.")
                .css("color", "red");
            $("#registerEmail").css("border-color", "red");
        } else {
            $("#register_email_error").text("");
            $("#registerEmail").css("border-color", "");
        }

        if (email) {
            $(this).val(email);
        } else {
            $(this).val("");
        }
    });

    // phone number error handling
    $("body").on("input", "#phone_number", function () {
        var phone_number = $(this).val().trim();

        if (!/^\d+$/.test(phone_number)) {
            $("#phone_number_error")
                .text(
                    "Please enter a valid phone number with only numeric digits."
                )
                .css("color", "red");
            $("#phone_number").css("border-color", "red");
        } else if (phone_number.length > 15) {
            $("#phone_number_error")
                .text("Phone number should not exceed 15 digits.")
                .css("color", "red");
            $("#phone_number").css("border-color", "red");
        } else {
            if (!phone_number) {
                $("#phone_number_error")
                    .text("Phone number is required.")
                    .css("color", "red");
                $("#phone_number").css("border-color", "red");
            } else {
                $("#phone_number_error").text("");
                $("#phone_number").css("border-color", "");
            }
        }

        // If there is a valid phone number, update the input value
        if (phone_number) {
            $(this).val(phone_number);
        } else {
            $(this).val("");
        }
    });

    function validatePassword(password) {
        // Password should be 8-20 characters, have at least 1 special character, and at least 1 number
        var passwordRegex =
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        return passwordRegex.test(password);
    }

    // Password input event handler
    $("#registerPassword").on("input", function () {
        var password = $(this).val();
        var passwordError = $("#register_password_error");

        // if (!validatePassword(password)) {
        //     passwordError
        //         .text(
        //             "Password must be 8-20 characters, include at least 1 special character, and 1 number."
        //         )
        //         .css("color", "red");
        //     $(this).css("border-color", "red");
        // } else if (!password) {
        if (!password) {
            passwordError.text("Password is required.").css("color", "red");
            $(this).css("border-color", "red");
        } else {
            passwordError.text("");
            $(this).css("border-color", "");
        }
    });

    // Confirm password input event handler
    $("#password_confirmation").on("input", function () {
        var confirmPassword = $(this).val();
        var password = $("#registerPassword").val();
        var confirmError = $("#confirm_password_error");

        if (password !== confirmPassword) {
            confirmError.text("Passwords does not match.").css("color", "red");
            $(this).css("border-color", "red");
        } else {
            confirmError.text("");
            $(this).css("border-color", "");
        }
    });
});
