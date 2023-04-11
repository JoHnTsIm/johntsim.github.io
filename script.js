var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
if(sPage == "current-free-games.html"){
    $.ajax({
        type: "POST",
        url: "python/load-free-games.py",
    });
}