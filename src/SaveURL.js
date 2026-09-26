document.getElementById("submitURL").addEventListener("click", submitURL);

const printURL = document.getElementById("urlResult");
const urlArr = [];

function submitURL() {

    let url = document.getElementById("whitelist").value;
    printURL.textContent = url;
}