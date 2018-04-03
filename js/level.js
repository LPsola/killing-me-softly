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
            "   xxxx!!         x            x     xv v                   ",
            "   x!!!!!o   xx   x           ox     x                      ",
            "   x!!!!!x   xx   xxxxxxxxxxxxxx     x                      ",
            "   x!!!!!!!!!xx   xxxxxxxxxxxxxx     x   xxxxxxxxxxxxxxxxxxx",
            "   xxxxxxxxxxxx   vvvv                 x                    ",
            "                                     x                      ",
            "                      !!!!!!!!!!!!!!!x                      ",
            "                      xxxxxxxxxxxxxxxxxxxxxxxxxxxx   xxxxxxx",
            " x xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   v   x   vvv vvv",
            "   v   v    v   v     xxxxxxxxxxxxxxxxxxxx       x      o   ",
            "                      xxxxvvvvvxxvvvvvxxxx       x      x   ",
            "                      xxxxo           xxxx       x   xxxxxxx",
            "!!!!!!!!! !!!!!!!!! !!!!!x            !!!x   x   x   vvv vvv",
            "!!!!!!!!! !!!!!!!!!      x               x   x   x          ",
            "!!!!!!!!!o!!!!!!!!!     ox             o x   x   v      o   ",
            "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  xxxxxxxxx   x          x   ",
            "         v        v               v  v  v    x    !!!!!!!!!!",
            "                                             x              ",
            "                                             x             o",
            "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
            "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
        ];


var player = {
    x: (3*20)+3,
    y: (26*20)+5,
    width: 15,
    height: 30,
    color: "#FF6714",
    drawMe : function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

var body = document.querySelector("body");
    body.onkeydown = function() {
        switch (event.keyCode) {
            case 32:
            case 87:
            case 38:
            player.y -= 10;
            break;

            case 65:
            case 37:
            player.x -= 10;
            break;

            case 83:
            case 40:
            player.y += 10;
            break;

            case 68:
            case 39:
            player.x += 10;
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
