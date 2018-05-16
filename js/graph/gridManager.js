var GridManager = function(g, height, scaleX, scaleY, width, svg, margin) {

    var self = this;

    this.ticksY = 20;
    this.ticksX = 50;
    this.gridlineX;
    this.gridlineY;
    this.label;
    this.circle = null;
    this.circlePossitionX;
    this.circlePossitionY;

    function createGrid() {

        addGridLineY();
        addGridLineX();
        init3DMouseEvents();
        addLabel();
    }

    function addGridLineY(){
        self.gridlineY = g.append("g")
            .attr("class", "gridY")
            .call(d3.axisLeft(scaleY)
                .ticks(self.ticksY)
                .tickSize(-width)
                .tickFormat("")
            )
    }

    function addGridLineX(){
        self.gridlineX = g.append("g")
            .attr("class", "gridX")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(scaleX)
                .ticks(self.ticksX)
                .tickSize(-height)
                .tickFormat("")
            )
    }

    function init3DMouseEvents(){
        svg.on('mouseover', function(d, i) {

            if (d3.event.target.parentNode.parentNode.classList.value === 'gridX'){

                if (self.circle){
                    self.circle.remove();
                }

                var coords = d3.mouse(this);
                self.circle = drawHoverCircle(coords[0], coords[1]);

                self.circlePossitionX = d3.event.target.__data__;
                self.circlePossitionY = Math.round(scaleY.invert(coords[1]- margin.top) * 10)/10;
                updateLabelText();
                updateLabelPossition(coords[0], coords[1]);
            }
        });
    }
    
    function drawHoverCircle(x, y) {
        return svg.append("circle")
            .attr('class', 'hover-circle')
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 10)
            .attr("fill", "steelblue")
            .style("cursor", "pointer")
            .style("pointer-events", "all")
            .on('mousemove', function(){
                var coords = d3.mouse(this);
                updateCirclePossitionY(coords[1])
                self.circlePossitionY = Math.round(scaleY.invert(coords[1]- margin.top) * 10)/10;
                updateLabelText();
                updateLabelPossition(coords[0], coords[1]);
            })
            .on('click', function(d, i) {
                var coords = d3.mouse(this);
                updateCirclePossitionY(coords[1])
                drawLineCircle(coords[0], coords[1]);
            });
    }

    function drawLineCircle(x, y){
        svg.append("circle")
            .attr('class', 'line-circle')
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 5)
            .attr("fill", "steelblue")
            .style("cursor", "pointer")
            .style("pointer-events", "all")
    }

    function updateCirclePossitionY(y){
        self.circle.attr("cy", y);
    }

    function addLabel(){
        self.label = g.append("text")
            .text('ASD')
    }

    function updateLabelText(){
        self.label
        .text(self.circlePossitionY + "°C / " + self.circlePossitionX + "h")
        .attr("fill", "black");
    }

    function updateLabelPossition(x, y){

        self.label.attr("x", x);
        self.label.attr("y", y);
    }

    return {
        createGrid: createGrid
    }
};
