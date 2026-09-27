
populateWL();
populateBL();
document.getElementById("submitWhitelist").addEventListener("click", submitWhitelist);
document.getElementById("submitBlacklist").addEventListener("click", submitBlacklist);

const wlArr = [];
const blArr = [];

function populateWL() {
    console.log("Populate Ran!");
    let whiteList = getWhiteList().then((result)=>{
        for (let a = 0; a < result.whitelist.length; a++) {
            let strLink = result.whitelist[a];
            wlArr.push(strLink);
            console.log("element created");
            const txtBox = document.createElement('h3');
            txtBox.textContent = strLink;
            document.body.appendChild(txtBox);
        }
    });
}

function populateBL() {
    let blackList = getBlackList().then((result)=>{
        for (let a = 0; a < result.blacklist.length; a++) {
            let strLink = result.blacklist[a];
            blArr.push(strLink);
            console.log("element created");
            const txtBox = document.createElement('h2');
            txtBox.textContent = strLink;
            document.body.appendChild(txtBox);
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

async function appendBlackList(url) {

    var oldBlackList = await chrome.storage.local.get(["blacklist"]);
    console.log(oldBlackList);
    let currentBlackList = oldBlackList.blacklist;
    if (!(currentBlackList.includes(url))) {
        currentBlackList.push(url);
    }

    return await chrome.storage.local.set({blacklist: currentBlackList});
}

async function getBlackList() {
    let currentBlackListObj = await chrome.storage.local.get(["blacklist"]);
    return currentBlackListObj;
}

async function getWhiteList() {
    let currentWhiteListObj = await chrome.storage.local.get(["whitelist"]);
    return currentWhiteListObj;
}


async function removeFromWhiteList(url) {
    var oldWhiteList = await chrome.storage.local.get(["whitelist"]);
    let currentWhiteList = oldWhiteList.whitelist;

    console.log("In the removal phase");

    for (let a = 0; a < currentWhiteList.length; a++) {
        if (currentWhiteList[a] === url) {
            currentWhiteList.splice(a, 1);
            console.log("Found matching item");
            break;
        }
    }

    await chrome.storage.local.set({whitelist: currentWhiteList})
}

async function removeFromBlackList(url) {
    var oldBlackList = await chrome.storage.local.get(["blacklist"]);
    let currentBlackList = oldBlackList.blacklist;

    console.log("In the removal phase");

    for (let a = 0; a < currentBlackList.length; a++) {
        if (currentBlackList[a] === url) {
            currentBlackList.splice(a, 1);
            console.log("Found matching item");
            break;
        }
    }

    await chrome.storage.local.set({blacklist: currentBlackList})
}

function submitWhitelist() {
    let url = document.getElementById("whitelist").value;
    const txtBox = document.createElement('h3');

    for(let i = 0; i < wlArr.length; i++){
        if(wlArr[i] === url){
            wlArr.splice(i, 1);
            txtBox.textContent = url + " was deleted";
            document.body.appendChild(txtBox);

            removeFromWhiteList(url);
            url = null;
            return;
        }
    }
    wlArr.push(url);

    console.log(url);

    txtBox.textContent = url;
    document.body.appendChild(txtBox);

    for (let a = 0; a < wlArr.length; a++) {
        appendWhiteList(wlArr[a]);
    }
}

function submitBlacklist() {
    let url = document.getElementById("blacklist").value;
    const txtBox = document.createElement('h2');

    for(let i = 0; i < blArr.length; i++){
        if(blArr[i] === url){
            blArr.splice(i, 1);
            txtBox.textContent = url + " was deleted";
            document.body.appendChild(txtBox);

            removeFromBlackList(url);
            url = null;
            return;
        }
    }
    blArr.push(url);

    for (let a = 0; a < blArr.length; a++) {
        appendBlackList(blArr[a]);
    }

    txtBox.textContent = url;
    document.body.appendChild(txtBox);
}
