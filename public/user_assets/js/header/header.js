function toggleMenu() {
    var menu = document.getElementById("navbarNav");
    var icon = document.getElementById("menuIcon");

    if (menu.classList.contains("expand-menu")) {
        // Menu is currently expanded, collapse it
        menu.classList.remove("expand-menu");
        // Revert icon to hamburger
        icon.classList.remove("fa-times"); // Remove Font Awesome cross icon class
        icon.classList.add("fa", "fa-bars"); // Add Font Awesome bars icon classes
    } else {
        // Menu is currently collapsed, expand it
        menu.classList.add("expand-menu");
        // Change icon to cross
        icon.classList.remove("fa-bars"); // Remove Font Awesome bars icon class
        icon.classList.add("fa", "fa-times"); // Add Font Awesome cross icon classes
    }
}
