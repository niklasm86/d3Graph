var LineManager = function(g, height, svg, margin, x, y) {
    
    function createLine(data, lineClass, fillClass) {
        addLine(data, lineClass);
        addLineAreaFill(data, fillClass);
    }

    function addLine(data, lineClass){

        var line = d3.line()
            .x(function (d) { return x(d.xAxis); })
            .y(function (d) { return y(d.yAxis); });

        g.append("path")
            .datum(data)
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 30)
            .attr("class", lineClass);
    }

    function addLineAreaFill(data, fillClass){

        // define the area
        var area = d3.area()
            .x(function(d) { return x(d.xAxis); })
            .y0(height)
            .y1(function(d) { return y(d.yAxis); });

        // add the area
        svg.append("path")
            .data([data])
            .attr("class", fillClass)
            .attr("d", area)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }

    return {
        createLine: createLine
    }
};
