function get(file, callback) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }

    xmlHttp.open("GET", file, true); // true for asynchronous 
    xmlHttp.send(null);
}

export function readFileAndSetHtml(id, file) {
    var element = document.getElementById(id);

    get(file, (data) => {
        element.innerHTML = data;
    })
}