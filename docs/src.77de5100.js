// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"sprites/Ball.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = void 0;

var Ball =
/** @class */
function () {
  function Ball(ballSize, position, speed, image) {
    this.ballSize = ballSize;
    this.position = position;
    this.ballImage = new Image();
    this.speed = {
      x: speed,
      y: -speed
    };
    this.ballImage.src = image;
  }

  Object.defineProperty(Ball.prototype, "width", {
    get: function get() {
      return this.ballSize;
    },
    set: function set(width) {
      this.ballSize = width;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "height", {
    get: function get() {
      return this.ballSize;
    },
    set: function set(height) {
      this.ballSize = height;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "pos", {
    get: function get() {
      return this.position;
    },
    set: function set(pos) {
      this.position.x = pos.x;
      this.position.y = pos.y;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "image", {
    get: function get() {
      return this.ballImage;
    },
    enumerable: false,
    configurable: true
  });

  Ball.prototype.changeYDirection = function () {
    this.speed.y = -this.speed.y;
  };

  Ball.prototype.setUpDirection = function () {
    this.speed.y = -Math.abs(this.speed.y);
  };

  Ball.prototype.changeXDirection = function () {
    this.speed.x = -this.speed.x;
  };

  Ball.prototype.moveBall = function () {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  };

  return Ball;
}();

exports.Ball = Ball;
},{}],"sprites/Paddle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paddle = void 0;

var Paddle =
/** @class */
function () {
  function Paddle(speed, paddleWidth, paddleHeight, position, image) {
    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.position = position;
    this.paddleImage = new Image();
    this.moveLeft = false;
    this.moveRight = false;
    this.paddleImage.src = image;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      document.addEventListener("pointerdown", this.handlePointerDown.bind(this));
      document.addEventListener("pointerup", this.handlePointerUp.bind(this));
    } else {
      document.addEventListener("keydown", this.handleKeyDown.bind(this));
      document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }
  }

  Paddle.prototype.handlePointerDown = function (e) {
    console.log(e);

    if (e.x < window.innerWidth / 2) {
      this.moveLeft = true;
      this.moveRight = false;
    } else {
      this.moveRight = true;
      this.moveLeft = false;
    }
  };

  Paddle.prototype.handlePointerUp = function (e) {
    console.log(e);

    if (e.x < window.innerWidth / 2) {
      this.moveLeft = false;
    } else {
      this.moveRight = false;
    }
  };

  Paddle.prototype.handleKeyDown = function (e) {
    console.log(13123);

    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
      this.moveLeft = true;
    }

    if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
      this.moveRight = true;
    }
  };

  Paddle.prototype.handleKeyUp = function (e) {
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
      this.moveLeft = false;
    }

    if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
      this.moveRight = false;
    }
  };

  Object.defineProperty(Paddle.prototype, "width", {
    get: function get() {
      return this.paddleWidth;
    },
    set: function set(width) {
      this.paddleWidth = width;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "height", {
    get: function get() {
      return this.paddleHeight;
    },
    set: function set(height) {
      this.paddleHeight = height;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "pos", {
    get: function get() {
      return this.position;
    },
    set: function set(pos) {
      this.position.x = pos.x;
      this.position.y = pos.y;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "image", {
    get: function get() {
      return this.paddleImage;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "isMovingLeft", {
    get: function get() {
      return this.moveLeft;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "isMovingRight", {
    get: function get() {
      return this.moveRight;
    },
    enumerable: false,
    configurable: true
  });

  Paddle.prototype.movePaddle = function () {
    if (this.moveLeft) {
      this.position.x -= this.speed;
    }

    if (this.moveRight) {
      this.position.x += this.speed;
    }
  };

  return Paddle;
}();

exports.Paddle = Paddle;
},{}],"view/CanvasView.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasView = void 0;

var CanvasView =
/** @class */
function () {
  function CanvasView(canvasName) {
    this.canvas = document.querySelector(canvasName);
    this.context = this.canvas.getContext("2d");
    this.scoreDisplay = document.querySelector('#score');
    this.start = document.querySelector('#start');
    this.info = document.querySelector('#info');
  }

  CanvasView.prototype.hideStart = function () {
    if (this.start) {
      this.start.style.display = 'none';
    }
  };

  CanvasView.prototype.showStart = function () {
    if (this.start) {
      this.start.style.display = 'block';
    }
  };

  CanvasView.prototype.clear = function () {
    var _a;

    (_a = this.context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  CanvasView.prototype.initStartButton = function (startFunction) {
    var _this = this;

    var _a;

    (_a = this.start) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
      startFunction(_this);
    });
  };

  CanvasView.prototype.drawScore = function (score) {
    if (this.scoreDisplay) {
      this.scoreDisplay.innerHTML = score.toString();
    }
  };

  CanvasView.prototype.drawInfo = function (info) {
    if (this.info) {
      this.info.innerHTML = info;
    }
  };

  CanvasView.prototype.drawSprite = function (brick) {
    var _a;

    if (!brick) return;
    (_a = this.context) === null || _a === void 0 ? void 0 : _a.drawImage(brick.image, brick.pos.x, brick.pos.y, brick.width, brick.height);
  };

  CanvasView.prototype.drawBricks = function (bricks) {
    // console.log(12312);
    var _this = this;

    bricks.forEach(function (brick) {
      _this.drawSprite(brick);
    });
  };

  return CanvasView;
}();

exports.CanvasView = CanvasView;
},{}],"Collision.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collision = void 0;

var Collision =
/** @class */
function () {
  function Collision() {}

  Collision.prototype.collidingSide = function (ball, brick) {
    if (ball.pos.x < brick.pos.x + brick.width && ball.pos.x + ball.width > brick.pos.x && ball.pos.y + ball.height > brick.pos.y && ball.pos.y < brick.pos.y + brick.height) {
      var distTop = ball.pos.y + ball.height - brick.pos.y;
      var distBottom = brick.pos.y + brick.height - ball.height - ball.pos.y;
      var distLeft = ball.pos.x + ball.width - brick.pos.x;
      var distRight = brick.pos.x + brick.width - ball.width - ball.pos.x;

      if (distTop <= distBottom && distTop <= distRight && distTop <= distLeft) {
        return 'top';
      } else if (distBottom <= distRight && distBottom <= distLeft && distBottom <= distTop) {
        return 'bottom';
      } else if (distLeft <= distRight && distLeft <= distTop && distLeft <= distBottom) {
        return 'left';
      } else {
        return 'right';
      }
    }

    return false;
  };

  Collision.prototype.isCollidingBricks = function (ball, bricks) {
    var _this = this;

    var isColliding = false;
    bricks.forEach(function (brick, index) {
      var brickSide = _this.collidingSide(ball, brick);

      if (brickSide) {
        if (brickSide === 'left' || brickSide === 'right') {
          ball.changeXDirection();
        } else {
          ball.changeYDirection();
        }

        if (brick.energy === 1) {
          bricks.splice(index, 1);
        } else {
          brick.energy -= 1;
        }

        isColliding = true;
      }
    });
    return isColliding;
  };

  Collision.prototype.checkBallCollision = function (ball, paddle, view) {
    var paddleCollidingSide = this.collidingSide(ball, paddle);

    if (paddleCollidingSide === 'top') {
      ball.setUpDirection();
    } else if (paddleCollidingSide === 'left' || paddleCollidingSide === 'right') {
      ball.changeXDirection();
    }

    if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0) {
      ball.changeXDirection();
    }

    if (ball.pos.y < 0) {
      ball.changeYDirection();
    }
  };

  return Collision;
}();

exports.Collision = Collision;
},{}],"images/paddle.png":[function(require,module,exports) {
module.exports = "/paddle.f48d929a.png";
},{}],"images/ball.png":[function(require,module,exports) {
module.exports = "/ball.96931fde.png";
},{}],"images/brick-red.png":[function(require,module,exports) {
module.exports = "/brick-red.c1be1822.png";
},{}],"images/brick-blue.png":[function(require,module,exports) {
module.exports = "/brick-blue.695b92f9.png";
},{}],"images/brick-green.png":[function(require,module,exports) {
module.exports = "/brick-green.e573ebf2.png";
},{}],"images/brick-yellow.png":[function(require,module,exports) {
module.exports = "/brick-yellow.eff6b86b.png";
},{}],"images/brick-purple.png":[function(require,module,exports) {
module.exports = "/brick-purple.088683b7.png";
},{}],"setup.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LEVEL = exports.BRICK_ENERGY = exports.BRICK_IMAGES = exports.BALL_STARTY = exports.BALL_STARTX = exports.BALL_SIZE = exports.BALL_SPEED = exports.PADDLE_SPEED = exports.PADDLE_STARTX = exports.PADDLE_HEIGHT = exports.PADDLE_WIDTH = exports.BRICK_HEIGHT = exports.BRICK_WIDTH = exports.BRICK_PADDING = exports.STAGE_COLS = exports.STAGE_ROWS = exports.STAGE_PADDING = void 0;

var _brickRed = _interopRequireDefault(require("~/images/brick-red.png"));

var _brickBlue = _interopRequireDefault(require("~/images/brick-blue.png"));

var _brickGreen = _interopRequireDefault(require("~/images/brick-green.png"));

var _brickYellow = _interopRequireDefault(require("~/images/brick-yellow.png"));

var _brickPurple = _interopRequireDefault(require("~/images/brick-purple.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Grab the canvas element for calculating the brick width
// depending on canvas width
var canvas = document.querySelector('#playField');
var main = document.querySelector('#main');
var CANVAS_WIDTH = 1000;
var CANVAS_HEIGHT = 600;

if (canvas && main) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
} // Constants


var STAGE_PADDING = 10;
exports.STAGE_PADDING = STAGE_PADDING;
var STAGE_ROWS = 20;
exports.STAGE_ROWS = STAGE_ROWS;
var STAGE_COLS = 10;
exports.STAGE_COLS = STAGE_COLS;
var BRICK_PADDING = 5;
exports.BRICK_PADDING = BRICK_PADDING;
var BRICK_WIDTH = canvas ? Math.floor((canvas.width - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING : 100;
exports.BRICK_WIDTH = BRICK_WIDTH;
var BRICK_HEIGHT = canvas ? Math.floor((canvas.height - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING : 30;
exports.BRICK_HEIGHT = BRICK_HEIGHT;
var PADDLE_WIDTH = 150;
exports.PADDLE_WIDTH = PADDLE_WIDTH;
var PADDLE_HEIGHT = 25;
exports.PADDLE_HEIGHT = PADDLE_HEIGHT;
var PADDLE_STARTX = 450;
exports.PADDLE_STARTX = PADDLE_STARTX;
var PADDLE_SPEED = 10;
exports.PADDLE_SPEED = PADDLE_SPEED;
var BALL_SPEED = 5;
exports.BALL_SPEED = BALL_SPEED;
var BALL_SIZE = 20;
exports.BALL_SIZE = BALL_SIZE;
var BALL_STARTX = canvas ? canvas.width * Math.random() : 400;
exports.BALL_STARTX = BALL_STARTX;
var BALL_STARTY = canvas ? canvas.height - 50 : 400;
exports.BALL_STARTY = BALL_STARTY;
;
var BRICK_IMAGES = {
  1: _brickRed.default,
  2: _brickGreen.default,
  3: _brickYellow.default,
  4: _brickBlue.default,
  5: _brickPurple.default
};
exports.BRICK_IMAGES = BRICK_IMAGES;
var BRICK_ENERGY = {
  1: 1,
  2: 1,
  3: 2,
  4: 2,
  5: 3 // Purple brick

}; // prettier-ignore

exports.BRICK_ENERGY = BRICK_ENERGY;
var LEVEL = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 5, 5, 0, 0, 5, 5, 0, 0];
exports.LEVEL = LEVEL;
},{"~/images/brick-red.png":"images/brick-red.png","~/images/brick-blue.png":"images/brick-blue.png","~/images/brick-green.png":"images/brick-green.png","~/images/brick-yellow.png":"images/brick-yellow.png","~/images/brick-purple.png":"images/brick-purple.png"}],"sprites/Brick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Brick = void 0;

var Brick =
/** @class */
function () {
  function Brick(brickWidth, brickHeight, position, brickEnergy, image) {
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.position = position;
    this.brickEnergy = brickEnergy;
    this.brickImage = new Image();
    this.brickImage.src = image;
  }

  Object.defineProperty(Brick.prototype, "width", {
    get: function get() {
      return this.brickWidth;
    },
    set: function set(width) {
      this.brickWidth = width;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "height", {
    get: function get() {
      return this.brickHeight;
    },
    set: function set(height) {
      this.brickHeight = height;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "pos", {
    get: function get() {
      return this.position;
    },
    set: function set(pos) {
      this.position.x = pos.x;
      this.position.y = pos.y;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "energy", {
    get: function get() {
      return this.brickEnergy;
    },
    set: function set(energy) {
      this.brickEnergy = energy;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "image", {
    get: function get() {
      //  console.log(this.brickImage);
      return this.brickImage;
    },
    enumerable: false,
    configurable: true
  });
  return Brick;
}();

exports.Brick = Brick;
},{}],"helpers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBricks = createBricks;

var _Brick = require("~/sprites/Brick");

var _setup = require("~/setup");

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

function createBricks(STAGE_PADDING, BRICK_PADDING, BRICK_WIDTH, BRICK_HEIGHT) {
  return _setup.LEVEL.reduce(function (acc, cell, i) {
    var row = Math.floor((i + 1) / _setup.STAGE_COLS);
    var col = i % _setup.STAGE_COLS;
    var x = STAGE_PADDING + col * (BRICK_PADDING + BRICK_WIDTH);
    var y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);
    if (cell === 0) return acc;
    return __spreadArrays(acc, [new _Brick.Brick(BRICK_WIDTH, BRICK_HEIGHT, {
      x: x,
      y: y
    }, _setup.BRICK_ENERGY[cell], _setup.BRICK_IMAGES[cell])]);
  }, []);
}
},{"~/sprites/Brick":"sprites/Brick.ts","~/setup":"setup.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var _Ball = require("~/sprites/Ball");

var _Paddle = require("~/sprites/Paddle");

var _CanvasView = require("~/view/CanvasView");

var _Collision = require("~/Collision");

var _paddle = _interopRequireDefault(require("~/images/paddle.png"));

var _ball = _interopRequireDefault(require("~/images/ball.png"));

var _setup = require("~/setup");

var _helpers = require("~/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var Game =
/** @class */
function () {
  function Game() {
    var _this = this;

    this.gameover = false;
    this.score = 0;
    this.bricks = [];
    this.view = new _CanvasView.CanvasView('#playField');
    this.view.canvas.width = window.innerWidth;
    this.view.canvas.height = window.innerHeight;
    this.STAGE_PADDING = 10;
    this.STAGE_ROWS = 20;
    this.STAGE_COLS = 10;
    this.BRICK_PADDING = this.view.canvas.height > this.view.canvas.width ? Math.ceil(this.view.canvas.width * 0.0056) : Math.ceil(this.view.canvas.height * 0.0056);
    this.BRICK_WIDTH = this.view.canvas.width * 0.096;
    this.BRICK_HEIGHT = this.view.canvas.height * 0.044;
    this.PADDLE_WIDTH = this.view.canvas.width * 0.075;
    this.PADDLE_HEIGHT = this.view.canvas.height * 0.02;
    this.PADDLE_STARTX = this.view.canvas.width / 2 - this.PADDLE_WIDTH;
    this.PADDLE_SPEED = 10;
    this.BALL_SPEED = 5;
    this.BALL_SIZE = this.view.canvas.height * 0.015;
    this.BALL_STARTX = this.view.canvas.width * Math.random();
    this.BALL_STARTY = this.view.canvas.height - 3 * this.PADDLE_HEIGHT;
    window.addEventListener("resize", function (e) {
      _this.resizeHandler(e);
    });
    this.view.initStartButton(this.startGame.bind(this));
  }

  Game.prototype.resizeHandler = function (e) {
    var resizeRatioX = window.innerWidth / this.view.canvas.width;
    var resizeRatioY = window.innerHeight / this.view.canvas.height;
    this.resizeCanvas();
    console.log(e, this.view.canvas.width, this.view.canvas.height);
    this.setVariables();
    this.setSizes();
    this.setPositions(resizeRatioX, resizeRatioY);
    this.view.clear(); // console.log(bricks);

    this.view.drawBricks(this.bricks);

    if (this.ball && this.paddle) {
      this.view.drawSprite(this.paddle);
      this.view.drawSprite(this.ball);
    }
  };

  Game.prototype.resizeCanvas = function () {
    this.view.canvas.width = window.innerWidth;
    this.view.canvas.height = window.innerHeight;
  };

  Game.prototype.setVariables = function () {
    this.STAGE_PADDING = 5;
    this.STAGE_ROWS = 20;
    this.STAGE_COLS = 10;
    this.BRICK_PADDING = this.view.canvas.height > this.view.canvas.width ? Math.ceil(this.view.canvas.width * 0.0056) : Math.ceil(this.view.canvas.height * 0.0056);
    this.BRICK_WIDTH = this.view.canvas.width * 0.096;
    this.BRICK_HEIGHT = this.view.canvas.height * 0.044;
    this.PADDLE_WIDTH = this.view.canvas.width * 0.075;
    this.PADDLE_HEIGHT = this.view.canvas.height * 0.02;
    this.PADDLE_STARTX = this.view.canvas.width / 2 - this.PADDLE_WIDTH;
    this.PADDLE_SPEED = 10;
    this.BALL_SPEED = 5;
    this.BALL_SIZE = this.view.canvas.height * 0.015;
    this.BALL_STARTX = this.view.canvas.width * Math.random();
    this.BALL_STARTY = this.view.canvas.height - 3 * this.PADDLE_HEIGHT;
  };

  Game.prototype.setSizes = function () {
    var _this = this;

    if (this.ball) {
      this.ball.width = this.BALL_SIZE;
      this.ball.height = this.BALL_SIZE;
    }

    if (this.paddle) {
      this.paddle.width = this.PADDLE_WIDTH;
      this.paddle.height = this.PADDLE_HEIGHT;
    }

    this.bricks.forEach(function (b) {
      b.width = _this.BRICK_WIDTH;
      b.height = _this.BRICK_HEIGHT;
    });
  };

  Game.prototype.setPositions = function (resizeRatioX, resizeRatioY) {
    if (this.ball) {
      this.ball.pos = {
        x: resizeRatioX * this.ball.pos.x,
        y: resizeRatioY * this.ball.pos.y
      };
    }

    if (this.paddle) {
      this.paddle.pos = {
        x: resizeRatioX * this.paddle.pos.x,
        y: resizeRatioY * this.paddle.pos.y
      };
    }

    this.bricks.forEach(function (b) {
      b.pos = {
        x: resizeRatioX * b.pos.x,
        y: resizeRatioY * b.pos.y
      };
    });
  };

  Game.prototype.setGameOver = function (view) {
    view.drawInfo('Game over!');
    this.gameover = false;
  };

  Game.prototype.setGameWin = function (view) {
    view.drawInfo('Game won!');
    this.gameover = false;
  };

  Game.prototype.gameLoop = function (view, paddle, ball, bricks, collision) {
    var _this = this;

    this.bricks = __spreadArrays(bricks);
    this.paddle = paddle;
    this.ball = ball;
    view.clear(); // console.log(bricks);

    view.drawBricks(bricks);
    view.drawSprite(paddle);
    view.drawSprite(ball);
    ball.moveBall();

    if (paddle.isMovingLeft && paddle.pos.x > 0 || paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width) {
      paddle.movePaddle();
    }

    collision.checkBallCollision(ball, paddle, view);
    var colliding = collision.isCollidingBricks(ball, bricks);

    if (colliding) {
      this.score += 1;
      view.drawScore(this.score);
    }

    if (this.gameover) return;
    requestAnimationFrame(function () {
      _this.gameLoop(view, paddle, ball, bricks, collision);
    });

    if (bricks.length === 0 || ball.pos.y > view.canvas.height) {
      this.gameover = true;
      view.showStart();
    }
  };

  Game.prototype.startGame = function (view) {
    console.log("Start here!");
    this.gameover = false;
    view.hideStart();
    this.score = 0;
    view.drawInfo('');
    view.drawScore(0);
    this.resizeCanvas();
    this.setVariables();
    var collision = new _Collision.Collision();
    var bricks = (0, _helpers.createBricks)(this.STAGE_PADDING, this.BRICK_PADDING, this.BRICK_WIDTH, this.BRICK_HEIGHT);
    var ball = new _Ball.Ball(this.BALL_SIZE, {
      x: this.BALL_STARTX,
      y: this.BALL_STARTY
    }, this.BALL_SPEED, _ball.default);
    var paddle = new _Paddle.Paddle(_setup.PADDLE_SPEED, this.PADDLE_WIDTH, this.PADDLE_HEIGHT, {
      x: this.PADDLE_STARTX,
      y: view.canvas.height - this.PADDLE_HEIGHT - 5
    }, _paddle.default);
    this.gameLoop(view, paddle, ball, bricks, collision);
  };

  return Game;
}();

setTimeout(function () {
  var game = new Game(); // Start here
}, 100);
},{"~/sprites/Ball":"sprites/Ball.ts","~/sprites/Paddle":"sprites/Paddle.ts","~/view/CanvasView":"view/CanvasView.ts","~/Collision":"Collision.ts","~/images/paddle.png":"images/paddle.png","~/images/ball.png":"images/ball.png","~/setup":"setup.ts","~/helpers":"helpers.ts"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61393" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map