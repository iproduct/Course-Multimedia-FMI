/* 
 * Ajax intro
 * 
 */

(function ($) {
    $(function () {

        var BASE_PHONE_SERVICE_URL = "http://localhost:8383/JS_Intro/phones/";
        var phones;
        $.getJSON(BASE_PHONE_SERVICE_URL + "phones.json", function (data) {
            phones = data;
            showResults(data);
            $("tr").css({opacity: 0.7});
            $("#results tr").hover(function () {
                $(this).animate({opacity: "1"}, 500);
                var id = $(this).attr("id");
                $.getJSON(BASE_PHONE_SERVICE_URL + id + ".json", function (data) {
                    $("#detail_img").attr("src", data.images[0]);
                    $("#detail_name").html(data.name);
                    $("#detail_descr").html(data.description);
                });
            }, function () {
                $(this).animate({"opacity": "0.8"}, 500);
            });
        });
//        function successCallback(xhr) {
//            try {
//                var responseObj = JSON.parse(xhr.responseText);
//                showResults(responseObj);
//            } catch (e) {
//                document.getElementById("errors").innerHTML = e;
//            }
//        }
//
//        function errorCallback(xhr) {
//            document.getElementById("errors").innerHTML = xhr.statusText;
//        }

        function showResults(jsonPhonesArray) {
            var html = "<table>";
            jsonPhonesArray.forEach(function (val, index, array) {
                html += "<tr id='" + val.id + "'><td><img src='" + val.imageUrl
                        + "'></td><td>" + val.name
                        + "</td><td>" + val.snippet
                        + "</td></tr>";
            });
            html += "</table>";
            $("#results").html(html);
        }






//        $.getJSON("ajax/test.json", function (data) {
//            var items = [];
//            $.each(data, function (key, val) {
//                items.push("<li id='" + key + "'>" + val + "</li>");
//            });
//
//            $("<ul/>", {
//                "class": "my-new-list",
//                html: items.join("")
//            }).appendTo("body");
//        });
    });
}(jQuery)
        );
