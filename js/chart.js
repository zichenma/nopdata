
var d3Graphic = function () {
    if (localStorage.getItem("data") === null) {
        alert("Please upload your data first!")
    }
    else {
        try{
        var data = JSON.parse(localStorage["data"]);
        render(data);
        } catch (e) {
            return alert("Only support json format");
        }
      
    }
}


function render(data) {
    console.log(data);
    var ndx = crossfilter(data.Order);
    var parseDate = d3.time.format("%m");
   


    data.Order.forEach(function (d) {
        d.date = parseDate(new Date(d.CreatedOnUtc));
        d.total = d.OrderTotal;
        d.month = new Date(d.CreatedOnUtc).getMonth();

    });

    // print_filter(data.Order);

    var dateDim = ndx.dimension(function (d) { return d.date; });
    var sales = dateDim.group().reduceSum(function (d) { return d.total; });
    var minDate = dateDim.bottom(1)[0].date;
    var maxDate = dateDim.top(1)[0].date;

    var monthDim = ndx.dimension(function (d) {

        return d.month + 1
    });


    var month_total = monthDim.group().reduceSum(function (d) { return d.total });



    var salesChart = dc.lineChart("#chart-line-hitsperday");
    salesChart
    .width(700).height(400)
    .dimension(dateDim)
    .group(sales)
    .x(d3.time.scale().domain([minDate, maxDate]))
    .brushOn(true)
    .yAxisLabel("Sales")
    .xAxisLabel("Month");

    var chart = dc.pieChart("#chart-ring-month");
    chart
        .width(384)
        .height(340)
        .innerRadius(70)
        .dimension(monthDim)
        .group(month_total)
        .label(function (d) {
            return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
        })
        .legend(dc.legend().x(80).y(70).itemHeight(13).gap(5));

    dc.renderAll();
    //var customerIdDim = ndx.dimension(function (d) {
    //    return d.CustomerId;
    //});
    //var id_filter = IdDim.filter("24182");
    ////print_filter(id_filter);

    //var total = customerIdDim.group().reduceSum(function (d) {
    //    return d.OrderTotal;
    //});
    //var groupAll_total = ndx.groupAll().reduceSum(function (d) {
    //    return d.OrderTotal;
    //}).value();

    // print_filter(total);
    //console.log("gourp_all =" + groupAll_total);

}
function print_filter(filter) {
    var f = eval(filter);
    if (typeof (f.length) != "undefined") { } else { }
    if (typeof (f.top) != "undefined") { f = f.top(Infinity); } else { }
    if (typeof (f.dimension) != "undefined") { f = f.dimension(function (d) { return ""; }).top(Infinity); } else { }
    console.log(filter + "(" + f.length + ") = " + JSON.stringify(f).replace("[", "[\n\t").replace(/}\,/g, "},\n\t").replace("]", "\n]"));
}