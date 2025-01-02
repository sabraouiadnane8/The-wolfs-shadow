// Classe Message pour afficher des images de texte correspondant au niveau du jeu
class Message {
  // Le constructeur initialise le message en fonction du contexte et du niveau
  constructor(context, level) {
    this.context = context;   // Contexte de dessin du canvas
    this.frameCount = 0;      // Compteur de frames pour animer l'image
    this.spriteY = -100;      // Position Y de l'image du texte (démarre en dehors de l'écran)
    this.image = new Image(); // Création de l'objet Image

    // Sélection de l'image en fonction du niveau
    switch (level) {
      case 1:
        this.image.src = './assets/images/text/level_one.png'; // Image pour le niveau 1
        break;
      case 2:
        this.image.src = './assets/images/text/level_two.png'; // Image pour le niveau 2
        break;
      case 3:
        this.image.src = './assets/images/text/level_three.png'; // Image pour le niveau 3
        break;
      case 4:
        this.image.src = './assets/images/text/level_four.png'; // Image pour le niveau 4
        break;
      case 5:
        this.image.src = './assets/images/text/level_five.png'; // Image pour le niveau 5
        break;
      case 6:
        this.image.src = './assets/images/text/level_six.png'; // Image pour le niveau 6
        break;
      case 7:
        this.image.src = './assets/images/text/level_seven.png'; // Image pour le niveau 7
        break;
      case 8:
        this.image.src = './assets/images/text/level_eight.png'; // Image pour le niveau 8
        break;
      case 9:
        this.image.src = './assets/images/text/level_nine.png'; // Image pour le niveau 9
        break;
      case 10:
        this.image.src = './assets/images/text/level_ten.png'; // Image pour le niveau 10
        break;
    }
  }

  // Méthode pour dessiner et animer le message à l'écran
  render() {
    // Dessine l'image sur le canvas avec les paramètres définis
    this.context.drawImage(
      this.image,            // Image à afficher
      0, this.spriteY,       // Position de l'image dans le sprite (coordonnée Y animée)
      1000, 100,             // Taille de l'image dans le sprite
      150, 100,              // Position X, Y du texte sur le canvas
      500, 50                // Taille de l'image à afficher sur le canvas
    );

    // Incrémente le compteur de frames et réinitialise après 10
    this.frameCount = (this.frameCount + 1) % 10;

    // Change la position Y pour animer le texte
    if (this.frameCount === 0) {
      this.spriteY = (this.spriteY + 100); // Décale la position de l'image dans le sprite pour l'animation
    }
  }
}

// Exportation de la classe Message pour qu'elle soit utilisée dans d'autres fichiers
export default Message;
