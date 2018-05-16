var AxisManager = function(g, height, x, y) {

    function createAxis() {

        var yAxis = d3.axisLeft(y);
        yAxis.tickSize(10);
        yAxis.tickPadding(10);

        var xAxis = d3.axisBottom(x);
        xAxis.tickValues([0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 8760]);

        g.append("g")
            .call(xAxis)
            .attr("transform", "translate(0," + height + ")");

        g.append("g")
            .call(yAxis)
            .append("text")
            .attr("fill", "#000")
            .attr("y", 10)
            .attr("x", 20)
            .attr("dy", "0.71em")
            .attr("text-anchor", "start")
            .text("Y AXEL");
    }


    return {
        createAxis: createAxis
    }
};
