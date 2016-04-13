/* 
 * IPT Bootstrap and jQuery demo
 */

$(document).ready(function () {
    // initialize lightbox
    $('.thumbnail').click(function () {
        $('.modal-body').empty();
        var title = $(this).parent('a').attr("title");
        $('.modal-title').html(title);
        $($(this).parents('div').html()).appendTo('.modal-body');
        $('#myModal').modal({show: true});
    });

    //Charts
    colors = [
        {color: "#F7464A", highlight: "#FF5A5E"},
        {color: "#46BFBD", highlight: "#5AD3D1"},
        {color: "#FDB45C", highlight: "#FFC870"},
        {color: "#949FB1", highlight: "#A8B3C5"},
        {color: "#4D5360", highlight: "#616774"}
    ];
    var samplePieData = [
      /*  {
            value: 1,
            color: "#F7464A",
            highlight: "#FF5A5E",
            label: "No votes yet"
        },
        {
            value: 50,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "No votes yet"
        },
        {
            value: 100,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "No votes yet"
        },*/
        {
            value: 1,
            color: "#949FB1",
            highlight: "#A8B3C5",
            label: "No votes yet"
        }
      /*  {
            value: 120,
            color: "#4D5360",
            highlight: "#616774",
            label: "No votes yet"
        }*/
    ];
    
    $.extend($, {charts: []});
    $(".chart-area").each(function () {
        var elemId = $(this).attr("id");
        var chartDataJson = $(this).attr("data-chart").trim();
        var pieData = samplePieData;
        if (chartDataJson.length > 0) {
            var chartData = JSON.parse(chartDataJson);
            if ($.isArray(chartData) && chartData.length > 0) {
                var maxValue = 0;
                pieData = chartData.map(function (obj, index) {
                    maxValue = Math.max(obj.value, maxValue);
                    return $.extend(obj, colors[index % colors.length]);
                });
                if(maxValue === 0) {
                    pieData = samplePieData;
                }
            }
        }
        var domElem = $(this).get(0);
        var ctx = domElem.getContext("2d");
        $.charts[elemId] = new Chart(ctx).Pie(pieData);
    });

});

