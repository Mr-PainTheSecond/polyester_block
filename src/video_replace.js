

  const AD_SELECTORS = [
    '[id^="WikiaAd"]',
    '[id*="ad-slot"]',
    '[class*="ad-slot"]',
    '[id*="AdSlot"]',
    '.fandom-sticky-blocker',
    '.top-ads-container',
    '.bottom-ads-container',
    '.ad-container',
    '.ads-container',
    '[data-slot-id]',
    '[data-ad-slot]',
    'div[id^="google_ads_iframe"]',
    'iframe[id^="google_ads_iframe"]',
    'iframe[src*="doubleclick.net"]',
    'iframe[src*="googlesyndication.com"]',
    '.MediaRailAd',
    '.floating-button-wrapper', 
    '#TOP_LEADERBOARD_BOXAD',
    '#INCONTENT_LEADERBOARD_BOXAD',
    '#PORTABLE_INFOBOX_BOXAD',
    '#RAIL_BOXAD',
    '#BOTTOM_LEADERBOARD_BOXAD',
  ];


const COMBINED_SELECTOR = AD_SELECTORS.join(',');

function adSweep(parent, ads) {
    const prevWidth = ads.offsetWidth;
    const prevHeight = ads.offsetHeight;
    const prevRect = ads.getBoundingClientRect();
    const polyesterAd = document.createElement("video");


    polyesterAd.src = chrome.runtime.getURL("Videos/PolyNormal.mp4");
    polyesterAd.style.width = `${prevWidth}px`;
    polyesterAd.style.height = `${200}px`;
    polyesterAd.autoplay = true;
    polyesterAd.loop = false;
    polyesterAd.muted = false;
    polyesterAd.controls = false;
    polyesterAd.className = "Polyester"
    polyesterAd.style.objectFit = "cover";


    const AdLink = document.createElement("a");
    AdLink.style.position = "relative";
    AdLink.style.width = `${prevWidth}px`;
    AdLink.style.height = `${prevHeight}px`;
    AdLink.href = "https://www.youtube.com/watch?v=zswT92VzOYM&pp=ygUYcG9seWVzdGVyIHNwaWRlcm1hbiBlZGl0";
    AdLink.target = "_blank";

    AdLink.appendChild(polyesterAd);
    parent.appendChild(AdLink);


    polyesterAd.load();
    console.log("May play...");
}

function replaceAd(element) {
    const ads = document.getElementById("fandom-ad-wrapper");
    
    if(ads) {
        adSweep(ads);
    }

    const classAds = document.getElementsByClassName("fandom-ad-wrapper");

    for (let a = 0; a < classAds.length; a++) {
        adSweep(classAds[a]);
    }
}

function isAdElement(el) {
    if (!(el instanceof Element)) return false;
    return AD_SELECTORS.some((sel) => {
      try {
        return el.matches(sel);
      } catch (e) {
        return false;
      }
    });
  }

// function findMatchingElement(el) {
//     for (let a = 0; a < AD_SELECTORS.length; a++) {
//         if (el.matches(sel[a])) {
//             return sel[a];
//         }
//     }

//     return null;
// }

var rectList = []

const observer = new MutationObserver((mutations) => {
    rectList = []

    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node instanceof Element) {
                const isAd = isAdElement(node);
                if (isAd) {
                    const successor = node.parentElement;
                    
                    adSweep(successor, node);

                    console.log("Found video/img");
                }
            }
            
        }
    }

    document.querySelectorAll(AD_SELECTORS).forEach(el => {
        el?.style.setProperty('display', 'none', 'important');
    });
});

console.log("");

observer.observe(document.body, {
    childList: true,
    subtree: true
});