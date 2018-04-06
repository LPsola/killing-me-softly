var canvas = document.querySelector(".first-canvas");

canvas.width = 1200;
canvas.height = 600;
var ctx = canvas.getContext("2d");

var levelMap = [
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxxxxx vvvvvvvvvv                              ",
  "                                                         #  ",
  "vvvxxxvvv vv vv vvv                    o o o o o            ",
  " o xxx                         xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "                       xxx     xvvvvv                 vvvv  ",
  "                               x                            ",
  "      xxxxxxxxxxxxx     o      x                            ",
  "      x!! vvv     x !!!!!!!!!!!x     xxxxxxxxxxxxxxxxx     o",
  "   xxxx!!         x            x     x  v                   ",
  "   x!!!!!o   xx   x           ox     x                      ",
  "   x!!!!!x   xx   xxxxxxxxxxxxxx     x                      ",
  "   x!!!!!!!!!xx   xxxxxxxxxxxxxx     x   xxxxxxxxxxxxxxxxxxx",
  "   xxxxxxxxxxxx   v v                  x                    ",
  "                                     x                      ",
  "                      !!!!!!!!!!!!!!!x                      ",
  "                      xxxxxxxxxxxxxxxxxxxxxxxxxxxx   xxxxxxx",
  " x xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   v   x   vvv vvv",
  "   v   v    v   v     xxxx!!!!!xx!!!!!xxxx       x      o   ",
  "                      xxxx vvvvxxvvvvvxxxx       x      x   ",
  "                      xxxxo           xxxx       x   !!!x!!!",
  "!!!!!!!!! !!!!!!!!! !!!!!x            !!!x   x   x          ",
  "!!!!!!!!! !!!!!!!!!      x               x   x   x          ",
  "!!!!!!!!!o!!!!!!!!!     ox             o x   x   v      o   ",
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  xxxxxxxxx   x          x   ",
  "         v        v               v  v  v    x    !!!!!!!!!!",
  "                                             x              ",
  "         o                                   x             o",
  "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
  "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
];

// Player initialization
var player = {
  x: 3 * 20 + 3,
  y: 26 * 20 + 5,
  width: 15,
  height: 30,
  speedX: 1,
  speedY: 1,
  acceleration: 0.2,
  maxSpeed: 5,
  color: "#FF6714",
  wallCollision: false,
  coinCollision: false,
  acidCollision: false,
  fireBallCollision: false,
  drawMe: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

function playerMoveX() {
  while (player.speedX <= player.maxSpeed) {
    player.speedX += player.acceleration;
  }
}

function playerMoveY() {
  while (player.speedY <= player.maxSpeed) {
    player.speedY += player.acceleration;
  }
}
// to be deleted var oldPosX;
// to be deleted var oldPosY;
var playerPosX = [player.x];
var playerPosY = [player.y];
var topOrBottom = [];
var leftOrRight = [];

// to be deleted var playerCol = [player.wallCollision];

// to be deleted function testPos() {
//  to be deleted  console.log(playerPosY);
// to be deleted }

// to be deleted function testCol() {
// to be deleted  console.log(playerCol);
//to be deleted  }

// to be deleted function testTop() {
// to be deleted   console.log(topOrBottom[topOrBottom.length - 1]);
//to be deleted  }

// Fireball initialization

var fireBallPosX = 0;
var fireBallPosY = 0;

var fireBalls = [];

function FireBall(myX, myY, myW, myH) {
  this.x = myX;
  this.y = myY;
  this.ox = myX;
  this.oy = myY;
  this.width = myW;
  this.height = myH;
  this.collision = false;
  this.speedX = 0;
  this.speedY = 0;
  this.gravity = 0.05;
  this.gravitySpeed = 0;
  this.update = function() {
    this.newPos = function() {
      this.gravitySpeed = 0.7;
      this.x += this.speedX;
      this.y += this.speedY + this.gravitySpeed;
    };
  };
}

FireBall.prototype.drawBall = function() {
  ctx.fillStyle = "#FFF";
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

// Walls

var wallPosX = 0;
var wallPosY = 0;

var walls = [];

function Wall(myX, myY, myW, myH) {
  this.x = myX;
  this.y = myY;
  this.width = myW;
  this.height = myH;
}

function wallCollision() {
  walls.forEach(function(oneWall) {
    if (collision(player, oneWall)) {
      player.wallCollision = true;
      playerPosY.push(player.y);
      playerPosX.push(player.x);
      // to be deleted  playerCol.push(player.wallCollision);
    }
    fireBalls.forEach(function(oneFireBall) {
      if (collision(oneFireBall, oneWall) || oneFireBall.y > canvas.height) {
        oneFireBall.collision = true;
        oneFireBall.y = oneFireBall.oy;
      }
      if (collision(player, oneFireBall)) {
        player.fireBallCollision = true;
        player.x = 3 * 20 + 3;
        player.y = 26 * 20 + 5;
      }
    });
  });
}

// Acid

var acidPosX = 0;
var acidPosY = 0;

var acidArray = [];

function Acid(myX, myY, myW, myH) {
  this.x = myX;
  this.y = myY;
  this.width = myW;
  this.height = myH;
}

function acidCollision() {
  acidArray.forEach(function(oneAcid) {
    if (collision(player, oneAcid)) {
      player.acidCollision = true;
      player.x = 3 * 20 + 3;
      player.y = 26 * 20 + 5;
      // to be deleted  playerCol.push(player.wallCollision);
    }
  });
}

// Coins

var coinPosX = 0;
var coinPosY = 0;
var totalCoins = 18;
var coinCounter = 0;

var coins = [];

function Coin(myX, myY, myW, myH) {
  this.x = myX;
  this.y = myY;
  this.width = myW;
  this.height = myH;
}

Coin.prototype.drawCoin = function() {
  ctx.fillStyle = "#E8E300";
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

function coinCollision() {
  // var collidedCoin = [];
  coins.forEach(function(oneCoin) {
    if (collision(player, oneCoin)) {
      coins.splice(coins.indexOf(oneCoin), 1);
      coinCounter += 1;
      // to be deleted  playerCol.push(player.wallCollision);
    }

    // collidedCoin.pop();
  });

  // collidedCoin.pop();
}

// start Game
$(".first-canvas").hide();

$("#StartButton").click(function() {
  $("#SplashScreen").hide();
  $(".first-canvas").show();
});

// End Game
function win() {
  if (coinCounter === totalCoins) {
    console.log("win");
    youWinText();
  }
}

function youWinText() {
  ctx.fillStyle = "rgba(0,0,0, 0.4)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "80px Verdana";
  ctx.fillStyle = "white";

  ctx.fillText("You WIN", 400, canvas.height / 2);
  ctx.font = "40px Verdana";
  ctx.fillStyle = "#C9D6D4";
  ctx.fillText("Please refresh page to start over", 300, 350);
}

// Collision detection

function getTop(obj) {
  return obj.y;
}
function getBottom(obj) {
  return obj.y + obj.height;
}
function getLeft(obj) {
  return obj.x;
}
function getRight(obj) {
  return obj.x + obj.width;
}

function collision(objA, objB) {
  return (
    getBottom(objA) >= getTop(objB) &&
    getTop(objA) <= getBottom(objB) &&
    getRight(objA) >= getLeft(objB) &&
    getLeft(objA) <= getRight(objB)
  );
}

// User interactions

var body = document.querySelector("body");
body.onkeydown = function() {
  switch (event.keyCode) {
    case 32:
    case 87:
    case 38:
      if (
        player.wallCollision === true &&
        topOrBottom[topOrBottom.length - 1] === "top" &&
        player.y === playerPosY[playerPosY.length - 1]
      ) {
        player.y = playerPosY[playerPosY.length - 1] + player.speedY;
        player.wallCollision = false;
        // to be deleted  playerCol.push(player.wallCollision);
        topOrBottom.push("top");
        break;
      }
      player.y -= player.speedY;
      playerMoveX();
      playerMoveY();
      topOrBottom.push("top");
      // to be deleted  playerPosY.push(player.y);
      break;
    case 65:
    case 37:
      if (
        player.wallCollision === true &&
        leftOrRight[leftOrRight.length - 1] === "left" &&
        player.x === playerPosX[playerPosX.length - 1]
      ) {
        player.x = playerPosX[playerPosX.length - 1] + player.speedX;
        player.wallCollision = false;
        // to be deleted  playerCol.push(player.wallCollision);
        leftOrRight.push("left");
        break;
      }
      player.x -= player.speedX;
      playerMoveX();
      playerMoveY();
      leftOrRight.push("left");
      break;
    case 83:
    case 40:
      if (
        player.wallCollision === true &&
        topOrBottom[topOrBottom.length - 1] === "bottom" &&
        player.y === playerPosY[playerPosY.length - 1]
      ) {
        player.y = playerPosY[playerPosY.length - 1] - player.speedY;
        player.wallCollision = false;
        // to be deleted  playerCol.push(player.wallCollision);
        topOrBottom.push("bottom");
        break;
      }
      player.y += player.speedY;
      playerMoveX();
      playerMoveY();
      topOrBottom.push("bottom");
      // to be deleted  playerPosY.push(player.y);
      break;
    case 68:
    case 39:
      if (
        player.wallCollision === true &&
        leftOrRight[leftOrRight.length - 1] === "right" &&
        player.x === playerPosX[playerPosX.length - 1]
      ) {
        player.x = playerPosX[playerPosX.length - 1] - player.speedX;
        player.wallCollision = false;
        // to be deleted  playerCol.push(player.wallCollision);
        leftOrRight.push("right");
        break;
      }
      player.x += player.speedX;
      playerMoveX();
      playerMoveY();
      leftOrRight.push("right");
      break;
  }
};

// legend:
//          x = platform
//          ! = lava
//          @ = player starting point
//          v = falling block
//          o = relics
//          # = prisoner that must be saved by collecting all relics
