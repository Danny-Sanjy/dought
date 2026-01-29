document.addEventListener('DOMContentLoaded', () => {
    const proposalBtn = document.getElementById('proposalBtn');
    if (proposalBtn) {
        // click + touch для мобильных
        proposalBtn.addEventListener('click', showProposal);
        proposalBtn.addEventListener('touchstart', showProposal);
    }

    function showProposal(e) {
        e.preventDefault(); // предотвращаем двойной срабатывание на мобильных
        this.style.display = 'none';
        document.getElementById('proposalQuestion').classList.add('show');
    }
});

function showMessage(content, bgColor = 'rgba(0,0,0,0.7)') {
    const message = document.createElement('div');
    message.className = 'custom-message';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    
    // Адаптивный фон для мобильных
    message.style.width = '90%';
    message.style.maxWidth = '480px'; // ограничиваем на больших экранах
    message.style.padding = '20px';
    message.style.borderRadius = '15px';
    message.style.textAlign = 'center';
    message.style.zIndex = '9999';
    message.style.backgroundColor = bgColor;
    message.style.color = '#fff';
    message.style.wordWrap = 'break-word';
    message.style.fontSize = '1rem';
    message.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';

    message.innerHTML = content;
    document.body.appendChild(message);

    // Автоудаление через 5 секунд
    setTimeout(() => {
        if (message.parentNode) message.parentNode.removeChild(message);
    }, 5000);
}

function acceptProposal() {
    createFireworks();

    const content = `
        <h1 style="font-size: 3rem; color: #f9114f; margin-bottom: 15px; font-family: 'Playfair Display', serif;">❤️ ДА! ❤️</h1>
        <p style="font-size: 1.5rem; font-family: 'Montserrat', sans-serif;">Я так счастлив! Ты сделала меня самым счастливым человеком на свете!</p>
        <p style="font-size: 1.2rem; margin-top: 15px; font-family: 'Montserrat', sans-serif;">Теперь мы будем вместе вечно 💕</p>
    `;
    showMessage(content, 'rgba(77, 75, 76, 0.9)');

    if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
}

function declineProposal() {
    createRain();

    const content = `
        <h1 style="font-size: 2.5rem; color: #f43636; margin-bottom: 15px; font-family: 'Playfair Display', serif;">💔 Вот оно как...</h1>
        <p style="font-size: 1.5rem; font-family: 'Montserrat', sans-serif;">Очень жаль...</p>
        <p style="font-size: 1.2rem; margin-top: 15px; font-family: 'Montserrat', sans-serif;">Но я всё равно буду любить тебя...</p>
    `;
    showMessage(content, 'rgba(75, 75, 75, 0.9)');
}

function createFireworks() {
    const countHearts = window.innerWidth < 500 ? 50 : 100; // меньше на мобиле
    const countConfetti = window.innerWidth < 500 ? 100 : 200;

    for (let i = 0; i < countHearts; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'hearts-float';
            heart.innerHTML = '❤️';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
            heart.style.fontSize = `${15 + Math.random() * 25}px`; // чуть меньше на телефоне
            document.body.appendChild(heart);

            setTimeout(() => {
                if (heart.parentNode) heart.parentNode.removeChild(heart);
            }, 3000);
        }, i * 50);
    }

    for (let i = 0; i < countConfetti; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
            confetti.style.width = `${4 + Math.random() * 8}px`;
            confetti.style.height = `${4 + Math.random() * 8}px`;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            document.body.appendChild(confetti);

            setTimeout(() => {
                if (confetti.parentNode) confetti.parentNode.removeChild(confetti);
            }, 5000);
        }, i * 20);
    }
}

function createRain() {
    const countDrops = window.innerWidth < 500 ? 100 : 200;
    for (let i = 0; i < countDrops; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain';
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        drop.style.opacity = `${0.2 + Math.random() * 0.8}`;
        document.body.appendChild(drop);

        setTimeout(() => {
            if (drop.parentNode) drop.parentNode.removeChild(drop);
        }, 6000);
    }
}
