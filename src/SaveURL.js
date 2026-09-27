
populateWL();
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


function submitWhitelist() {
    let url = document.getElementById("whitelist").value;
    wlArr.push(url);

    console.log(url);

    const txtBox = document.createElement('h3');
    txtBox.textContent = url;
    document.body.appendChild(txtBox);

    for (let a = 0; a < wlArr.length; a++) {
        appendWhiteList(wlArr[a]);
    }
}

function submitBlacklist() {
    let url = document.getElementById("blacklist").value;
    blArr.push(url);

    const txtBox = document.createElement('h2');
    txtBox.textContent = url;
    document.body.appendChild(txtBox);
}
