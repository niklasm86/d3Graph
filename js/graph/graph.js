var Graph = function() {
    var self = this;

    this.svg = null;
    this.margin = null;
    this.width = null;
    this.height = null;
    this.g = null;
    this.x = null;
    this.y = null;
    this.baseData = null;
    this.LineManager = null;
    this.GridManager = null;
    this.AxisManager = null;
    this.AreaCounter = null;
    this.newLineData = null;


    function getArea(){
        return self.AreaCounter.countArea(self.baseData, self.newLineData);
    }

    function printGraph() {
        getGraphData();
    }

    function getGraphData(){
        d3.tsv("data/data.csv", function (error, data) {
            if (error) {
                throw error
            }else{
                self.newLineData = [
                    { "xAxis": 0,   "yAxis": -5},
                    { "xAxis": 1000,   "yAxis": -2},
                    { "xAxis": 2000,   "yAxis": 5},
                    { "xAxis": 3000,   "yAxis": 6},
                    { "xAxis": 4000,   "yAxis": 8},
                    { "xAxis": 5000,   "yAxis": 9},
                    { "xAxis": 6000,   "yAxis": 10},
                    { "xAxis": 7000,   "yAxis": 11},
                    { "xAxis": 8000,   "yAxis": 13},
                    { "xAxis": 8760,  "yAxis": 16},
                ];

                self.baseData = data;
                initGraph();
            }
        });
    }

    function initGraph(){
        createBaseElements();
        initManagers();

        self.LineManager.createLine(self.newLineData, "line2", "areaFill2");
        self.LineManager.createLine(self.baseData, "line", "areaFill");

        self.GridManager.createGrid();
        self.AxisManager.createAxis();
    }

    function initManagers(){
        self.LineManager = new LineManager(self.g, self.height, self.svg, self.margin, self.x, self.y);
        self.GridManager = new GridManager(self.g, self.height, self.x, self.y, self.width, self.svg, self.margin);
        self.AxisManager = new AxisManager(self.g, self.height, self.x, self.y);
        self.AreaCounter = new AreaCounter();
    }

    function createBaseElements(){
        self.svg = d3.select("svg");
        self.margin = { top: 20, right: 20, bottom: 30, left: 50 };
        self.width = +self.svg.attr("width") - self.margin.left - self.margin.right;
        self.height = +self.svg.attr("height") - self.margin.top - self.margin.bottom;
        self.g = self.svg.append("g").attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");
        self.x = d3.scaleLinear().range([0, self.width]).domain([0,8760]);
        self.y = d3.scaleLinear().range([self.height, 100]).domain([self.baseData[0].yAxis,20]);
    }

    return {
        printGraph: printGraph,
        getArea: getArea,
    }
};


