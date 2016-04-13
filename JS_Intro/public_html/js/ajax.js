/* 
 * Ajax intro
 * 
 */

var BASE_PHONE_SERVICE_URL = "http://localhost:8383/JS_Intro/phones/";

function init() {
    var xhr = getXmlHttp();
    if (!xhr)
        return;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                successCallback(xhr);
            } else {
                errorCallback(xhr);
            }
        }
    };

    xhr.open("GET", BASE_PHONE_SERVICE_URL + "phones.json", true);
    xhr.send();
}

function getXmlHttp() {
    var xmlhttp;
    if (typeof XMLHttpRequest !== "undefined") {
        xmlhttp = new XMLHttpRequest();
    } else {
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
        }
        if (xmlhttp === null) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
            }
        }
    }
    return xmlhttp;
}

function successCallback(xhr) {
    try {
        var responseObj = JSON.parse(xhr.responseText);
        showResults(responseObj);
    } catch (e) {
        document.getElementById("errors").innerHTML = e;
    }
}

function errorCallback(xhr) {
   document.getElementById("errors").innerHTML = xhr.statusText;
}

function showResults(jsonPhonesArray) {
    var resElem = document.getElementById("results");
    var html = "<table>";
    jsonPhonesArray.forEach(function (val, index, array) {
        html += "<tr><td><img src='" + val.imageUrl
                + "'></td><td>" + val.name
                + "</td><td>" + val.snippet
                + "</td></tr>";
    });
    html += "</table>";
    resElem.innerHTML = html;
}

