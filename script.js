function toggleMenu() {
    var navLinksMobile = document.getElementById("nav-links-mobile")

    if (navLinksMobile.style.display === "flex") {
        navLinksMobile.style.display = "none";
    } else {
        navLinksMobile.style.display = "flex";
    }
}