const currentUrl = window.location.href;
function parseURLParams(url) {
    let queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;
    if (query === url || query === "") return;
    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

let key = parseURLParams(currentUrl)["query"][0];


let lableText = document.getElementById('productName');
lableText.appendChild(key);

let img =document.getElementById('productIMG');
img.src= "images/productdata/productimg/"+key+".png";

fetch('https://rahulkandwal19.pythonanywhere.com/chemical_found?key=' + key)
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        let result = myJson.result;
        const tokens = result.toString().split('+');
        const len = tokens.length;
        let value = "";
        for (let i=0; i < len; i++) {
            value = tokens[i];
            if (value === "") continue;
            let div = document.getElementById('chemicalfound');

            let chemical_info_url = document.createElement("a")
            chemical_info_url.href="chemical_info.html?result="+value
            let chemical_button = document.createElement('button');
            chemical_button.innerHTML = value;
            chemical_button.classList.add("chemicalbutton");
            chemical_info_url.appendChild(chemical_button);
            div.appendChild(chemical_info_url);
        }
    });