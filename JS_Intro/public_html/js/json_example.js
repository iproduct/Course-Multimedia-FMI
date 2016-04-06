/* 
 * JSON examples
 */
function init() {
    var text = '{"name":"John Johnson","street":"Oslo West 16","phone":"555 1234567"}'

//   eval("var obj=" + text);
    var obj = JSON.parse(text);

//    document.getElementById("output").innerHTML =
//            obj.name + "<br>" +
//            obj.street + "<br>" +
//            obj.phone;

    var xmlhttp = new XMLHttpRequest();
    var url = "http://www.w3schools.com/website/Customers_MYSQL.php";

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(response) {
        var arr = JSON.parse(response);
        var i;
        var out = "<table>";

        for (i = 0; i < arr.length; i++) {
            out += "<tr><td>" +
                    arr[i].Name +
                    "</td><td>" +
                    arr[i].City +
                    "</td><td>" +
                    arr[i].Country +
                    "</td></tr>";
        }
        out += "</table>";
        document.getElementById("output").innerHTML = out;
    }
}


