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



const getTitle = async page => {
    const title = await page.evaluate(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle != null && ogTitle.content.length > 0) {
        return ogTitle.content;
      }
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle != null && twitterTitle.content.length > 0) {
        return twitterTitle.content;
      }
      const docTitle = document.title;
      if (docTitle != null && docTitle.length > 0) {
        return docTitle;
      }
      const h1 = document.querySelector("h1").innerHTML;
      if (h1 != null && h1.length > 0) {
        return h1;
      }
      const h2 = document.querySelector("h1").innerHTML;
      if (h2 != null && h2.length > 0) {
        return h2;
      }
      return null;
    });
    return title;
  };


  const getDescription = async page => {
    const description = await page.evaluate(() => {
      const ogDescription = document.querySelector(
        'meta[property="og:description"]'
      );
      if (ogDescription != null && ogDescription.content.length > 0) {
        return ogDescription.content;
      }
      const twitterDescription = document.querySelector(
        'meta[name="twitter:description"]'
      );
      if (twitterDescription != null && twitterDescription.content.length > 0) {
        return twitterDescription.content;
      }
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription != null && metaDescription.content.length > 0) {
        return metaDescription.content;
      }
      paragraphs = document.querySelectorAll("p");
      let fstVisibleParagraph = null;
      for (let i = 0; i < paragraphs.length; i++) {
        if (
          // if object is visible in dom
          paragraphs[i].offsetParent !== null &&
          !paragraphs[i].childElementCount != 0
        ) {
          fstVisibleParagraph = paragraphs[i].textContent;
          break;
        }
      }
      return fstVisibleParagraph;
    });
    return description;
  };

  const getDomainName = async (page, uri) => {
    const domainName = await page.evaluate(() => {
      const canonicalLink = document.querySelector("link[rel=canonical]");
      if (canonicalLink != null && canonicalLink.href.length > 0) {
        return canonicalLink.href;
      }
      const ogUrlMeta = document.querySelector('meta[property="og:url"]');
      if (ogUrlMeta != null && ogUrlMeta.content.length > 0) {
        return ogUrlMeta.content;
      }
      return null;
    });
    return domainName != null
      ? new URL(domainName).hostname.replace("www.", "")
      : new URL(uri).hostname.replace("www.", "");
  };

  const util = require("util");
const request = util.promisify(require("request"));
const getUrls = require("get-urls");

const urlImageIsAccessible = async url => {
  const correctedUrls = getUrls(url);
  if (correctedUrls.size !== 0) {
    const urlResponse = await request(correctedUrls.values().next().value);
    const contentType = urlResponse.headers["content-type"];
    return new RegExp("image/*").test(contentType);
  }
};

const getImg = async (page, uri) => {
  const img = await page.evaluate(async () => {
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (
      ogImg != null &&
      ogImg.content.length > 0 &&
      (await urlImageIsAccessible(ogImg.content))
    ) {
      return ogImg.content;
    }
    const imgRelLink = document.querySelector('link[rel="image_src"]');
    if (
      imgRelLink != null &&
      imgRelLink.href.length > 0 &&
      (await urlImageIsAccessible(imgRelLink.href))
    ) {
      return imgRelLink.href;
    }
    const twitterImg = document.querySelector('meta[name="twitter:image"]');
    if (
      twitterImg != null &&
      twitterImg.content.length > 0 &&
      (await urlImageIsAccessible(twitterImg.content))
    ) {
      return twitterImg.content;
    }

    let imgs = Array.from(document.getElementsByTagName("img"));
    if (imgs.length > 0) {
      imgs = imgs.filter(img => {
        let addImg = true;
        if (img.naturalWidth > img.naturalHeight) {
          if (img.naturalWidth / img.naturalHeight > 3) {
            addImg = false;
          }
        } else {
          if (img.naturalHeight / img.naturalWidth > 3) {
            addImg = false;
          }
        }
        if (img.naturalHeight <= 50 || img.naturalWidth <= 50) {
          addImg = false;
        }
        return addImg;
      });
      imgs.forEach(img =>
        img.src.indexOf("//") === -1
          ? (img.src = `${new URL(uri).origin}/${src}`)
          : img.src
      );
      return imgs[0].src;
    }
    return null;
  });
  return img;
};


// Dark Mode
function lightMode() {
  var element = document.body; // body
  x = element.classList.toggle("light-mode")
  localStorage.setItem("x", x)
  }
  
  window.onload = function() {
      if (localStorage.getItem("x") == "true") {
          lightMode()
      } 
  }
  
  window.onclick = function(){ 
  console.log(localStorage.getItem("x"))}