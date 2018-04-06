var mapGenerated = false;

function drawMap(levelArray) {
  for (var y = 0; y < levelArray.length; y++) {
    var line = levelArray[y];
    for (var x = 0; x < line.length; x++) {
      var ch = line[x];
      if (ch === "x") {
        // identify as wall + draw tile 20 by 20
        ctx.drawImage(wallTile, wallPosX, wallPosY, 20, 20);
        wallPosX = x * 20;
        wallPosY = y * 20;
        if (mapGenerated === false) {
          walls.push(new Wall(wallPosX, wallPosY, 20, 20));
        }
      } else if (ch === "!") {
        // identify as acid + draw tile 20 by 20
        ctx.drawImage(acidTile, acidPosX, acidPosY, 20, 20);
        acidPosX = x * 20;
        acidPosY = y * 20;
        if (mapGenerated === false) {
          acidArray.push(new Acid(acidPosX, acidPosY, 20, 20));
        }
      } else if (ch === "#") {
        // identify as captive + draw tile
        ctx.fillStyle = "#2436E8";
        ctx.fillRect(x * 20, y * 20, 15, 30);
      } else if (ch === "o") {
        // identify as relics
        coinPosX = x * 20;
        coinPosY = y * 20 - 5;
        if (mapGenerated === false) {
          coins.push(new Coin(coinPosX, coinPosY, 20, 20));
        }
      } else if (ch === "v") {
        // identify as falling blocks
        fireBallPosX = x * 20;
        fireBallPosY = y * 20;
        if (mapGenerated === false) {
          fireBalls.push(new FireBall(fireBallPosX + 5, fireBallPosY, 10, 10));
        }
      } else {
      }
    }
  }
  mapGenerated = true;
}

function updateStuff() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // map initialisation
  drawMap(levelMap);

  // player initialisation
  player.drawMe();

  // collisions
  wallCollision();
  acidCollision();
  coinCollision();

  // falling fireBalls
  fireBalls.forEach(function(fireBall) {
    fireBall.drawBall();
    fireBall.update();
    fireBall.newPos();
  });

  // coins
  coins.forEach(function(oneCoin) {
    oneCoin.drawCoin();
  });

  requestAnimationFrame(function() {
    updateStuff();
  });

  win();
}

updateStuff();
