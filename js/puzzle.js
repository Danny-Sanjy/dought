let puzzlePieces = [];
let emptySlot = 8;
let currentImage = 'assets/img/moya4.jpg'; // ссылка на твое фото

function createPuzzle() {
    const board = document.getElementById('puzzleBoard');
    board.innerHTML = '';
    puzzlePieces = [];
    
    for (let i = 0; i < 9; i++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.dataset.index = i;
        
        if (i < 8) {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const bgX = col * 100;
            const bgY = row * 100;
            
            piece.style.backgroundImage = `url(assets/img/moya4.jpg)`; // ссылка на твое фото
            piece.style.backgroundPosition = `-${bgX}px -${bgY}px`;
            piece.style.backgroundSize = '300px 300px';
            
            piece.onclick = () => movePiece(i);
        }
        
        board.appendChild(piece);
        puzzlePieces.push(piece);
    }
    
    emptySlot = 8;
    document.getElementById('puzzleMessage').classList.remove('show');
}

function shufflePuzzle() {
    for (let i = 0; i < 100; i++) {
        const neighbors = getValidMoves();
        if (neighbors.length > 0) {
            const randomIndex = Math.floor(Math.random() * neighbors.length);
            movePiece(neighbors[randomIndex]);
        }
    }
}

function getValidMoves() {
    const row = Math.floor(emptySlot / 3);
    const col = emptySlot % 3;
    const moves = [];
    
    if (row > 0) moves.push(emptySlot - 3);
    if (row < 2) moves.push(emptySlot + 3);
    if (col > 0) moves.push(emptySlot - 1);
    if (col < 2) moves.push(emptySlot + 1);
    
    return moves;
}

function movePiece(index) {
    const piece = puzzlePieces[index];
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptySlot / 3);
    const emptyCol = emptySlot % 3;
    
    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) !== 1) {
        return;
    }
    
    puzzlePieces[emptySlot].style.backgroundImage = `url(assets/img/moya4.jpg)`; // ссылка на твое фото
    puzzlePieces[emptySlot].style.backgroundPosition = piece.style.backgroundPosition;
    puzzlePieces[emptySlot].dataset.index = piece.dataset.index;
    
    piece.style.backgroundImage = '';
    piece.style.backgroundPosition = '';
    piece.dataset.index = emptySlot;
    
    emptySlot = index;
    
    checkWin();
}

function checkWin() {
    let win = true;
    
    for (let i = 0; i < 8; i++) {
        const piece = puzzlePieces[i];
        if (parseInt(piece.dataset.index) !== i) {
            win = false;
            break;
        }
    }
    
    if (win) {
        setTimeout(() => {
            document.getElementById('puzzleMessage').classList.add('show');
            createConfetti();
        }, 500);
    }
}

function resetPuzzle() {
    createPuzzle();
}

function changePuzzleImage() {
    currentImage = 'assets/img/moya4.jpg'; // ссылка на твое фото
    createPuzzle();
}

function loadCustomImage() {
    // Оставляем функцию, но она будет всегда подставлять твою картинку
    currentImage = 'assets/img/moya4.jpg'; // ссылка на твое фото
    createPuzzle();
}

function createConfetti() {
    const confettiCount = 150;
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 20);
    }
    
    setTimeout(() => {
        confettiContainer.remove();
    }, 5200);
}

document.addEventListener('DOMContentLoaded', createPuzzle);
