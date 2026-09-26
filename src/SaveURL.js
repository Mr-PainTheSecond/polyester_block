document.getElementById("submitURL").addEventListener("click", submitURL);

const printURL = document.getElementById("urlResult");
const urlArr = [];

function submitURL() {

    let cnt = 0;
    let url = document.getElementById("whitelist").value;
    urlArr.push(url);

    const txtBox = document.createElement('h3');
    txtBox.textContent = url;
    document.body.appendChild(txtBox);
    

    /*
    urlArr.forEach((url) => {
        const txtBox = document.createElement('h3');
        //txtBox.id = "urlResult" + String(cnt);
        txtBox.textContent = "";
        document.body.appendChild(txtBox);
    });
    */
}