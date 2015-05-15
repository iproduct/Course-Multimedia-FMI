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
            $( "#phones-master" ).empty();
            $.each(phonesData, function(index, phone) {
                $( "#phones-master" ).append( "<div class='row' data-id='" +
                        phone.id + "'>" +
                    "<div class='phone-image col-xs-12 col-sm-3'>" +
                    "<img class='img-responsive' src='" + phone.imageUrl + 
                    "' alt='" + phone.name + " picture'></div>" +
                    "<div class='col-xs-8 col-sm-3'>" + phone.name + "</div>" +
                    "<div class='col-xs-4 col-sm-1''>" + phone.age + "</div>" +
                    "<div class='col-xs-12 visible-xs section-title'>Description:</div>" +
                    "<div class='col-xs-12 col-sm-5'>" + phone.snippet + "</div>" +
                  "</div>" );
            });
            // add click listeners to all phones
            $("#phones-master .row").click(function(){
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
    
//    var dialog = $( "#phone_details" ).dialog({
//        title: "Phone Details for ",
//        autoOpen: false,
//        height: 600,
//        width: 800,
//        modal: false,
//        buttons: {
//          "Add to Cart": function(){ console.log("Phone added to cart");},
//          Cancel: function() {
//            dialog.dialog( "close" );
//          }
//        },
//        close: function() {
////          form[ 0 ].reset();
////          allFields.removeClass( "ui-state-error" );
//        }
//    });
    
    function showDetails(phoneId){
        var jqxhr = $.get("phones/" + phoneId + ".json")
        .done(function (phoneData) {
//            dialog.dialog( "option", "title", phoneData.name + " Details" );
//            dialog.dialog( "close" );
//            dialog.dialog( "open" );
            updateCarouselImages(phoneData.images);         
            $('#phone-details').modal('show'); //Open Bootstrap way dialog
            $.each(phoneData, function( key, sectionData ){    
                var itemData = sectionData;
                try {
                    itemData = "<ul class='list-group'>";
                    $.each(sectionData, function( itemKey, sectionItem) {
                       itemData += "<li class='list-group-item row'><span class='property-label'>" + itemKey + 
                            + "</span><span class='property-data'>" + sectionItem + "</span></li>";
                    });
                    itemData += "</ul>";
                } catch (e){ console.log(e);}
                $("#phone-details-list")
                    .append("<div class='panel panel-info'><div class='panel-heading'>"
                    + "<h3 class='panel-title'>" + key + "</h3></div>"
                    + "<div class='panel-body' >" + itemData + "</div></div>");

            });
        });
        
    }
    
    
    function updateCarouselImages(images){
        console.log("Images: " + images);
        $(".carousel-indicators").empty();
        $(".carousel-inner").empty();
        $.each(images, function(index, image) {
            $(".carousel-indicators")
            .append("<li " + ((index === 0)?" class='active'":"")
            + " data-target='#carousel-example-generic' data-slide-to='" 
                + index +"'></li>");
            $(".carousel-inner")
            .append("<div class='item " + ((index === 0)?"active":"") + "'>"
            + "<img class='img-responsive center-block' src='" + image + "' alt='" + image + "'>"
            + "</div></li>");
        });
    }
});