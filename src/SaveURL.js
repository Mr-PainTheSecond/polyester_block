document.getElementById("submitWhitelist").addEventListener("click", submitWhitelist);
document.getElementById("submitBlacklist").addEventListener("click", submitBlacklist);

const urlArr = [];

function submitWhitelist() {
    let url = document.getElementById("whitelist").value;
    urlArr.push(url);

    const txtBox = document.createElement('h3');
    txtBox.textContent = url;
    document.body.appendChild(txtBox);
}

function submitBlacklist() {
    let url = document.getElementById("blacklist").value;
    urlArr.push(url);

    const txtBox = document.createElement('h2');
    txtBox.textContent = url;
    document.body.appendChild(txtBox);
}
