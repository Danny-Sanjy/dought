document.addEventListener('DOMContentLoaded', () => {
    const proposalBtn = document.getElementById('proposalBtn');
    if (proposalBtn) {
        proposalBtn.addEventListener('click', function() {
            this.style.display = 'none';
            document.getElementById('proposalQuestion').classList.add('show');
        });
    }
});

function showMessage(content, bgColor = 'rgba(0,0,0,0.7)') {
    const message = document.createElement('div');
    message.className = 'custom-message';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.padding = '30px';
    message.style.borderRadius = '15px';
    message.style.textAlign = 'center';
    message.style.zIndex = '9999';
    message.style.backgroundColor = bgColor;
    message.style.color = '#fff';
    message.innerHTML = content;

    document.body.appendChild(message);

    // Автоудаление через 5 секунд
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 5000);
}

function acceptProposal() {
    createFireworks();

    const content = `
        <h1 style="font-size: 4rem; color: #ff4d6d; margin-bottom: 20px; font-family: 'Playfair Display', serif;">❤️ ДА! ❤️</h1>
        <p style="font-size: 2rem; font-family: 'Montserrat', sans-serif;">Я так счастлив! Ты сделала меня самым счастливым человеком на свете!</p>
        <p style="font-size: 1.5rem; margin-top: 20px; font-family: 'Montserrat', sans-serif;">Теперь мы будем вместе вечно 💕</p>
    `;
    showMessage(content, 'rgba(255, 77, 109, 0.9)');

    // Вибрация телефона (если поддерживается)
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200]);
    }
}

function declineProposal() {
    createRain();

    const content = `
        <h1 style="font-size: 3rem; color: #f44336; margin-bottom: 20px; font-family: 'Playfair Display', serif;">💔 Вот оно как...</h1>
        <p style="font-size: 2rem; font-family: 'Montserrat', sans-serif;">Очень жаль...</p>
        <p style="font-size: 1.5rem; margin-top: 20px; font-family: 'Montserrat', sans-serif;">Но я всё равно буду любить тебя...</p>
    `;
    showMessage(content, 'rgba(244, 67, 54, 0.9)');
}

function createFireworks() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'hearts-float';
            heart.innerHTML = '❤️';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
            heart.style.fontSize = `${20 + Math.random() * 30}px`;
            document.body.appendChild(heart);

            setTimeout(() => {
                if (heart.parentNode) heart.parentNode.removeChild(heart);
            }, 3000);
        }, i * 50);
    }

    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
            confetti.style.width = `${5 + Math.random() * 10}px`;
            confetti.style.height = `${5 + Math.random() * 10}px`;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            document.body.appendChild(confetti);

            setTimeout(() => {
                if (confetti.parentNode) confetti.parentNode.removeChild(confetti);
            }, 5000);
        }, i * 20);
    }
}

function createRain() {
    for (let i = 0; i < 200; i++) {
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
