/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery.noConflict();
jQuery(function ($) {
    // get phone list json
    function loadPhonesList() {
        var jqxhr = $.get("phones/phones.json", function () {
            console.log("Phones list successfully receceived.");
        })
        .done(function (phonesData) {
            console.log("Data:", phonesData);
            $.each(phonesData, function(index, phone) {
                $( "#phones tbody" ).append( "<tr>" +
                    "<td>" + index + "</td>" +
                    "<td><img src='" + phone.imageUrl + 
                    "' alt='" + phone.name + " picture'></td>" +
                    "<td>" + phone.name + "</td>" +
                    "<td>" + phone.snippet + "</td>" +
                  "</tr>" );
            });
        })
        .fail(function () {
            alert("No connection to phone shop server.");
        });
    }
    
    loadPhonesList();
    $("#refresh_phones").click(function() {
        loadPhonesList();
    })
});