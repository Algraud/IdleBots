function load(){
    drawGrid()
}

function drawGrid() {
    var grid = document.getElementById("grid");
    var cols = 10;
    var rows = 10;
    var idText = "cell";
    var counter = 0;
    for (var i = 0; i < rows; i++){
        var row = document.createElement("ul");
        grid.insertBefore(row,grid.childNodes[0]);
        row.setAttribute("id","row" + 1);
        row.className = "arenaRow";
        for(var x=0;x<cols;x++){
            var cell = document.createElement("li");
            cell.setAttribute("id",idText + counter);
            row.appendChild(cell);
            cell.style.width = (100 / cols) + "%";
            cell.style.paddingTop = ((100 / cols) / 19)+ "vh";
            cell.style.paddingBottom = ((100 / cols) / 19) + "vh";
            cell.style.fontSize = ((cols / 14) + 1) + "vh";
            var className = "arenaCell";
            cell.className = className;
            counter++;
        }
    }
}

load();