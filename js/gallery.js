const galleryData = [
    { src: 'assets/img/moya1.jpg' },
    { src: 'assets/img/moya2.jpg' },
    { src: 'assets/img/moya3.jpg' },
    { src: 'assets/img/moya4.jpg'},
    { src: 'assets/img/moya5.jpg' },
  
];

let currentSlide = 0;
let autoPlayInterval;

function createGallery() {
    const galleryTrack = document.getElementById('galleryTrack');
    galleryTrack.innerHTML = '';
    
    galleryData.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = `Фото ${index + 1}`;
        
        const caption = document.createElement('div');
        caption.className = 'caption';
        caption.textContent = item.caption;
        
        slide.appendChild(img);
        slide.appendChild(caption);
        galleryTrack.appendChild(slide);
    });
    
    createDots();
    updateGallery();
}

function createDots() {
    const dotsContainer = document.getElementById('galleryDots');
    dotsContainer.innerHTML = '';
    
    galleryData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'gallery-dot';
        if (index === currentSlide) dot.classList.add('active');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateGallery();
    createDots();
    resetAutoPlay();
}

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + galleryData.length) % galleryData.length;
    updateGallery();
    createDots();
    resetAutoPlay();
}

function updateGallery() {
    document.getElementById('galleryTrack').style.transform = `translateX(-${currentSlide * 100}%)`;
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

document.addEventListener('DOMContentLoaded', () => {
    createGallery();
    startAutoPlay();
    
    const galleryTrack = document.getElementById('galleryTrack');
    galleryTrack.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    galleryTrack.addEventListener('mouseleave', startAutoPlay);
});