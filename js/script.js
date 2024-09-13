

function openProfile() {
    document.getElementById('profileView').classList.remove('hidden');
}

function closeProfile() {
    document.getElementById('profileView').classList.add('hidden');
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.play();
}

function handleDislike() {
    const dislikeButton = document.getElementById('dislikeButton');
    const container = document.querySelector('.profile-card');

    // Rayon de déplacement aléatoire
    const maxMove = 150;
    
    // Taille de la carte de profil
    const containerRect = container.getBoundingClientRect();
    
    // Taille du bouton Dislike
    const buttonRect = dislikeButton.getBoundingClientRect();

    // Calculer des positions aléatoires dans la zone définie
    let randomX = (Math.random() - 0.5) * 2 * maxMove;
    let randomY = (Math.random() - 0.5) * 2 * maxMove;

    // Vérification pour éviter de sortir de la zone visible
    const newPosX = buttonRect.left + randomX;
    const newPosY = buttonRect.top + randomY;

    // Assurer que le bouton reste dans la zone définie par le rayon de 150px
    const withinBoundsX = 
        newPosX > containerRect.left - maxMove && 
        newPosX + buttonRect.width < containerRect.right + maxMove;
    
    const withinBoundsY = 
        newPosY > containerRect.top - maxMove && 
        newPosY + buttonRect.height < containerRect.bottom + maxMove;

    if (withinBoundsX && withinBoundsY) {
        // Appliquer la transformation uniquement si elle est dans les limites
        dislikeButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
    } else {
        // Sinon, recalculer une nouvelle position dans les limites
        handleDislike();
    }
}


function handleSwipe(direction) {
    if (direction === 'left') {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    } else if (direction === 'right') {
        const errorMessage = document.getElementById('errorMessage');
        const rainContainer = document.getElementById('rainContainer');
        const body = document.body;

        errorMessage.style.display = 'block';
        rainContainer.style.display = 'block';
        body.classList.add('grayscale');

        const helloDarkness = document.getElementById('helloDarkness');
        if (helloDarkness) {
            helloDarkness.play().catch(error => {
                console.error('Erreur lors de la lecture du fichier audio:', error);
            });
        } else {
            console.error('L\'élément audio n\'a pas été trouvé.');
        }

        setTimeout(() => {
            if (helloDarkness) {
                helloDarkness.pause();
                helloDarkness.currentTime = 0;
            }
            errorMessage.style.display = 'none';
            rainContainer.style.display = 'none';
            body.classList.remove('grayscale');
        }, 10000);
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    notificationText.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function triggerLikeAnimation() {
    // Appliquer le flou
    document.querySelector('.sidebar').classList.add('blur-background');
    document.querySelector('.profile-card').classList.add('blur-background');
    document.querySelector('.buttons-container').classList.add('blur-background');
    document.querySelector('.swipe-arrow').classList.add('blur-background');
    document.querySelector('.swipe-arrow.right').classList.add('blur-background');
  
    
    
    // Afficher l'image "It's a match"
    const celebrationContainer = document.getElementById('celebrationContainer');
    celebrationContainer.style.display = 'block';

    // Jouer le son de célébration
    playSound('celebrationSound');

    // Lancer les feux d'artifice
    launchFireworks();

    // Cacher l'animation après 3 secondes et retirer le flou
    setTimeout(() => {
        celebrationContainer.style.display = 'none';
        document.querySelector('.sidebar').classList.remove('blur-background');
        document.querySelector('.profile-card').classList.remove('blur-background');
        document.querySelector('.buttons-container').classList.remove('blur-background');
        document.querySelector('.swipe-arrow').classList.remove('blur-background');
        document.querySelector('.swipe-arrow.right').classList.remove('blur-background');

    }, 15000);
}

function launchFireworks() {
    const fireworksContainer = document.getElementById('fireworks-container');

    // Fonction pour créer un feu d'artifice
    function createFirework() {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        
        // Position aléatoire dans l'écran
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;

        firework.style.left = `${randomX}px`;
        firework.style.top = `${randomY}px`;

        // Ajouter le feu d'artifice au conteneur
        fireworksContainer.appendChild(firework);

        // Retirer le feu d'artifice après l'animation
        setTimeout(() => {
            firework.remove();
        }, 1000); // Supprimer après 1 seconde
    }

    // Lancer des feux d'artifice toutes les 5 secondes
    let fireworksInterval = setInterval(() => {
        for (let i = 0; i < 10; i++) {
            createFirework(); // Créer plusieurs particules à la fois
        }
    }, 5000); // Créer des feux d'artifice toutes les 5 secondes

    // Arrêter les feux d'artifice après 15 secondes
    setTimeout(() => {
        clearInterval(fireworksInterval);
    }, 15000); // Arrêter après 15 secondes
}
