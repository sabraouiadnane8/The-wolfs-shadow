import Player from "./player";
import Enemy from "./enemy";
import Background from "./background";
import Apple from "./apple";
import Message from "./message";

class Game {
  constructor(canvas, far, mid, near, fore, house) {
    this.canvas = canvas;
    this.farCanvas = far;
    this.midCanvas = mid;
    this.nearCanvas = near;
    this.foreCanvas = fore;
    this.houseCanvas = house;

    this.context = canvas.getContext('2d');
    this.farContext = far.getContext('2d');
    this.midContext = mid.getContext('2d');
    this.nearContext = near.getContext('2d');
    this.foreContext = fore.getContext('2d');
    this.houseContext = house.getContext('2d');

    this.level = 1;
    this.apples = 0;
    this.pause = true;
    this.sound = true;
    this.power = 800;
    this.winTransition = false;
    this.isWon = false;

    this.initializeGame();
    this.initializeElements();
    this.initializeParallax();
    this.jump = this.jump.bind(this);
    this.touchJump = this.touchJump.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.won = this.won.bind(this);
  }

  initializeGame() {
    document.addEventListener('keydown', (e) => this.jump(e));
    document.addEventListener('click', (e) => this.touchJump(e));
  }

  initializeElements() {
    this.littleRed = new Player(this.context);
    this.enemy = new Enemy(this.context);
    this.items = [
      new Apple(this.context, 'lowApple', 875, 1000),
      new Apple(this.context, 'lowApple', 1175, 1200),
      new Apple(this.context, 'medApple', 1025, 1200),
      new Apple(this.context, 'medApple', 1525, 1400),
      new Apple(this.context, 'highApple', 1375, 1400),
      new Apple(this.context, 'highApple', 2075, 1600)
    ];
  }

  initializeParallax() {
    this.farGround = new Background(this.farContext, 'far');
    this.midGround = new Background(this.midContext, 'mid');
    this.nearGround = new Background(this.nearContext, 'near');
    this.houseGround = new Background(this.houseContext, 'house');
    this.foreGround = new Background(this.foreContext, 'fore');
    this.foreGround.text = new Message(this.context, 1);
  }

  addLevel() {
    this.level += 1;
    this.enemy.minXPos += 50;
    this.foreGround.text = new Message(this.context, this.level);
  }

export default Game;
