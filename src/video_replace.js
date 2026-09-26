
console.log("starting video_replace.js");

const VIDEO_LIST = [
    "Videos/PolyNormal.mp4",
    "Videos/PolyLowRes.mp4",
    "Videos/PolyScout.mp4",
    "Videos/PolyBaldi.mp4",
    "Videos/PolyBackrooms.mp4",
    "Videos/PolyIronMan.mp4"
];

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
    'lngtd-ad-wrapper-banner'
  ];

let adFlagsList = null;

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                adFlagsList = rawFile.responseText.split("\n");
            }
        }
    }
    rawFile.send(null);
}


readTextFile(chrome.runtime.getURL("data/easylist.txt"));

const COMBINED_SELECTOR = adFlagsList.join(',');

class AD {
    constructor(div, aLink, video, width, height) {
        this.div = div;
        this.aLink = aLink;
        this.video = video;
        this.width = width;
        this.height = height;
    }

    fixSize() {
        console.log("Trying to fix size...");

        this.div.style.width = this.width;
        this.div.style.height = this.height;

        this.aLink.style.width = this.width;
        this.aLink.style.height = this.height;

        this.video.style.width = this.width;
        this.video.style.height = this.height;
    }
}

adArray = []

function randInt(low, high) {
    return low + Math.floor((Math.random() * (high - low)));
}

function adSweep(parent, ads) {
    const prevRect = ads.getBoundingClientRect();
    const polyesterAd = document.createElement("video");
    const polyDiv = document.createElement("div");
    const minDimension = Math.min(parent.width, parent.height);
    console.log(minDimension);
    polyDiv.style.width = `${50}%`;
    polyDiv.style.height = `${50}%`;

    const chosenVideo = VIDEO_LIST[randInt(0, VIDEO_LIST.length)];
    console.log(chosenVideo);
    polyesterAd.src = chrome.runtime.getURL(chosenVideo);
    polyesterAd.autoplay = true;
    polyesterAd.loop = true;
    polyesterAd.muted = false;
    polyesterAd.controls = false;
    polyesterAd.className = "Polyester"
    polyesterAd.style.objectFit = "cover";


    const AdLink = document.createElement("a");
    AdLink.style.position = "relative";
    AdLink.style.width = `${50}%`;
    AdLink.style.height = `${50}%`;
    AdLink.href = "https://www.youtube.com/watch?v=zswT92VzOYM&pp=ygUYcG9seWVzdGVyIHNwaWRlcm1hbiBlZGl0";
    AdLink.target = "_blank";

    AdLink.appendChild(polyesterAd);
    polyDiv.appendChild(AdLink);
    parent.appendChild(polyDiv);


    polyesterAd.load();
    console.log("May play...");

    const newAD = new AD(polyDiv, AdLink, polyesterAd, `${minDimension}px`, `${minDimension}px`);
    adArray[adArray.length] = newAD;
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


function findNearestNonAd(node) {
    let parent = node.parentElement;

    while (isAdElement(parent)) {
        parent = parent.parentElement;
    }

    return parent;
}

function fixSizes() {
    for (let a = 0; a < adArray.length; a++) {
        adArray[a]?.fixSize();
    }
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
                    const successor = findNearestNonAd(node);
                    
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

// setInterval(() => {fixSizes();}, 34);