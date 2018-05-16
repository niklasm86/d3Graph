
var Main = {

	Graph : new Graph(),

    init:function(){
        Main.Graph.printGraph();
        Main.addEventListeners();
    },

    addEventListeners:function(){
	    document.getElementsByClassName('checkbox')[0].addEventListener('click', function($event){
            document.getElementsByClassName('result')[0].innerHTML = Main.Graph.getArea();
        });
    }


}

document.body.onload = Main.init;