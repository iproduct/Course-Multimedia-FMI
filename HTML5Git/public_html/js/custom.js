/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function showInfo(event) {
    document.getElementById("display").innerHTML = "<b>Hello from JavaScript - Mouse Button: " + event.button + "</b>";
}


function changeSrc() {
    document.getElementById("picture_html").src = "img/html.png";
}

function changeBack() {
    document.getElementById("picture_html").src = "img/HTML5_logo.png";
}

function highlight(containerId, inputId) {
    var keyword = document.getElementById(inputId).value.trim();
    console.log(keyword);
    var text = document.getElementById(containerId).innerHTML;
    console.log(text);
    var index = 0;
    var found, replacement="";
    do {
        index = text.toUpperCase().indexOf(keyword.toUpperCase(), index + replacement.length);
        if(index !== -1) {
            found = text.substr(index, keyword.length);
            replacement = "<span class='highlight'>" + found + "</span>";
            text = text.substr(0,index) + replacement
                    + text.substring(index + keyword.length);
        }
    } while (index !== -1);
    document.getElementById(containerId).innerHTML = text;
}