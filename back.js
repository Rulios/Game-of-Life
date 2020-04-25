var tiles = {

};

$(document).ready(function () {

    
    
    let canvas = document.getElementById("canvasGrid");
    let cContext = canvas.getContext("2d");
    let isDrawing = false;

    
    drawGrid();
    
    
    canvas.addEventListener("mousedown", function(e){
        isDrawing = true;
    });

    canvas.addEventListener("mouseup", function(e){
        isDrawing = false;
    });

    canvas.addEventListener("mousemove", function(e){
        
        
        let mousePos = getMousePos(canvas,e);
        let roundedMousePos = {};
        
        roundedMousePos = roundMousePos(mousePos.x, mousePos.y);

        if(isDrawing == true){
            
            
            tiles[roundedMousePos.y / 10][roundedMousePos.x / 10] = 1;
            drawSquare(roundedMousePos.x, roundedMousePos.y);
            
        }
        
        
    });

    var intervalGame;
    $("#begin").click(function(e){

        intervalGame = setInterval(function(){
            beginGame();
        }, 100);
       
    });

    $("#stop").click(function(e){
        clearInterval(intervalGame);
    });

    $("#reset").click(function(e){
        let canvas = document.getElementById("canvasGrid");
        let cContext = canvas.getContext("2d");
        cContext.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
    });

});

function drawGrid(){
    let canvas = document.getElementById("canvasGrid");
    let cContext = canvas.getContext("2d");

    let canvasProp = {
        width: canvas.getBoundingClientRect().width,
        height: canvas.getBoundingClientRect().height
    };

    console.log(canvasProp);

    //draw vertical lines
    let penReference = {
        x: 0,
        y: 0
    };

    let allX = [];
    let allY = [];

    let loopLengthX = canvasProp.width / 10;
    let loopLengthY = canvasProp.height / 10;

    for(let i = 0; i < loopLengthX; i++){
        cContext.moveTo(penReference.x, 0);
        cContext.lineTo(penReference.x, canvasProp.height);

        allX.push(penReference.x);

        cContext.lineWidth = 1;
        cContext.strokeStyle = "#ddd";
        cContext.stroke();

        penReference.x += 10;
    }

    //draw horizontal

    for(let i = 0; i < loopLengthY; i++){
        
        cContext.moveTo(0, penReference.y);
        cContext.lineTo(canvasProp.width, penReference.y);

        allY.push(penReference.y);

        cContext.lineWidth = 1;
        cContext.strokeStyle = "#ddd";
        cContext.stroke();

        penReference.y += 10;
    }


    for(let iy = 0; iy < loopLengthY; iy++){
        tiles[iy] = [];
        for(let ix = 0; ix < loopLengthX; ix++){
            tiles[iy].push(0);
        }

    }
   


    
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function roundMousePos(x,y){

    let arr1 = [];
    let arr2 = [];
    let roundedX = 0;
    let roundedY = 0;

    //round for x
    x = x / 10;
    arr1 = x.toString().split(".");

    //convert to integer
    arr1[0] = parseInt(arr1[0]);
    arr1[1] = 0;

    roundedX = parseInt(arr1[0].toString() + arr1[1].toString());

    //round for y
    y = y / 10;
    arr2 = y.toString().split(".");

    //convert to integer
    arr2[0] = parseInt(arr2[0]);
    arr2[1] = 0;
    roundedY = parseInt(arr2[0].toString() + arr2[1].toString());

    return {x: roundedX, y: roundedY};
}

function drawSquare(x,y){
    let canvas = document.getElementById("canvasGrid");
    let cContext = canvas.getContext("2d");

    cContext.beginPath();
    cContext.strokeStyle= "black";
    cContext.fillRect(x, y, 9, 9);
    cContext.stroke();
}

function cleanSquare(x,y){
    let canvas = document.getElementById("canvasGrid");
    let cContext = canvas.getContext("2d");

    cContext.beginPath();
    cContext.strokeStyle= "white";
    cContext.clearRect(x, y, 9, 9);
    cContext.stroke();
}
function beginGame(){
    


    let ObjKeys = Object.keys(tiles);
    let tilesNextRound = {

    }; 

    /* let tileUpStatus = false;
    let tileDownStatus = false;
    let tileRightStatus = false;
    let tileLeftStatus = false;
    let tileCenterStatus = false;

    let tileUpperRight = false;
    let tileUpperLeft = false;
    let tileDownRight = false;
    let tileDownLeft = false;
     */
    //See the y coordinate
    for(let iy = 0; iy < ObjKeys.length; iy++){
        let neighboursAlive = 0;
        let xCenter;
        let yCenter;
        //set the array
        tilesNextRound[iy] = [];
        //See the x coordinate
        for(let ix = 0; ix < tiles[ObjKeys[iy]].length; ix++){
            neighboursAlive = 0;
            yCenter = iy;
            xCenter = ix;
            
           

            //check the tile up
            if(( tiles[yCenter - 1] != undefined) ){
                if(tiles[yCenter - 1][xCenter] == 1){
                    neighboursAlive += 1;
                } 
            }

            //check the tile down
            if(( tiles[yCenter + 1] != undefined)  ){
                if(tiles[yCenter + 1][xCenter] == 1){
                    neighboursAlive += 1;
                } 
            }

            //check the tile right
            if(( tiles[yCenter] != undefined) ){
                if(tiles[yCenter][xCenter + 1] == 1){
                    neighboursAlive += 1;
                } 
            }
            
            //check the tile left
            if(( tiles[yCenter] != undefined) ){
                if(tiles[yCenter][xCenter - 1] == 1){
                    neighboursAlive += 1;
                } 
            }

            //check the tile upper right
            if(( tiles[yCenter - 1] != undefined)  ){
                if(tiles[yCenter - 1][xCenter + 1] == 1){
                    neighboursAlive += 1;
                } 
            }

            //check the tile upper left
            if(( tiles[yCenter - 1] != undefined) ){
                if(tiles[yCenter - 1][xCenter - 1] == 1){
                    neighboursAlive += 1;
                } 
            }

            //check the tile down right
            if(( tiles[yCenter + 1] != undefined)  ){
                if(tiles[yCenter + 1][xCenter + 1] == 1){
                    neighboursAlive += 1;
                } 
            }

            //check the tile down left
            if(( tiles[yCenter + 1] != undefined)  ){
                if(tiles[yCenter + 1][xCenter - 1] == 1){
                    neighboursAlive += 1;
                } 
            }
            
            
            //console.log("y:" + iy + ", x:" + ix);
            

            if(tiles[iy][ix] == 0){
                
                if(neighboursAlive == 3){
                    tilesNextRound[iy].push(1);
                }else{
                    
                    tilesNextRound[iy].push(0);
                }

            }else if(tiles[iy][ix] == 1){
                
                if((neighboursAlive == 2) || (neighboursAlive == 3)){
                    tilesNextRound[iy].push(1);
                }else{
                    tilesNextRound[iy].push(0);
                }
            }

            
        }   
        
    }
    
    let obj2 = Object.keys(tilesNextRound);
    for(let iy = 0; iy < obj2.length; iy++){

        for(let ix = 0; ix < tilesNextRound[iy].length; ix++){

            if(tilesNextRound[iy][ix] == 1){
                //10*10 dimensions
                drawSquare(ix * 10, iy * 10);
            }else{
                cleanSquare(ix * 10, iy * 10);
            }

        }

    }
    /* console.log(tiles);
    console.log(tilesNextRound); */

    tiles = tilesNextRound;

}