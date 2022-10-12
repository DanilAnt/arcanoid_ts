parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"iRAe":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Ball=void 0;var e=function(){function e(e,t,i,o){this.ballSize=e,this.position=t,this.ballImage=new Image,this.speed={x:i,y:-i},this.ballImage.src=o}return Object.defineProperty(e.prototype,"width",{get:function(){return this.ballSize},set:function(e){this.ballSize=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this.ballSize},set:function(e){this.ballSize=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"pos",{get:function(){return this.position},set:function(e){this.position.x=e.x,this.position.y=e.y},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"image",{get:function(){return this.ballImage},enumerable:!1,configurable:!0}),e.prototype.changeYDirection=function(){this.speed.y=-this.speed.y},e.prototype.setUpDirection=function(){this.speed.y=-Math.abs(this.speed.y)},e.prototype.changeXDirection=function(){this.speed.x=-this.speed.x},e.prototype.moveBall=function(){this.position.x+=this.speed.x,this.position.y+=this.speed.y},e}();exports.Ball=e;
},{}],"mj5d":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Paddle=void 0;var e=function(){function e(e,t,i,o,n){this.speed=e,this.paddleWidth=t,this.paddleHeight=i,this.position=o,this.paddleImage=new Image,this.moveLeft=!1,this.moveRight=!1,this.paddleImage.src=n,/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)?(document.addEventListener("pointerdown",this.handlePointerDown.bind(this)),document.addEventListener("pointerup",this.handlePointerUp.bind(this))):(document.addEventListener("keydown",this.handleKeyDown.bind(this)),document.addEventListener("keyup",this.handleKeyUp.bind(this)))}return e.prototype.handlePointerDown=function(e){console.log(e),e.x<window.innerWidth/2?(this.moveLeft=!0,this.moveRight=!1):(this.moveRight=!0,this.moveLeft=!1)},e.prototype.handlePointerUp=function(e){console.log(e),e.x<window.innerWidth/2?this.moveLeft=!1:this.moveRight=!1},e.prototype.handleKeyDown=function(e){console.log(13123),"ArrowLeft"!==e.code&&"ArrowLeft"!==e.key||(this.moveLeft=!0),"ArrowRight"!==e.code&&"ArrowRight"!==e.key||(this.moveRight=!0)},e.prototype.handleKeyUp=function(e){"ArrowLeft"!==e.code&&"ArrowLeft"!==e.key||(this.moveLeft=!1),"ArrowRight"!==e.code&&"ArrowRight"!==e.key||(this.moveRight=!1)},Object.defineProperty(e.prototype,"width",{get:function(){return this.paddleWidth},set:function(e){this.paddleWidth=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this.paddleHeight},set:function(e){this.paddleHeight=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"pos",{get:function(){return this.position},set:function(e){this.position.x=e.x,this.position.y=e.y},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"image",{get:function(){return this.paddleImage},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isMovingLeft",{get:function(){return this.moveLeft},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isMovingRight",{get:function(){return this.moveRight},enumerable:!1,configurable:!0}),e.prototype.movePaddle=function(){this.moveLeft&&(this.position.x-=this.speed),this.moveRight&&(this.position.x+=this.speed)},e}();exports.Paddle=e;
},{}],"sbZq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CanvasView=void 0;var t=function(){function t(t){this.canvas=document.querySelector(t),this.context=this.canvas.getContext("2d"),this.scoreDisplay=document.querySelector("#score"),this.start=document.querySelector("#start"),this.info=document.querySelector("#info")}return t.prototype.hideStart=function(){this.start&&(this.start.style.display="none")},t.prototype.showStart=function(){this.start&&(this.start.style.display="block")},t.prototype.clear=function(){var t;null===(t=this.context)||void 0===t||t.clearRect(0,0,this.canvas.width,this.canvas.height)},t.prototype.initStartButton=function(t){var o,e=this;null===(o=this.start)||void 0===o||o.addEventListener("click",function(){t(e)})},t.prototype.drawScore=function(t){this.scoreDisplay&&(this.scoreDisplay.innerHTML=t.toString())},t.prototype.drawInfo=function(t){this.info&&(this.info.innerHTML=t)},t.prototype.drawSprite=function(t){var o;t&&(null===(o=this.context)||void 0===o||o.drawImage(t.image,t.pos.x,t.pos.y,t.width,t.height))},t.prototype.drawBricks=function(t){var o=this;t.forEach(function(t){o.drawSprite(t)})},t}();exports.CanvasView=t;
},{}],"r70f":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Collision=void 0;var i=function(){function i(){}return i.prototype.collidingSide=function(i,o){if(i.pos.x<o.pos.x+o.width&&i.pos.x+i.width>o.pos.x&&i.pos.y+i.height>o.pos.y&&i.pos.y<o.pos.y+o.height){var t=i.pos.y+i.height-o.pos.y,e=o.pos.y+o.height-i.height-i.pos.y,n=i.pos.x+i.width-o.pos.x,r=o.pos.x+o.width-i.width-i.pos.x;return t<=e&&t<=r&&t<=n?"top":e<=r&&e<=n&&e<=t?"bottom":n<=r&&n<=t&&n<=e?"left":"right"}return!1},i.prototype.isCollidingBricks=function(i,o){var t=this,e=!1;return o.forEach(function(n,r){var s=t.collidingSide(i,n);s&&("left"===s||"right"===s?i.changeXDirection():i.changeYDirection(),1===n.energy?o.splice(r,1):n.energy-=1,e=!0)}),e},i.prototype.checkBallCollision=function(i,o,t){var e=this.collidingSide(i,o);"top"===e?i.setUpDirection():"left"!==e&&"right"!==e||i.changeXDirection(),(i.pos.x>t.canvas.width-i.width||i.pos.x<0)&&i.changeXDirection(),i.pos.y<0&&i.changeYDirection()},i}();exports.Collision=i;
},{}],"Mnqt":[function(require,module,exports) {
module.exports="paddle.5755c017.png";
},{}],"YebZ":[function(require,module,exports) {
module.exports="ball.eef8eb9b.png";
},{}],"EnDH":[function(require,module,exports) {
module.exports="brick-red.40fbdc6a.png";
},{}],"BSit":[function(require,module,exports) {
module.exports="brick-blue.4fcb1121.png";
},{}],"REqJ":[function(require,module,exports) {
module.exports="brick-green.d41f673b.png";
},{}],"RjJe":[function(require,module,exports) {
module.exports="brick-yellow.8aeca30f.png";
},{}],"B8XN":[function(require,module,exports) {
module.exports="brick-purple.54fb03e2.png";
},{}],"uO1H":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LEVEL=exports.BRICK_ENERGY=exports.BRICK_IMAGES=exports.BALL_STARTY=exports.BALL_STARTX=exports.BALL_SIZE=exports.BALL_SPEED=exports.PADDLE_SPEED=exports.PADDLE_STARTX=exports.PADDLE_HEIGHT=exports.PADDLE_WIDTH=exports.BRICK_HEIGHT=exports.BRICK_WIDTH=exports.BRICK_PADDING=exports.STAGE_COLS=exports.STAGE_ROWS=exports.STAGE_PADDING=void 0;var e=s(require("~/images/brick-red.png")),r=s(require("~/images/brick-blue.png")),t=s(require("~/images/brick-green.png")),o=s(require("~/images/brick-yellow.png")),p=s(require("~/images/brick-purple.png"));function s(e){return e&&e.__esModule?e:{default:e}}var E=document.querySelector("#playField"),a=document.querySelector("#main"),_=1e3,x=600;E&&a&&(E.width=window.innerWidth,E.height=window.innerHeight);var A=10;exports.STAGE_PADDING=A;var i=20;exports.STAGE_ROWS=i;var D=10;exports.STAGE_COLS=D;var L=5;exports.BRICK_PADDING=L;var I=E?Math.floor((E.width-2*A)/D)-L:100;exports.BRICK_WIDTH=I;var S=E?Math.floor((E.height-2*A)/i)-L:30;exports.BRICK_HEIGHT=S;var T=150;exports.PADDLE_WIDTH=T;var u=25;exports.PADDLE_HEIGHT=u;var d=450;exports.PADDLE_STARTX=d;var v=10;exports.PADDLE_SPEED=v;var n=5;exports.BALL_SPEED=n;var R=20;exports.BALL_SIZE=R;var l=E?E.width*Math.random():400;exports.BALL_STARTX=l;var B=E?E.height-50:400;exports.BALL_STARTY=B;var G={1:e.default,2:t.default,3:o.default,4:r.default,5:p.default};exports.BRICK_IMAGES=G;var P={1:1,2:1,3:2,4:2,5:3};exports.BRICK_ENERGY=P;var g=[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,2,2,2,2,2,2,2,2,0,0,3,3,3,3,3,3,3,3,0,0,0,4,4,4,4,4,4,0,0,0,0,5,5,0,0,5,5,0,0];exports.LEVEL=g;
},{"~/images/brick-red.png":"EnDH","~/images/brick-blue.png":"BSit","~/images/brick-green.png":"REqJ","~/images/brick-yellow.png":"RjJe","~/images/brick-purple.png":"B8XN"}],"A92X":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Brick=void 0;var e=function(){function e(e,t,i,r,n){this.brickWidth=e,this.brickHeight=t,this.position=i,this.brickEnergy=r,this.brickImage=new Image,this.brickImage.src=n}return Object.defineProperty(e.prototype,"width",{get:function(){return this.brickWidth},set:function(e){this.brickWidth=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this.brickHeight},set:function(e){this.brickHeight=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"pos",{get:function(){return this.position},set:function(e){this.position.x=e.x,this.position.y=e.y},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"energy",{get:function(){return this.brickEnergy},set:function(e){this.brickEnergy=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"image",{get:function(){return this.brickImage},enumerable:!1,configurable:!0}),e}();exports.Brick=e;
},{}],"uCOr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createBricks=n;var r=require("~/sprites/Brick"),e=require("~/setup"),t=function(){for(var r=0,e=0,t=arguments.length;e<t;e++)r+=arguments[e].length;var n=Array(r),u=0;for(e=0;e<t;e++)for(var o=arguments[e],i=0,c=o.length;i<c;i++,u++)n[u]=o[i];return n};function n(n,u,o,i){return e.LEVEL.reduce(function(c,a,s){var f=Math.floor((s+1)/e.STAGE_COLS),E=s%e.STAGE_COLS,l=n+E*(u+o),v=n+f*(i+u);return 0===a?c:t(c,[new r.Brick(o,i,{x:l,y:v},e.BRICK_ENERGY[a],e.BRICK_IMAGES[a])])},[])}
},{"~/sprites/Brick":"A92X","~/setup":"uO1H"}],"QCba":[function(require,module,exports) {
"use strict";var i=require("~/sprites/Ball"),t=require("~/sprites/Paddle"),s=require("~/view/CanvasView"),e=require("~/Collision"),h=o(require("~/images/paddle.png")),a=o(require("~/images/ball.png")),n=require("~/setup"),r=require("~/helpers");function o(i){return i&&i.__esModule?i:{default:i}}var v=function(){for(var i=0,t=0,s=arguments.length;t<s;t++)i+=arguments[t].length;var e=Array(i),h=0;for(t=0;t<s;t++)for(var a=arguments[t],n=0,r=a.length;n<r;n++,h++)e[h]=a[n];return e},w=function(){function o(){var i=this;this.gameover=!1,this.score=0,this.bricks=[],this.view=new s.CanvasView("#playField"),this.view.canvas.width=window.innerWidth,this.view.canvas.height=window.innerHeight,this.STAGE_PADDING=10,this.STAGE_ROWS=20,this.STAGE_COLS=10,this.BRICK_PADDING=this.view.canvas.height>this.view.canvas.width?Math.ceil(.0056*this.view.canvas.width):Math.ceil(.0056*this.view.canvas.height),this.BRICK_WIDTH=.096*this.view.canvas.width,this.BRICK_HEIGHT=.044*this.view.canvas.height,this.PADDLE_WIDTH=.075*this.view.canvas.width,this.PADDLE_HEIGHT=.02*this.view.canvas.height,this.PADDLE_STARTX=this.view.canvas.width/2-this.PADDLE_WIDTH,this.PADDLE_SPEED=10,this.BALL_SPEED=5,this.BALL_SIZE=.015*this.view.canvas.height,this.BALL_STARTX=this.view.canvas.width*Math.random(),this.BALL_STARTY=this.view.canvas.height-3*this.PADDLE_HEIGHT,window.addEventListener("resize",function(t){i.resizeHandler(t)}),this.view.initStartButton(this.startGame.bind(this))}return o.prototype.resizeHandler=function(i){var t=window.innerWidth/this.view.canvas.width,s=window.innerHeight/this.view.canvas.height;this.resizeCanvas(),console.log(i,this.view.canvas.width,this.view.canvas.height),this.setVariables(),this.setSizes(),this.setPositions(t,s),this.view.clear(),this.view.drawBricks(this.bricks),this.ball&&this.paddle&&(this.view.drawSprite(this.paddle),this.view.drawSprite(this.ball))},o.prototype.resizeCanvas=function(){this.view.canvas.width=window.innerWidth,this.view.canvas.height=window.innerHeight},o.prototype.setVariables=function(){this.STAGE_PADDING=5,this.STAGE_ROWS=20,this.STAGE_COLS=10,this.BRICK_PADDING=this.view.canvas.height>this.view.canvas.width?Math.ceil(.0056*this.view.canvas.width):Math.ceil(.0056*this.view.canvas.height),this.BRICK_WIDTH=.096*this.view.canvas.width,this.BRICK_HEIGHT=.044*this.view.canvas.height,this.PADDLE_WIDTH=.075*this.view.canvas.width,this.PADDLE_HEIGHT=.02*this.view.canvas.height,this.PADDLE_STARTX=this.view.canvas.width/2-this.PADDLE_WIDTH,this.PADDLE_SPEED=10,this.BALL_SPEED=5,this.BALL_SIZE=.015*this.view.canvas.height,this.BALL_STARTX=this.view.canvas.width*Math.random(),this.BALL_STARTY=this.view.canvas.height-3*this.PADDLE_HEIGHT},o.prototype.setSizes=function(){var i=this;this.ball&&(this.ball.width=this.BALL_SIZE,this.ball.height=this.BALL_SIZE),this.paddle&&(this.paddle.width=this.PADDLE_WIDTH,this.paddle.height=this.PADDLE_HEIGHT),this.bricks.forEach(function(t){t.width=i.BRICK_WIDTH,t.height=i.BRICK_HEIGHT})},o.prototype.setPositions=function(i,t){this.ball&&(this.ball.pos={x:i*this.ball.pos.x,y:t*this.ball.pos.y}),this.paddle&&(this.paddle.pos={x:i*this.paddle.pos.x,y:t*this.paddle.pos.y}),this.bricks.forEach(function(s){s.pos={x:i*s.pos.x,y:t*s.pos.y}})},o.prototype.setGameOver=function(i){i.drawInfo("Game over!"),this.gameover=!1},o.prototype.setGameWin=function(i){i.drawInfo("Game won!"),this.gameover=!1},o.prototype.gameLoop=function(i,t,s,e,h){var a=this;this.bricks=v(e),this.paddle=t,this.ball=s,i.clear(),i.drawBricks(e),i.drawSprite(t),i.drawSprite(s),s.moveBall(),(t.isMovingLeft&&t.pos.x>0||t.isMovingRight&&t.pos.x<i.canvas.width-t.width)&&t.movePaddle(),h.checkBallCollision(s,t,i),h.isCollidingBricks(s,e)&&(this.score+=1,i.drawScore(this.score)),this.gameover||(requestAnimationFrame(function(){a.gameLoop(i,t,s,e,h)}),(0===e.length||s.pos.y>i.canvas.height)&&(this.gameover=!0,i.showStart()))},o.prototype.startGame=function(s){console.log("Start here!"),this.gameover=!1,s.hideStart(),this.score=0,s.drawInfo(""),s.drawScore(0),this.resizeCanvas(),this.setVariables();var o=new e.Collision,v=(0,r.createBricks)(this.STAGE_PADDING,this.BRICK_PADDING,this.BRICK_WIDTH,this.BRICK_HEIGHT),w=new i.Ball(this.BALL_SIZE,{x:this.BALL_STARTX,y:this.BALL_STARTY},this.BALL_SPEED,a.default),d=new t.Paddle(n.PADDLE_SPEED,this.PADDLE_WIDTH,this.PADDLE_HEIGHT,{x:this.PADDLE_STARTX,y:s.canvas.height-this.PADDLE_HEIGHT-5},h.default);this.gameLoop(s,d,w,v,o)},o}();setTimeout(function(){new w},100);
},{"~/sprites/Ball":"iRAe","~/sprites/Paddle":"mj5d","~/view/CanvasView":"sbZq","~/Collision":"r70f","~/images/paddle.png":"Mnqt","~/images/ball.png":"YebZ","~/setup":"uO1H","~/helpers":"uCOr"}]},{},["QCba"], null)