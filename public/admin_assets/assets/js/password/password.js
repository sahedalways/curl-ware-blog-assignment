$(document).ready(function () {
    $(".current-password-toggle").click(function () {
        var input = $(this).closest(".form-group").find("input");
        if (input.attr("type") === "password") {
            input.attr("type", "text");
            $(this)
                .find(".toggle-icon")
                .removeClass("fa-eye-slash")
                .addClass("fa-eye");
        } else {
            input.attr("type", "password");
            $(this)
                .find(".toggle-icon")
                .removeClass("fa-eye")
                .addClass("fa-eye-slash");
        }
    });

    $(".new-password-toggle").click(function () {
        var input = $(this).closest(".form-group").find("input");
        if (input.attr("type") === "password") {
            input.attr("type", "text");
            $(this)
                .find(".toggle-icon")
                .removeClass("fa-eye-slash")
                .addClass("fa-eye");
        } else {
            input.attr("type", "password");
            $(this)
                .find(".toggle-icon")
                .removeClass("fa-eye")
                .addClass("fa-eye-slash");
        }
    });

    $(".confirm-password-toggle").click(function () {
        var input = $(this).closest(".form-group").find("input");
        if (input.attr("type") === "password") {
            input.attr("type", "text");
            $(this)
                .find(".toggle-icon")
                .removeClass("fa-eye-slash")
                .addClass("fa-eye");
        } else {
            input.attr("type", "password");
            $(this)
                .find(".toggle-icon")
                .removeClass("fa-eye")
                .addClass("fa-eye-slash");
        }
    });
});
