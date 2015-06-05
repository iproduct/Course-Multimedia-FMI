/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery.noConflict();
jQuery(function ($) {
    var USER_SERVICE_URL = "http://localhost:8080/MMT_User_Manager/resources/users";
    var MIME_TYPE_JSON = "application/json";
    
    $("#add-user").click(function () {
         $('#user-dialog').modal('show'); //Open Bootstrap way user dialog
    });
    
    $("#refresh-users").click(function () {
         loadUsersList();
    });
    
    $("#submit-user").click(function () {
        submitUserData();
    });

    $.fn.serializeObject = function ()
    {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    
    function submitUserData() {
        var user = $("#user-form").serializeObject();
        var userData = JSON.stringify(user);
        console.log(userData);
        $.ajax(USER_SERVICE_URL, {
            method: "POST",
            data: userData,
            contentType: MIME_TYPE_JSON,
        }).done( function(data){
            console.log("User Added Successfuly");
            $('#user-dialog').modal('hide');
            loadUsersList();
        }).error( function(err){
            console.log("Error Adding User: ", err);
        });
    }

    // get phone list json
    function loadUsersList() {
        var jqxhr =  $.ajax(USER_SERVICE_URL, {
            method: "GET",
            dataType: "json"
        })
        .done(function (usersData) {
            console.log("Data:", usersData);
            $("#users-master").empty();
            $.each(usersData, function (index, user) {
                $("#users-master").append(
                    "<div class='row' data-id='" + user.id + "'>" +
                        "<div class='col-xs-1 col-sm-1'>" + user.id + "</div>" +
                        "<div class='col-xs-11 col-sm-3'>" + user.name + "</div>" +
                        "<div class='col-xs-12 col-sm-3''>" + user.email + "</div>" +
                        "<div class='col-xs-12 col-sm-2''>" + user.username + "</div>" +
                        "<div class='col-xs-12 col-sm-3''>" + user.description + "</div>"+
                    "</div>")
            });
            // add click listeners to all phones
//                    $("#phones-master .row").click(function () {
//                        var phoneId = $(this).attr("data-id");
//                        console.log(phoneId);
//                        showDetails(phoneId);
//                    });
        })
        .fail(function () {
            alert("No connection to user management service.");
        });
    }

    loadUsersList();


});