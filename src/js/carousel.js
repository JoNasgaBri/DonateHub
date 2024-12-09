// Captura os elementos do carrosse
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Variável para controlar o índice
let currentIndex = 0;

// Função para atualizar o carrossel
function updateCarousel() {
    const totalSlides = slides.length;

    // Verifica se o índice está fora dos limites e ajusta se necessário
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    const offset = -currentIndex * 100;

    // Atualiza a posição do carrossel
    carousel.style.transform = `translateX(${offset}%)`;
}

// Função para avançar para o próximo slide
nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
});

// Função para voltar para o slide anterior
prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
});

// Inicializa o carrossel
updateCarousel();
