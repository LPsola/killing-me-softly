
function drawMap(levelArray){
    for (var y=0; y<levelArray.length; y++){
        var line = levelArray[y];
        // console.log(line.length);
        for (var x = 0; x<line.length; x++){
            var ch = line[x];
            // console.log(ch);
            if (ch === "x"){
                // identify as wall + draw tile 20 by 20
                ctx.fillStyle = "#C9D6D4";
                ctx.fillRect(x*20,y*20,20,20);
            }
            else if (ch === "!"){
                // identify as acid + draw tile 20 by 20
                ctx.fillStyle = "#7DFF00";
                ctx.fillRect(x*20,y*20,20,20);              
            }
            else if (ch === "#"){
                // identify as captive + draw tile
                ctx.fillStyle = "#2436E8";
                ctx.fillRect(x*20,y*20,15,30);
            }
            else if (ch === "o"){
                // identify as relics
                ctx.fillStyle = "#E8E300";
                ctx.fillRect((x*20)+5,y*20,10,10);
                

            }
            else if (ch === "v"){
                // identify as falling blocks
            }
            else {
                // identify as empty space
            }
        }
    }

};


function updateStuff () {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawMap(levelMap)
    player.drawMe();
  
    requestAnimationFrame(function () {
      updateStuff();
    });
  }
  
  updateStuff();



// Next steps: 
// 1. define a constructor collision function to apply to each tile of the map
// 2. create and initialize player and player movements
// 3. animate lava
// 4. animate coins with wobble
// 5. animate captive delivrance


drawMap(levelMap)
