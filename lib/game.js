// Importation des modules nécessaires pour les différents éléments du jeu
import Player from "./player";
import Enemy from "./enemy";
import Background from "./background";
import Apple from "./apple";
import Message from "./message";

// Classe principale du jeu
class Game {
  // Le constructeur initialise les paramètres du jeu et l'environnement
  constructor(canvas, far, mid, near, fore, house) {
    this.canvas = canvas;               // Le canevas principal pour dessiner le jeu
    this.farCanvas = far;               // Le canevas pour l'arrière-plan lointain
    this.midCanvas = mid;               // Le canevas pour l'arrière-plan intermédiaire
    this.nearCanvas = near;             // Le canevas pour l'arrière-plan proche
    this.foreCanvas = fore;             // Le canevas pour l'avant-plan
    this.houseCanvas = house;           // Le canevas pour la maison

    // Contextes de chaque canevas pour dessiner dessus
    this.context = canvas.getContext('2d');
    this.farContext = far.getContext('2d');
    this.midContext = mid.getContext('2d');
    this.nearContext = near.getContext('2d');
    this.foreContext = fore.getContext('2d');
    this.houseContext = house.getContext('2d');

    // Initialisation des paramètres du jeu
    this.level = 1;                     // Niveau actuel
    this.apples = 0;                    // Nombre de pommes collectées
    this.pause = true;                  // État de pause du jeu
    this.sound = true;                  // État du son
    this.power = 800;                   // Puissance du joueur
    this.winTransition = false;         // Transition de victoire
    this.isWon = false;                 // Indicateur de victoire

    // Initialisation des éléments du jeu
    this.initializeGame();
    this.initializeElements();
    this.initializeParallax();
    
    // Liaisons de méthodes à ce contexte pour les gestionnaires d'événements
    this.jump = this.jump.bind(this);
    this.touchJump = this.touchJump.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.won = this.won.bind(this);
  }

  // Écouteurs d'événements pour les actions de l'utilisateur (sauter)
  initializeGame() {
    document.addEventListener('keydown', (e) => this.jump(e)); // Saut avec les touches du clavier
    document.addEventListener('click', (e) => this.touchJump(e)); // Saut avec un clic de souris
  }

  // Création des éléments principaux du jeu : le joueur, les ennemis, et les objets (pommes)
  initializeElements() {
    this.littleRed = new Player(this.context); // Création du joueur
    this.enemy = new Enemy(this.context);      // Création de l'ennemi
    this.items = [
      // Création des pommes à collecter (avec leurs positions)
      new Apple(this.context, 'lowApple', 875, 1000),
      new Apple(this.context, 'lowApple', 1175, 1200),
      new Apple(this.context, 'medApple', 1025, 1200),
      new Apple(this.context, 'medApple', 1525, 1400),
      new Apple(this.context, 'highApple', 1375, 1400),
      new Apple(this.context, 'highApple', 2075, 1600)
    ];
  }

  // Initialisation des différents plans parallaxes pour l'effet de défilement
  initializeParallax() {
    // Création des arrière-plans à différents niveaux de profondeur
    this.farGround = new Background(this.farContext, 'far');
    this.midGround = new Background(this.midContext, 'mid');
    this.nearGround = new Background(this.nearContext, 'near');
    this.houseGround = new Background(this.houseContext, 'house');
    this.foreGround = new Background(this.foreContext, 'fore');
    
    // Ajout d'un message au premier plan
    this.foreGround.text = new Message(this.context, 1);
  }

  // Fonction pour ajouter un niveau au jeu, augmentant la difficulté
  addLevel() {
    this.level += 1;              // Augmenter le niveau
    this.enemy.minXPos += 50;     // Augmenter la position minimale de l'ennemi
    this.foreGround.text = new Message(this.context, this.level); // Mise à jour du message affiché
  }
}

// Exportation de la classe Game pour utilisation ailleurs
export default Game;
