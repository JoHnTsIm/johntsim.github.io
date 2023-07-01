function toggleMenu() {
    var navLinksMobile = document.getElementById("nav-links-mobile")

    if (navLinksMobile.style.display === "flex") {
        navLinksMobile.style.display = "none";
    } else {
        navLinksMobile.style.display = "flex";
    }
}




// * carousel
var carouselItems = document.getElementsByClassName("carousel_item");
var carouselDots = document.getElementsByClassName('dot');
var itemNumber = carouselItems.length;
var selectedItem = -1; // -1 to be out of the image range numbers
var timeout;
// Update the interaction
var Update = function () {
    for (var index = 0; index < carouselItems.length; index++) {
        if (index != selectedItem) {
            if (carouselItems[index].getAttribute('class') !== 'carousel_item') {
                carouselItems[index].setAttribute('class', 'carousel_item');
                if (carouselDots.length !== 0) {
                    carouselDots[index].setAttribute('class', 'dot');
                }
            }
        }
        else {
            carouselItems[index].setAttribute('class', 'carousel_item visible');
            if (carouselDots.length !== 0) {
                carouselDots[index].setAttribute('class', 'dot selected');
            }
        }
    }
};
// Move to the next image
var nextImage = function () {
    if (selectedItem < itemNumber - 1) {
        selectedItem++;
    }
    else {
        selectedItem = 0;
    }
    timeout = setTimeout(nextImage, 7000);
    Update();
};
// Add as much dots as the images inside the carousel and set the dot's classes
var addItemDots = function () {
    var carouselDotsDiv = document.getElementById('carousel_dots');
    var _loop_1 = function (index) {
        var dot = document.createElement('div');
        if (index === 0) {
            dot.setAttribute('class', 'dot selected');
        }
        else {
            dot.setAttribute('class', 'dot');
        }
        carouselDotsDiv === null || carouselDotsDiv === void 0 ? void 0 : carouselDotsDiv.appendChild(dot);
        // Add functionality to every dot - go to the image that is releated to the specific dot
        var changeVisibleImage = function () {
            selectedItem = index;
            clearTimeout(timeout);
            timeout = setTimeout(nextImage, 7000);
            Update();
        };
        dot.addEventListener('click', changeVisibleImage);
    };
    for (var index = 0; index < itemNumber; index++) {
        _loop_1(index);
    }
};
// run functions on load
nextImage();
addItemDots();