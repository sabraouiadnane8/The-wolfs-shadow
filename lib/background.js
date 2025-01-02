// Importation des modules nécessaires pour gérer les barres de puissance et les messages
import Power from "./power";
import Message from "./message";

// Définition des propriétés pour les différents calques de l'arrière-plan
const FAR_BACKGROUND = {
  src: './assets/images/parallax/background_far.png', // Chemin de l'image de l'arrière-plan éloigné
  speed: 2, // Vitesse de défilement
  adjust: 0.5, // Ajustement de la vitesse basé sur un multiplicateur
  dx: 1500, // Largeur de l'image (en pixels)
};

const MID_BACKGROUND = {
  src: './assets/images/parallax/background_mid.png',
  speed: 3,
  adjust: 1,
  dx: 1500,
};

const NEAR_BACKGROUND = {
  src: './assets/images/parallax/background_near.png',
  speed: 4,
  adjust: 2,
  dx: 1500,
};

const FOREGROUND = {
  src: './assets/images/parallax/foreground.png',
  speed: 5,
  adjust: 3,
  dx: 1500,
};

const HOUSE = {
  src: './assets/images/parallax/grandmas_house.png',
  speed: 3,
  adjust: 0,
  dx: 2500,
};

// Classe représentant un calque de l'arrière-plan
class Background {
  /**
   * Constructeur pour initialiser un calque d'arrière-plan
   * @param {CanvasRenderingContext2D} context - Contexte de dessin pour le canvas
   * @param {string} description - Type de calque ('far', 'mid', 'near', 'fore', 'house')
   */
  constructor(context, description) {
    // Sélection des propriétés en fonction du type de calque
    switch (description) {
      case 'far':
        this.options = FAR_BACKGROUND;
        break;
      case 'mid':
        this.options = MID_BACKGROUND;
        break;
      case 'near':
        this.options = NEAR_BACKGROUND;
        break;
      case 'fore':
        this.options = FOREGROUND;
        break;
      case 'house':
        this.options = HOUSE;
        break;
    }

    // Initialisation des propriétés
    this.description = description; // Type de calque
    this.speed = this.options.speed; // Vitesse de défilement
    this.adjust = this.options.adjust; // Ajustement de la vitesse
    this.xPos = 0; // Position horizontale initiale
    this.dx = this.options.dx; // Largeur de l'image
    this.dx1 = null; // Position x1 pour le dessin de l'image
    this.dx2 = null; // Position x2 pour le dessin de l'image répétée
    this.dy = 0; // Position verticale (fixe à 0)
    this.context = context; // Contexte de dessin pour le canvas

    // Liaison des méthodes pour conserver le contexte
    this.draw = this.draw.bind(this);
    this.render = this.render.bind(this);
    this.text = null; // Message ou texte optionnel pour ce calque

    // Chargement de l'image
    this.image = new Image();
    this.image.onload = () => {
      // Dessin initial lorsque l'image est chargée
      this.context.drawImage(
        this.image, 0, 0, this.dx, 400, this.dx1, this.dy, this.dx, 400
      );
    };
    this.image.src = this.options.src; // Chemin vers l'image source

    // Si le calque est au premier plan, on initialise une barre de puissance
    if (this.description === 'fore') {
      this.powerBar = new Power(this.context);
    }
  }

  // Méthode pour dessiner l'image en double (effet de défilement continu)
  draw() {
    this.context.drawImage(
      this.image, 0, 0, this.dx, 400, this.dx1, this.dy, this.dx, 400
    );
    this.context.drawImage(
      this.image, 0, 0, this.dx, 400, this.dx2, this.dy, this.dx, 400
    );
  }

  /**
   * Rend le calque à l'écran, avec les ajustements de vitesse et de position
   * @param {number} speed - Vitesse actuelle du jeu
   * @param {number|null} power - Puissance actuelle (utilisé uniquement pour le premier plan)
   */
  render(speed = 0, power = null) {
    // Effacer le canvas avant le nouveau dessin
    this.context.clearRect(0, 0, 800, 400);

    // Calcul des positions pour dessiner les images
    this.dx1 = this.xPos;
    this.dx2 = this.xPos + this.dx;

    // Dessiner les deux parties de l'arrière-plan
    this.draw();

    // Si c'est le premier plan, afficher la barre de puissance
    if (this.description === 'fore') {
      this.powerBar.render(power);
    }

    // Si un texte est associé au calque, le dessiner
    if (this.text) {
      this.text.render();
    }

    // Réinitialiser la position horizontale pour créer l'effet de défilement continu
    if (this.xPos <= -1500 && this.description !== 'house') this.xPos += 1500;

    // Déplacer l'arrière-plan vers la gauche
    this.xPos -= (this.speed - (this.adjust * speed));
  }
}

// Exporter la classe pour son utilisation dans d'autres fichiers
export default Background;
