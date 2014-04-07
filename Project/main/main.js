/////**
//// * Created by Adam on 3/27/14.
//// */
////
////console.log("testing2");
////
////
//////Get context with jQuery - using jQuery's .get() method.
////var ctx = $("#myChart").get(0).getContext("2d");
////
////
//////Get the context of the canvas element we want to select
////var ctx = document.getElementById("myChart").getContext("2d");
////var myNewChart = new Chart(ctx).PolarArea(data);
//////This will get the first returned node in the jQuery collection.
////var myNewChart = new Chart(ctx);
////
////new Chart(ctx).Line(data,options);
////
////var data = {
////    labels : ["January","February","March","April","May","June","July"],
////    datasets : [
////        {
////            fillColor : "rgba(220,220,220,0.5)",
////            strokeColor : "rgba(220,220,220,1)",
////            pointColor : "rgba(220,220,220,1)",
////            pointStrokeColor : "#fff",
////            data : [65,59,90,81,56,55,40]
////        },
////        {
////            fillColor : "rgba(151,187,205,0.5)",
////            strokeColor : "rgba(151,187,205,1)",
////            pointColor : "rgba(151,187,205,1)",
////            pointStrokeColor : "#fff",
////            data : [28,48,40,19,96,27,100]
////        }
////    ]
////}
////
////Line.defaults = {
////
////    //Boolean - If we show the scale above the chart data
////    scaleOverlay : false,
////
////    //Boolean - If we want to override with a hard coded scale
////    scaleOverride : false,
////
////    //** Required if scaleOverride is true **
////    //Number - The number of steps in a hard coded scale
////    scaleSteps : null,
////    //Number - The value jump in the hard coded scale
////    scaleStepWidth : null,
////    //Number - The scale starting value
////    scaleStartValue : null,
////
////    //String - Colour of the scale line
////    scaleLineColor : "rgba(0,0,0,.1)",
////
////    //Number - Pixel width of the scale line
////    scaleLineWidth : 1,
////
////    //Boolean - Whether to show labels on the scale
////    scaleShowLabels : true,
////
////    //Interpolated JS string - can access value
////    scaleLabel : "<%=value%>",
////
////    //String - Scale label font declaration for the scale label
////    scaleFontFamily : "'Arial'",
////
////    //Number - Scale label font size in pixels
////    scaleFontSize : 12,
////
////    //String - Scale label font weight style
////    scaleFontStyle : "normal",
////
////    //String - Scale label font colour
////    scaleFontColor : "#666",
////
////    ///Boolean - Whether grid lines are shown across the chart
////    scaleShowGridLines : true,
////
////    //String - Colour of the grid lines
////    scaleGridLineColor : "rgba(0,0,0,.05)",
////
////    //Number - Width of the grid lines
////    scaleGridLineWidth : 1,
////
////    //Boolean - Whether the line is curved between points
////    bezierCurve : true,
////
////    //Boolean - Whether to show a dot for each point
////    pointDot : true,
////
////    //Number - Radius of each point dot in pixels
////    pointDotRadius : 3,
////
////    //Number - Pixel width of point dot stroke
////    pointDotStrokeWidth : 1,
////
////    //Boolean - Whether to show a stroke for datasets
////    datasetStroke : true,
////
////    //Number - Pixel width of dataset stroke
////    datasetStrokeWidth : 2,
////
////    //Boolean - Whether to fill the dataset with a colour
////    datasetFill : true,
////
////    //Boolean - Whether to animate the chart
////    animation : true,
////
////    //Number - Number of animation steps
////    animationSteps : 60,
////
////    //String - Animation easing effect
////    animationEasing : "easeOutQuart",
////
////    //Function - Fires when the animation is complete
////    onAnimationComplete : null
////
////}
////
////
////$('#nav1').click(function() {
////    serverdata = "Pretend I'm data fetched from server #1."
////    $('#updatepage').text(serverdata);
////
////    console.log("testing");
////    return false;
////});
////
////$('#nav2').click(function() {
////    serverdata = "Pretend I'm data fetched from another server far, far away."
////    $('#updatepage').text(serverdata);
////    console.log("testing");
////    return false;
////});
////
//
//// new stuff
//var chart;
//var graph;
//
//// note, some of tada points don't have value field
//var chartData = [{
//    year: new Date(1950, 0),
//    value: -0.307
//}, {
//    year: new Date(1951, 0),
//    value: -0.168
//}, {
//    year: new Date(1952, 0),
//    value: -0.073
//}, {
//    year: new Date(1953, 0),
//    value: -0.027
//}, {
//    year: new Date(1954, 0),
//    value: -0.251
//}, {
//    year: new Date(1955, 0),
//    value: -0.281
//}, {
//    year: new Date(1956, 0),
//    value: -0.348
//}, {
//    year: new Date(1957, 0),
//    value: -0.074
//}, {
//    year: new Date(1958, 0),
//    value: -0.011
//}, {
//    year: new Date(1959, 0),
//    value: -0.074
//}, {
//    year: new Date(1960, 0),
//    value: -0.124
//}, {
//    year: new Date(1961, 0),
//    value: -0.024
//}, {
//    year: new Date(1962, 0),
//    value: -0.022
//}, {
//    year: new Date(1963, 0),
//    value: 0.000
//}, {
//    year: new Date(1964, 0),
//    value: -0.296
//}, {
//    year: new Date(1965, 0),
//    value: -0.217
//}, {
//    year: new Date(1966, 0),
//    value: -0.147
//}, {
//    year: new Date(1967, 0)
//}, {
//    year: new Date(1968, 0)
//}, {
//    year: new Date(1969, 0)
//}, {
//    year: new Date(1970, 0)
//}, {
//    year: new Date(1971, 0),
//    value: -0.190
//}, {
//    year: new Date(1972, 0),
//    value: -0.056
//}, {
//    year: new Date(1973, 0),
//    value: 0.077
//}, {
//    year: new Date(1974, 0),
//    value: -0.213
//}, {
//    year: new Date(1975, 0),
//    value: -0.170
//}, {
//    year: new Date(1976, 0),
//    value: -0.254
//}, {
//    year: new Date(1977, 0),
//    value: 0.019
//}, {
//    year: new Date(1978, 0),
//    value: -0.063
//}, {
//    year: new Date(1979, 0),
//    value: 0.050
//}, {
//    year: new Date(1980, 0),
//    value: 0.077
//}, {
//    year: new Date(1981, 0),
//    value: 0.120
//}, {
//    year: new Date(1982, 0),
//    value: 0.011
//}, {
//    year: new Date(1983, 0),
//    value: 0.177
//}, {
//    year: new Date(1984, 0)
//}, {
//    year: new Date(1985, 0)
//}, {
//    year: new Date(1986, 0)
//}, {
//    year: new Date(1987, 0)
//}, {
//    year: new Date(1988, 0)
//}, {
//    year: new Date(1989, 0),
//    value: 0.104
//}, {
//    year: new Date(1990, 0),
//    value: 0.255
//}, {
//    year: new Date(1991, 0),
//    value: 0.210
//}, {
//    year: new Date(1992, 0),
//    value: 0.065
//}, {
//    year: new Date(1993, 0),
//    value: 0.110
//}, {
//    year: new Date(1994, 0),
//    value: 0.172
//}, {
//    year: new Date(1995, 0),
//    value: 0.269
//}, {
//    year: new Date(1996, 0),
//    value: 0.141
//}, {
//    year: new Date(1997, 0),
//    value: 0.353
//}, {
//    year: new Date(1998, 0),
//    value: 0.548
//}, {
//    year: new Date(1999, 0),
//    value: 0.298
//}, {
//    year: new Date(2000, 0),
//    value: 0.267
//}, {
//    year: new Date(2001, 0),
//    value: 0.411
//}, {
//    year: new Date(2002, 0),
//    value: 0.462
//}, {
//    year: new Date(2003, 0),
//    value: 0.470
//}, {
//    year: new Date(2004, 0),
//    value: 0.445
//}, {
//    year: new Date(2005, 0),
//    value: 0.470
//}];
//
//
//AmCharts.ready(function () {
//    // SERIAL CHART
//    chart = new AmCharts.AmSerialChart();
//
//    chart.pathToImages = "/main/amcharts_3.4.7.free/amcharts/images";
//    chart.marginTop = 0;
//    chart.marginRight = 0;
//    chart.dataProvider = chartData;
//    chart.categoryField = "year";
//    chart.zoomOutButton = {
//        backgroundColor: '#000000',
//        backgroundAlpha: 0.15
//    };
//
//    // AXES
//    // category
//    var categoryAxis = chart.categoryAxis;
//    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
//    categoryAxis.minPeriod = "YYYY"; // our data is yearly, so we set minPeriod to YYYY
//    categoryAxis.dashLength = 1;
//    categoryAxis.axisColor = "#DADADA";
//
//    // value
//    var valueAxis = new AmCharts.ValueAxis();
//    valueAxis.axisAlpha = 0;
//    valueAxis.dashLength = 1;
//    valueAxis.inside = true;
//    chart.addValueAxis(valueAxis);
//
//    // GRAPH
//    graph = new AmCharts.AmGraph();
//    graph.lineColor = "#b6d278";
//    graph.negativeLineColor = "#487dac"; // this line makes the graph to change color when it drops below 0
//    graph.bullet = "round";
//    graph.bulletSize = 5;
//    graph.connect = false; // this makes the graph not to connect data points if data is missing
//    graph.lineThickness = 2;
//    graph.valueField = "value";
//    chart.addGraph(graph);
//
//    // CURSOR
//    var chartCursor = new AmCharts.ChartCursor();
//    chartCursor.cursorAlpha = 0;
//    chartCursor.cursorPosition = "mouse";
//    chartCursor.categoryBalloonDateFormat = "YYYY";
//    chart.addChartCursor(chartCursor);
//
//    // WRITE
//
//    chart.write("tab2");
//});
//
//$(function() {
//    $( "#tabs" ).tabs({
//        select: function(event, ui) {
//            console.log('Calling chart.invalidateSize()');
//            chart.invalidateSize();
//        }
//    });
//});
//

//same selector here
$(document).delegate('.ui-navbar ul li > a', 'click', function () {

    //un-highlight and highlight only the buttons in the same navbar widget
    $(this).closest('.ui-navbar').find('a').removeClass('ui-navbar-btn-active');

    //this bit is the same, you could chain it off of the last call by using two `.end()`s
    $(this).addClass('ui-navbar-btn-active');

    //this starts the same but then only selects the sibling `.content_div` elements to hide rather than all in the DOM
    $('#' + $(this).attr('data-href')).show().siblings('.content_div').hide();
})
//
//$("a[data-role=tab]").each(function () {
//    var anchor = $(this);
//    anchor.bind("click", function () {
//        $.mobile.changePage(anchor.attr("href"), {
//            transition: "none",
//            changeHash: false
//        });
//        return false;
//    });
//});
//
//$("div[data-role=page]").bind("pagebeforeshow", function (e, data) {
//    $.mobile.silentScroll(0);
//});

//$('div[data-role="navbar"] a').live('click', function () {
//    $(this).addClass('ui-btn-active');
//    $('div.content_div').hide();
//    $($(this).attr('data-href')).show();
//});
//
//
//$(document).delegate('[data-role="navbar"] a', 'click', function ()  {
//    $(this).addClass('ui-btn-active');
//    $('div.content_div').hide();
//    $($(this).attr('data-href')).show();
//  });
//


