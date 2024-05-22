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
    fetch('rahulkandwal19.pythonanywhere.com/search_result?key=' + key)
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
                let div = document.getElementById('resultSection');

                let result_url = document.createElement("a")
                result_url.href="result.html?result="+value
                let result_button = document.createElement('button');

                result_button.classList.add("result");
                result_button.innerHTML = '<img src = "images/productdata/productimg/'+value+'.png" class="buttonimg" alt="result of search">'+value;
                result_url.appendChild(result_button);
                div.appendChild(result_url);

            }
        });