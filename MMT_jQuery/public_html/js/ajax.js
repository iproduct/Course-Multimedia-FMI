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
//            console.log("Data:", phonesData);
            $( "#phones tbody" ).empty();
            $.each(phonesData, function(index, phone) {
                $( "#phones tbody" ).append( "<tr data-id='" +
                        phone.id + "'>" +
                    "<td>" + index + "</td>" +
                    "<td><img src='" + phone.imageUrl + 
                    "' alt='" + phone.name + " picture'></td>" +
                    "<td>" + phone.name + "</td>" +
                    "<td>" + phone.age + "</td>" +
                    "<td>" + phone.snippet + "</td>" +
                  "</tr>" );
            });
            // add click listeners to all phones
            $("#phones tbody tr").click(function(){
                var phoneId = $(this).attr("data-id");
                console.log(phoneId);
                showDetails(phoneId);
            });
        })
        .fail(function () {
            alert("No connection to phone shop server.");
        });
    }
    
    loadPhonesList();
    $("#refresh_phones").click(function() {
        loadPhonesList();
    });
    
    var dialog = $( "#phone_details" ).dialog({
        autoOpen: false,
        height: 800,
        width: 600,
        modal: false,
        buttons: {
          "Add to Cart": function(){ console.log("Phone added to cart");},
          Cancel: function() {
            dialog.dialog( "close" );
          }
        },
        close: function() {
//          form[ 0 ].reset();
//          allFields.removeClass( "ui-state-error" );
        }
    });
    
    function showDetails(phoneId){
        var jqxhr = $.get("phones/" + phoneId + ".json")
        .done(function (phoneData) {
            dialog.dialog( "open" );
            $("#phone_details").html("<ul>");
            $.each(phoneData, function( key, sectionData ){
                console.log(key + "-->" + sectionData);
                var itemData = sectionData;
                try {
                    itemData = "<dl class='item'>";
                    $.each(sectionData, function( itemKey, sectionItem) {
                       itemData += "<dt>" + itemKey + "</dt>"
                            + "<dd>" + sectionItem + "</dd>";
                    });
                    itemData += "</dl>";
                } catch (e){}
                $("#phone_details ul")
                    .append("<li><h3>" + key + "</h3><div>" + itemData + "</div></li>");

            });
        });
        
    }
    
    
    function showPhoneDetailsDialog(phoneId){
    
    }
});