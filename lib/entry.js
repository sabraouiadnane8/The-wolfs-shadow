// Importation des bibliothèques nécessaires
import _ from 'lodash'; // Librairie utilitaire pour les fonctions pratiques
import Timer from 'easytimer.js'; // Librairie pour gérer le chronomètre
import Game from './game'; // Classe principale du jeu

// Exécute le code une fois que la page HTML est entièrement chargée
document.addEventListener('DOMContentLoaded', () => {
  // Récupération des éléments canvas pour les différents calques
  const far = document.getElementById('farCanvas'); // Calque arrière éloigné
  const mid = document.getElementById('midCanvas'); // Calque arrière intermédiaire
  const near = document.getElementById('nearCanvas'); // Calque arrière proche
  const fore = document.getElementById('foreCanvas'); // Premier plan
  const canvas = document.getElementById('myCanvas'); // Canvas principal
  const house = document.getElementById('houseCanvas'); // Maison (fin du jeu)

  // Création d'une instance du jeu et d'un chronomètre
  const game = new Game(canvas, far, mid, near, fore, house);
  const timer = new Timer();

  // Récupération des boutons de contrôle
  const pauseBtn = document.getElementById('pause');
  const playBtn = document.getElementById('play');
  const muteBtn = document.getElementById('mute');
  const unmuteBtn = document.getElementById('unmute');
  const retryBtn = document.getElementById('retry');
  const startBtn = document.getElementById('start');
  const playAgainBtn = document.getElementById('play-again');

  // Récupération des autres éléments de l'interface utilisateur
  const clock = document.getElementById('timer'); // Affichage du chronomètre
  const gameWon = document.getElementById('game-won'); // Écran de victoire
  const gameStart = document.getElementById('game-start'); // Écran de démarrage
  const gameLost = document.getElementById('game-lost'); // Écran de défaite
  const appleCount = document.getElementById('apple-count'); // Compteur de pommes
  let animationId; // ID de l'animation utilisée pour l'annuler si nécessaire

  // Chargement de la musique d'ambiance
  const music = new Audio('./assets/sound/Escaping the Collapsing Universe - Komiku.mp3');
  music.loop = true; // Répète la musique en boucle

  // Mise à jour du chronomètre et des événements liés au temps
  timer.addEventListener('secondTenthsUpdated', () => {
    // Mise à jour de l'affichage du chronomètre
    clock.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']);
    appleCount.innerHTML = `${game.apples} Apples Collected`; // Mise à jour du compteur de pommes

    // Récupération des valeurs de temps
    const minutes = timer.getTimeValues().minutes;
    const seconds = timer.getTimeValues().seconds;
    const tenths = timer.getTimeValues().secondTenths;

    // Actions basées sur le temps écoulé
    if (seconds % 10 === 0 && tenths === 0 && game.sound) {
      game.enemy.growl(); // L'ennemi grogne toutes les 10 secondes
    }
    if (seconds % 12 === 0 && tenths === 0) {
      game.addLevel(); // Augmente le niveau toutes les 12 secondes
    }
    if (minutes === 2 && seconds === 0) {
      game.won(); // Déclare la victoire après 2 minutes
      timer.stop(); // Arrête le chronomètre
    }
  });

  // Fonction principale pour rendre le jeu
  function step() {
    game.render(); // Affiche les éléments du jeu
    animationId = requestAnimationFrame(step); // Planifie la prochaine image

    // Vérifie si le jeu est perdu
    if (game.isLost()) {
      cancelAnimationFrame(animationId); // Arrête l'animation
      game.littleRed.sound.pause(); // Met en pause le son du personnage
      if (game.sound) game.enemy.growl(); // Joue un grognement si le son est activé
      timer.stop(); // Arrête le chronomètre
      gameLost.classList.remove('hidden'); // Affiche l'écran de défaite
    } else if (game.isWon) {
      cancelAnimationFrame(animationId); // Arrête l'animation
      game.littleRed.sound.pause(); // Met en pause le son du personnage
      timer.stop(); // Arrête le chronomètre
      gameWon.classList.remove('hidden'); // Affiche l'écran de victoire
    }
  }

  // Fonction pour lancer le jeu
  function play() {
    if (game.pause) {
      game.pause = false; // Désactive l'état de pause
      requestAnimationFrame(step); // Commence l'animation
      timer.start({ precision: 'secondTenths' }); // Démarre le chronomètre
      if (game.sound) {
        music.play(); // Joue la musique
        game.littleRed.sound.play(); // Joue le son du personnage
      }
    }
  }

  // Gestion des boutons

  pauseBtn.onclick = () => {
    if (!game.pause) {
      game.pause = true; // Active l'état de pause
      cancelAnimationFrame(animationId); // Arrête l'animation
      timer.pause(); // Met en pause le chronomètre
      game.littleRed.sound.pause(); // Met en pause le son du personnage
    }
  };

  playBtn.onclick = () => {
    play(); // Relance le jeu
  };

  playAgainBtn.onclick = () => {
    gameWon.classList.add('hidden'); // Masque l'écran de victoire
    clock.innerHTML = '00:00:0'; // Réinitialise le chronomètre
    game.playAgain(); // Réinitialise le jeu
    play(); // Relance le jeu
  };

  startBtn.onclick = () => {
    gameStart.classList.add('hidden'); // Masque l'écran de démarrage
    clock.innerHTML = '00:00:0'; // Réinitialise le chronomètre
    game.playAgain(); // Réinitialise le jeu
    play(); // Commence le jeu
  };

  retryBtn.onclick = () => {
    gameLost.classList.add('hidden'); // Masque l'écran de défaite
    clock.innerHTML = '00:00:0'; // Réinitialise le chronomètre
    game.playAgain(); // Réinitialise le jeu
    play(); // Relance le jeu
  };

  muteBtn.onclick = () => {
    game.sound = false; // Désactive le son
    music.pause(); // Met en pause la musique
    game.littleRed.sound.pause(); // Met en pause le son du personnage
  };

  unmuteBtn.onclick = () => {
    game.sound = true; // Active le son
    music.play(); // Joue la musique
    game.littleRed.sound.play(); // Joue le son du personnage
  };
});
