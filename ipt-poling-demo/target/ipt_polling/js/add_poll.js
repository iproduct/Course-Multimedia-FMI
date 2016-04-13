/* 
 * Bootstrap and jQuery demo
 */

//function init() {
//    document.getElementById("output").innerHTML = "Hello from JavaScript!";
//}

$(document).ready(function () {
    // initialize lightbox
    $('.thumbnail').click(function () {
        $('.modal-body').empty();
        var title = $(this).parent('a').attr("title");
        $('.modal-title').html(title);
        $($(this).parents('div').html()).appendTo('.modal-body');
        $('#myModal').modal({show: true});
    });

    // initialize sortables
    $("#alternatives-sortable").sortable({
        placeholder: "ui-state-highlight"
    });
    $("#alternatives-sortable").disableSelection();

    // Add/remove alternatives */
    $('#add-alternative').click(function () {
        var maxId = 0;
        $('#alternatives-sortable li').each(function () {
            maxId = Math.max(this.id, maxId);
        });
        maxId++; //next unique id
        $('#alternatives-sortable').append('\
            <li id="' + maxId + '" class="ui-state-default">\
                <div class="input-group"> \
                    <span class="input-group-addon label-success" id="basic-addon1">@</span> \
                    <input type="text" class="form-control" placeholder="Type alternative description here ..."> \
                    <span class="input-group-btn"> \
                        <button class="btn btn-default remove-alternative" type="button"  onclick="removeAlternative()">X</button> \
                    </span> \
                </div> \
            </li>');
        $("#alternatives-sortable").sortable("refresh");
        $('.remove-alternative').click(function () {
            $(this).parents('li').remove();
        });
    });

    //Submit poll
    $("#submit-poll").click(function () {
//        var sortedIDs = $('#alternatives-sortable').sortable("toArray");
        var alternativesText = "";
        $('#alternatives-sortable input').each(function () {
            alternativesText += $(this).val() + "|";
        });
        $('#alternatives').val(alternativesText);
        return true;
    })

    //Other
    $(".output").html("Hello from JavaScript!");
    $("#hide_all").mouseenter(function () {
        $(".output").fadeToggle(2000);
    });

});

