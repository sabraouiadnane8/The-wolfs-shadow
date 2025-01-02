// Classe représentant un ennemi dans le jeu
class Enemy {
  /**
   * Constructeur de l'ennemi
   * @param {CanvasRenderingContext2D} context - Contexte de dessin pour afficher l'ennemi
   */
  constructor(context) {
    this.context = context; // Contexte de dessin
    this.minXPos = -175; // Position horizontale minimale de l'ennemi
    this.xPos = -175; // Position horizontale initiale de l'ennemi
    this.yPos = 300; // Position verticale fixe de l'ennemi
    this.acceleration = 0.005; // Accélération constante de l'ennemi
    this.speed = 0; // Vitesse actuelle de l'ennemi

    // Sons associés aux grognements de l'ennemi
    this.growl1 = new Audio('./assets/sound/growl1.wav');
    this.growl2 = new Audio('./assets/sound/growl2.wav');
    this.growl3 = new Audio('./assets/sound/growl3.wav');

    // Initialisation de l'image de l'ennemi
    this.initializeImages();

    // Propriétés pour gérer l'animation (frame par frame)
    this.frameCount = 0; // Compteur de frames
    this.spriteY = 0; // Position verticale dans le sprite (pour animer)
  }

  // Limite la vitesse de l'ennemi à une plage spécifiée
  assessSpeed() {
    if (this.speed > 0.5) {
      this.speed = 0.5; // Limite supérieure
    } else if (this.speed < -0.5) {
      this.speed = -0.5; // Limite inférieure
    }
  }

  // Ajuste la position horizontale de l'ennemi pour éviter qu'il sorte de l'écran
  assessXPos() {
    if (this.xPos < this.minXPos) {
      this.xPos += 0.5; // Corrige la position si elle est trop basse
    } else if (this.xPos > 400) {
      this.xPos = 400; // Limite maximale pour la position horizontale
    }
  }

  // Initialise l'image de l'ennemi à partir du chemin source
  initializeImages() {
    this.image = new Image();
    this.image.src = './assets/images/big_bad_wolf/wolf_running.png'; // Sprite de l'ennemi
  }

  // Réinitialise les propriétés de mouvement de l'ennemi
  fallBack() {
    this.acceleration = 0; // Supprime l'accélération
    this.speed = 0; // Réinitialise la vitesse
    this.minXPos = -200; // Réduit encore la position minimale
  }

  // Joue un son aléatoire parmi les grognements disponibles
  growl() {
    const random = Math.floor(Math.random() * 3) + 1; // Génère un entier entre 1 et 3
    switch (random) {
      case 1:
        this.growl1.play(); // Joue le premier grognement
        break;
      case 2:
        this.growl2.play(); // Joue le deuxième grognement
        break;
      case 3:
        this.growl3.play(); // Joue le troisième grognement
        break;
    }
  }

  // Affiche et déplace l'ennemi, tout en gérant l'animation du sprite
  render() {
    // Dessine l'image de l'ennemi sur le canvas
    this.context.drawImage(
      this.image, // Image source
      0, this.spriteY, 400, 200, // Dimensions dans le sprite
      this.xPos, this.yPos, 200, 100 // Position et taille sur le canvas
    );

    // Gère l'animation (avance dans le sprite toutes les 4 frames)
    this.frameCount = (this.frameCount + 1) % 4;
    if (this.frameCount === 0) {
      this.spriteY = (this.spriteY + 200) % 1200; // Change la frame dans le sprite
    }

    // Met à jour la vitesse en fonction de l'accélération
    this.speed += this.acceleration;
    this.assessSpeed(); // Limite la vitesse

    // Met à jour la position horizontale
    this.xPos += this.speed;
    this.assessXPos(); // Ajuste la position si elle dépasse les limites
  }
}

// Exporte la classe Enemy pour permettre son utilisation dans d'autres fichiers
export default Enemy;
