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

function adSweep(ads) {
    console.log("Hit Ad!");
    ads.innerHTML = ""  
    const polyesterAd = document.createElement("Video");

    polyesterAd.src = "polyester_block/Videos/PolyNormal.mp4";
    polyesterAd.width = "100%";
    polyesterAd.height = "100%";
    polyesterAd.autoplay = true;
    polysesterAd.loop = true;
    polyesterAd.muted = true;
    polyesterAd.controls = false;
    polyesterAd.style.objectFit = "cover";

    const AdLink = document.createElement("a");
    AdLink.href = "https://www.youtube.com/watch?v=zswT92VzOYM&pp=ygUYcG9seWVzdGVyIHNwaWRlcm1hbiBlZGl0";
    AdLink.target = "_blank";

    AdLink.appendChild(polyesterAd);
    ads.appendChild(AdLink);

    Console.log("Ad Replaced");
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

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node instanceof Element) {
                const fandomAD = node.querySelectorAll?.(AD_SELECTORS);
                if (fandomAD) {
                    console.log("Found video/img");
                    replaceAd(node);
                }
            }
            
        }
    }
});

console.log("")

observer.observe(document.body, {
    childList: true,
    subtree: true
});