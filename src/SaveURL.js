
document.getElementById("submitWhitelist").addEventListener("click", submitWhitelist);
document.getElementById("submitBlacklist").addEventListener("click", submitBlacklist);

const wlArr = [];
const blArr = [];


function submitWhitelist() {
    let url = document.getElementById("whitelist").value;
    const txtBox = document.createElement('h3');

    for(let i = 0; i < wlArr.length; i++){
        if(wlArr[i] === url){
            wlArr.splice(i, 1);
            txtBox.textContent = url + " was deleted";
            url = null;
            document.body.appendChild(txtBox);
            return;
        }
    }
    wlArr.push(url);

    console.log(url);

    txtBox.textContent = url;
    document.body.appendChild(txtBox);
}

function submitBlacklist() {
    let url = document.getElementById("blacklist").value;
        const txtBox = document.createElement('h2');

    for(let i = 0; i < blArr.length; i++){
        if(blArr[i] === url){
            blArr.splice(i, 1);
            txtBox.textContent = url + " was deleted";
            url = null;
            document.body.appendChild(txtBox);
            return;
        }
    }
    blArr.push(url);

    txtBox.textContent = url;
    document.body.appendChild(txtBox);
}
