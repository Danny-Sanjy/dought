// Создание звёздного неба
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        starsContainer.appendChild(star);
    }
}

// Плавная прокрутка к секции
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Добавление плавающих сердечек в фон
function addFloatingHearts() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.fontSize = `${10 + Math.random() * 15}px`;
            heart.style.color = 'rgba(255, 77, 109, 0.15)';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.zIndex = '-1';
            heart.style.pointerEvents = 'none';
            heart.innerHTML = '❤️';
            heart.style.animation = `float ${8 + Math.random() * 12}s ease-in-out infinite`;
            heart.style.animationDelay = `${Math.random() * 5}s`;
            document.body.appendChild(heart);
        }, i * 300);
    }
}

const heartClicks = new Map();

function createHeart(data) {
    const heart = document.createElement('div');
    heart.className = 'heart';
}
// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    addFloatingHearts();
    
    // Easter egg: Konami code
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showSecretMessage();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
});

function showSecretMessage() {
    const secret = document.createElement('div');
    secret.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff4d6d, #ff9e6d);
        padding: 40px 60px;
        border-radius: 25px;
        z-index: 9999;
        text-align: center;
        box-shadow: 0 0 60px rgba(255, 77, 109, 0.9);
        font-family: 'Playfair Display', serif;
        font-size: 1.8rem;
        color: white;
        max-width: 90%;
    `;
    secret.innerHTML = '🤫 Ты нашла секрет! Я люблю тебя ещё больше за твою любознательность ❤️';
    document.body.appendChild(secret);
    
    setTimeout(() => {
        secret.style.opacity = '0';
        secret.style.transition = 'opacity 1s ease';
        setTimeout(() => secret.remove(), 1000);
    }, 3000);
}