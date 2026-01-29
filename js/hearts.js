const heartsData = [
    { type: 'text', content: 'Я тебя люблю больше жизни' },
    { type: 'text', content: 'Ты моя радость и счастье' },
    { type: 'text', content: 'С тобой я чувствую себя дома' },
    { type: 'text', content: 'Ты делаешь меня лучше' },
    { type: 'text', content: 'Каждый день с тобой - подарок' },
    { type: 'text', content: 'Ты моя мечта, которая стала явью' },
    { type: 'text', content: 'Люблю твою улыбку ❤️' },
    { type: 'text', content: 'Ты самое дорогое в моей жизни' },
    { type: 'text', content: 'Хочу быть с тобой всегда' },
    { type: 'photo', src: 'assets/img/moya1.jpg' },
];

const heartClicks = new Map();

function createHeart(data) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    
    const leftPos = Math.random() * (window.innerWidth - 250);
    heart.style.left = `${leftPos}px`;
    
    const duration = 12 + Math.random() * 8;
    heart.style.animation = `fall ${duration}s linear forwards`;
    heart.style.animationDelay = `${Math.random() * 2}s`;
    
    const front = document.createElement('div');
    front.className = 'heart-side heart-front';
    
    const back = document.createElement('div');
    back.className = 'heart-side heart-back';
    
    if (data.type === 'text') {
        front.innerHTML = '❤️';
        back.textContent = data.content;
    } else if (data.type === 'photo') {
        front.className = 'heart-side heart-photo';
        const img = document.createElement('img');
        img.src = data.src;
        img.alt = 'Фото';
        front.appendChild(img);
        back.textContent = 'Как же ты прекрасна...';
    }
    
    heart.appendChild(front);
    heart.appendChild(back);
    
    heartClicks.set(heart, 0);
    
    heart.addEventListener('click', () => {
        const count = heartClicks.get(heart);
        
        if (count >= 3) {
            heart.style.animation = 'none';
            heart.style.opacity = '0';
            setTimeout(() => heart.remove(), 500);
            return;
        }
        
        heartClicks.set(heart, count + 1);
        heart.classList.add('paused');
        
        heart.style.transform = 'scale(1.3)';
        setTimeout(() => {
            heart.style.transform = 'scale(1)';
        }, 300);
        
        setTimeout(() => {
            heart.classList.remove('paused');
        }, 8000);
    });
    
    document.getElementById('scene').appendChild(heart);
    
    heart.addEventListener('animationend', () => {
        if (!heart.classList.contains('paused') && heart.style.opacity !== '0') {
            heart.remove();
        }
    });
}

function startHearts() {
    setInterval(() => {
        if (document.getElementById('scene').children.length < 15) {
            const data = heartsData[Math.floor(Math.random() * heartsData.length)];
            createHeart(data);
        }
    }, 1000 + Math.random() * 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(startHearts, 1000);
});