function show_hide() {
    var catBox = document.getElementById("catBox"); 
    if (catBox.style.display === "block") {
    catBox.style.display = "none";
    catBox.style.position = "fixed";
    catBox.style.zIndex = 2000;
    }

    else {
        catBox.style.display = "block";
    } 

}



function showMore() {
    var content = document.getElementById("content");
    var more = document.getElementById("more")
    content.style.display = "block";
    more.style.display = "none";
        
}

function isScrolledIntoView(elem)
{
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
