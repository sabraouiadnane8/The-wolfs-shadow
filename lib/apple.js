// Définition des propriétés des pommes de différentes valeurs
// Ces objets décrivent l'apparence et les caractéristiques de chaque type de pomme
const HIGH_APPLE = {
  src: './assets/images/elements/apple3.png', // Chemin vers l'image de la pomme
  value: 0.8, // Valeur de la pomme (effet sur le joueur ou l'ennemi)
  yPos: 60, // Position verticale initiale de la pomme
  dx: 35, // Largeur de l'image affichée
  dy: 35, // Hauteur de l'image affichée
};

const MED_APPLE = {
  src: './assets/images/elements/apple2.png',
  value: 0.6,
  yPos: 140,
  dx: 35,
  dy: 35,
};

const LOW_APPLE = {
  src: './assets/images/elements/apple1.png',
  value: 0.4,
  yPos: 220,
  dx: 35,
  dy: 35,
};

// Classe représentant une pomme dans le jeu
class Apple {
  /**
   * Constructeur de la classe Apple
   * @param {CanvasRenderingContext2D} context - Contexte du canvas où dessiner la pomme
   * @param {string} description - Type de pomme ('lowApple', 'medApple', 'highApple')
   * @param {number} xPos - Position horizontale initiale de la pomme
   * @param {number} xOffset - Distance à ajouter lorsque la pomme sort de l'écran
   */
  constructor(context, description, xPos, xOffset) {
    // Choisir les propriétés de la pomme en fonction de sa description
    switch (description) {
      case 'lowApple':
        this.options = LOW_APPLE;
        break;
      case 'medApple':
        this.options = MED_APPLE;
        break;
      case 'highApple':
        this.options = HIGH_APPLE;
        break;
    }

    // Initialisation des propriétés de l'objet Apple
    this.context = context; // Contexte de dessin
    this.value = this.options.value; // Valeur de la pomme
    this.speed = 4; // Vitesse de déplacement horizontal
    this.xPos = xPos; // Position horizontale
    this.yPos = this.options.yPos; // Position verticale
    this.dx = this.options.dx; // Largeur de l'image
    this.dy = this.options.dy; // Hauteur de l'image
    this.xOffset = xOffset; // Décalage pour repositionner la pomme quand elle sort de l'écran
    this.sound = new Audio('./assets/sound/apple1.wav'); // Son joué lorsque la pomme est collectée

    // Chargement de l'image associée à la pomme
    this.image = new Image();
    this.image.src = this.options.src;

    // Lier la méthode render pour s'assurer qu'elle utilise le bon contexte `this`
    this.render = this.render.bind(this);

    // Propriétés pour la gestion des animations (sprite)
    this.frameCount = 0; // Compteur de frames pour animer l'image
    this.spriteY = 0; // Position verticale dans le sprite (animation)
  }

  /**
   * Dessine et déplace la pomme
   * @param {number} speed - Facteur de vitesse (lié au niveau du jeu ou aux paramètres)
   */
  render(speed) {
    // Dessiner la pomme sur le canvas
    this.context.drawImage(
      this.image, // Source de l'image
      0, this.spriteY, 100, 100, // Dimensions dans le sprite
      this.xPos, this.yPos, this.dx, this.dy // Position et taille sur le canvas
    );

    // Gestion de l'animation (changer de frame toutes les 8 itérations)
    this.frameCount = (this.frameCount + 1) % 8;
    if (this.frameCount === 0) {
      this.spriteY = (this.spriteY + 100) % 400; // Avancer dans le sprite
    }

    // Réinitialiser la position horizontale si la pomme sort de l'écran
    if (this.xPos <= -50) this.xPos += this.xOffset;

    // Déplacer la pomme vers la gauche (décalage selon la vitesse)
    this.xPos -= (this.speed - (2 * speed));
  }
}

// Exportation de la classe pour permettre son utilisation dans d'autres fichiers
export default Apple;
