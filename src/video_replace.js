
console.log("starting video_replace.js");

var blackListVideo;

const VIDEO_LIST = [
    "Videos/PolyNormal.mp4",
    "Videos/PolyLowRes.mp4",
    "Videos/PolyScout.mp4",
    "Videos/PolyBaldi.mp4",
    "Videos/PolyBackrooms.mp4",
    "Videos/PolyIronMan.mp4", 
    "Videos/CottonMan.mp4",
    "Videos/PolyChem.mp4",
    "Videos/PolyIdk.mp4",
    "Videos/PolyReverse.mp4",
    "Videos/PolySponge.mp4",
    "Videos/PolyToy.mp4"
];

const KEY_NAME = "whitelist";

async function createStorage() {
    // chrome.storage.local.clear();

    let initialized = await chrome.storage.local.get(["init"]);

    console.log(initialized.init);
    if (initialized.init === undefined) {
        console.log("initializing...");
        await chrome.storage.local.set({init: true});
        initialized = await chrome.storage.local.get(["init"]);
        console.log(initialized.init);
        await chrome.storage.local.set({whitelist: Array()});
    }



    let theBlackList = await chrome.storage.local.get(["blacklist"]);
    if (theBlackList.blacklist === undefined) {
            console.log("initializing blck list");
            await chrome.storage.local.set({blacklist: []});
            theBlackList = await chrome.storage.local.get(["blacklist"]);
            console.log(theBlackList.blacklist);
        }
    
    let theWhitelist = await chrome.storage.local.get(["whitelist"]);
    console.log(theWhitelist);
}


createStorage().then(() => {
    console.log(chrome.storage.local.get(["whitelist"]));

    // appendWhiteList("https://www.youtube.com");
});

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
    'lngtd-ad-wrapper-banner',
    '[id*="advert"]',
  '[class*="advert"]',
  '[id*="banner-ad"]',
  '[class*="banner-ad"]',
  '[id^="div-gpt-ad"]',
  '[id*="dfp-ad"]',
  '[class*="adsbygoogle"]',
  '.adsbygoogle',
  '[id*="sponsor"]',
  '[class*="sponsor"]',
  '[class*="promoted"]',
  '[data-ad-client]',
  '[data-ad-format]',
  '[data-google-query-id]',

  // Ad network / vendor iframes
  'iframe[src*="googleadservices.com"]',
  'iframe[src*="amazon-adsystem.com"]',
  'iframe[src*="adnxs.com"]',
  'iframe[src*="taboola.com"]',
  'iframe[src*="outbrain.com"]',
  'iframe[src*="criteo.com"]',
  'iframe[src*="pubmatic.com"]',
  'iframe[src*="rubiconproject.com"]',
  'iframe[src*="openx.net"]',
  'iframe[id*="aswift"]',

  // Container / layout conventions for ad slots
  '[class*="ad-wrapper"]',
  '[class*="ad-unit"]',
  '[id*="ad-unit"]',
  '[class*="ad-placeholder"]',
  '[class*="native-ad"]',
  '[class*="in-content-ad"]',
  '[class*="sidebar-ad"]',
  '[class*="sticky-ad"]',
  '[class*="interstitial-ad"]',

  '[id^="AdThrive"]',
  '.adthrive-ad',
  '[class*="mediavine"]',
  '[id*="prebid"]',
  '[class*="ezoic"]',
  '[id^="ez-"]',

  '[id^="ad_"]',
  '[id^="Ad_"]',
  '[id*="_ad_"]',
  '[id$="-ad"]',
  '[id$="_ad"]',

  '[data-testid*="ad"]',
  '[data-component*="ad"]',
  '[aria-label*="Advertisement"]',
  ];


let adFlagsList = null;

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                adFlagsList = Array.from(rawFile.responseText.split("\n"));
            }
        }
    }
    rawFile.send(null);
}

function saveAsDownload(text, filename = 'output.txt') {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({ url, filename, saveAs: false });
}

readTextFile(chrome.runtime.getURL("data/easylist.txt"));

const COMBINED_SELECTOR = AD_SELECTORS.join(',');

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

// async function getTab() {
//     let queryOptions = { active: true, lastFocusedWindow: true };
//     let [tab] = await chrome.tabs?.query(queryOptions);
//     return tab
// }

async function adSweep(parent, ads, muted) {

    let percent = 40;
    const polyesterAd = document.createElement("video");
    const polyDiv = document.createElement("div");
    polyDiv.style.width = `${percent}%`;
    polyDiv.style.height = `${percent}%`;

    const chosenVideo = VIDEO_LIST[randInt(0, VIDEO_LIST.length)];
    console.log(chosenVideo);
    polyesterAd.src = chrome.runtime.getURL(chosenVideo);
    polyesterAd.autoplay = true;
    polyesterAd.loop = true;
    polyesterAd.muted = muted;
    polyesterAd.controls = false;
    polyesterAd.className = "Polyester"
    polyesterAd.style.zIndex = -1;
    polyesterAd.style.objectFit = "cover";


    const AdLink = document.createElement("a");

    const isYouTube = (window.location.hostname.includes('youtube.com') );
    AdLink.style.position = isYouTube ? 'fixed' : 'relative';

    AdLink.style.width = `${percent}%`;
    AdLink.style.height = `${percent}%`;
    AdLink.href = "https://www.youtube.com/watch?v=zswT92VzOYM&pp=ygUYcG9seWVzdGVyIHNwaWRlcm1hbiBlZGl0";
    AdLink.target = "_blank";

    AdLink.appendChild(polyesterAd);
    polyDiv.appendChild(AdLink);
    parent.appendChild(polyDiv);

    console.log("May play...");


    return true;
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

async function appendWhiteList(url) {

    var oldWhiteList = await chrome.storage.local.get(["whitelist"]);
    console.log(oldWhiteList);
    let currentWhiteList = oldWhiteList.whitelist;
    if (!(currentWhiteList.includes(url))) {
        currentWhiteList.push(url);
    }

    return await chrome.storage.local.set({whitelist: currentWhiteList});
}

async function getWhiteList() {
    let currentWhiteListObj = await chrome.storage.local.get(["whitelist"]);
    return currentWhiteListObj;
}

async function getBlackList() {
    let currentBlackListObj = await chrome.storage.local.get(["blacklist"]);
    return currentBlackListObj;
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



function trySize() {
    if (adArray.length === 0) return;

    for (let a = 0; a < adArray.length; a++) {
        const successor = findNearestNonAd(adArray[a]);
        let success = adSweep(successor, adArray[a]);

        if (success) {
            adArray.splice(a);
            a--;
        }
    }

    if (adArray.length === 0) {
        document.querySelectorAll(AD_SELECTORS).forEach(el => {
            el?.style.setProperty('display', 'none', 'important');
        });
    }
}


var rectList = []


function pageDeactivation(node) {
    if (node === null || node === undefined) return;

    for (let a = 0; a < node.childNodes?.length; a++) {
        pageDeactivation(node.childNodes[a]);

        node.childNodes[a]?.style?.setProperty('display', 'none', 'important');
    }
}

function scriptDeactivation() {
    let scripts = document.getElementsByTagName("script");

    for (let a = 0; a < scripts.length; a++) {
        scripts[a].style.setProperty('display', 'none', 'important');
    }
}


let darkSite = []

const observer = new MutationObserver((mutations) => {
    rectList = []

    const domain = window.location.hostname;

    // Do not reload video if it is already playing.
    if (darkSite.includes(domain)) {
        return;
    }
    const head = document.getElementsByTagName("head");
    const scripts = document.getElementsByTagName("script");
    const images = document.getElementsByTagName("img");


    

    // document.body.innerHTML = "\n".join(adFlagsList);


    // for (let a = 0; a < scripts.length; a++) {
    //     scripts[a].innerHTML = "";
    // }

    // for (let a = 0; a < whiteList?.whitelist?.length; a++) {
    //     // Don't generate anything since page is white listed
    //     if (whiteList.whitelist[a].contains(domain)) {
    //         return;
    //     }
    // }
    let blacklisted = false;
    getBlackList().then((result) => {
        for (let a = 0; a < result.blacklist.length; a++) {
            let strLink = result.blacklist[a];
            if ((strLink).includes(domain)) {
                blaclisted = true;
                console.log("BlackListed!");
                darkSite[darkSite.length] = domain;
                pageDeactivation(document.body);
                scriptDeactivation();
                

                blackListVideo = document.createElement("video");
                blackListVideo.position = "fixed";
                blackListVideo.className = "Polyester";
                blackListVideo.style.width = `${screen.width}px`;
                blackListVideo.style.height = `${screen.height}px`;
                blackListVideo.style.margin = "0";
                blackListVideo.style.padding = "0";
                blackListVideo.style.overflow = "hidden";
                blackListVideo.playsInline = true;
                blackListVideo.autoplay = true;
                blackListVideo.loop = true;
                blackListVideo.muted = true;
                // blackListVideo.addEventListener("onclick", () => {
                //     console.log("clicked!");
                //     blackListVideo.muted = false;});
                const newVideo = VIDEO_LIST[randInt(0, VIDEO_LIST.length)];
                blackListVideo.load();
                document.body.appendChild(blackListVideo);
                blackListVideo.src = chrome.runtime.getURL(newVideo);
                break;
            }
        }
    });


    getWhiteList().then((result)=> {
        console.log(result);
        console.log(domain);
        let whitelisted = false;
        for (let a = 0; a < result.whitelist.length; a++) {
            let strLink = result.whitelist[a];
            if ((strLink).includes(domain)) {
                whitelisted = true;
                console.log("WhiteListed!");
            }
        }

        if (!whitelisted) {
            for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                    if (node instanceof Element) {
                        const isAd = isAdElement(node);
                        if (isAd) {
                            const successor = findNearestNonAd(node);
                            
                            if (document.getElementsByClassName("Polyester") === 0) {
                                adSweep(successor, node, false);
                            } else {
                                adSweep(successor, node, true); 
                            }
                        }
                    }
                    
                }
        }

        document.querySelectorAll(AD_SELECTORS).forEach(el => {
            el?.style.setProperty('display', 'none', 'important');
        });
    }
        }
    );

});


observer.observe(document.body, {
    childList: true,
    subtree: true
});

// setInterval(() => {trySize();}, 34);