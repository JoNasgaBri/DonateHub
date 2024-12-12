// Captura os elementos do carrossel
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const donateButtons = document.querySelectorAll('.donate-button');

// Variável para controlar o índice
let currentIndex = 0;

// Descrições dos projetos
const projectDescriptions = [
    "Este projeto visa combater a fome nas comunidades carentes, proporcionando refeições nutricionais e apoio a famílias em situação de vulnerabilidade social. Com a sua ajuda, podemos levar alimentos frescos e saudáveis a quem mais precisa, garantindo uma vida mais digna a muitas pessoas.",
    "A educação é a chave para a transformação social. Através deste projeto, buscamos levar material didático, apoio a escolas e bolsas de estudo para crianças e jovens em comunidades de baixa renda. Com sua contribuição, ajudamos a construir um futuro mais próspero e igualitário.",
    "Este projeto tem como objetivo levar atendimento médico e serviços de saúde essenciais para regiões carentes. Através de consultas, exames e programas de prevenção, buscamos melhorar a qualidade de vida de comunidades que carecem de cuidados médicos adequados. Sua doação fará a diferença na saúde de muitas pessoas."
];

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

    // Atualiza a descrição do projeto
    const currentSlide = slides[currentIndex];
    const description = projectDescriptions[currentIndex];

    const slideContent = currentSlide.querySelector('.slide-content');
    const descriptionElement = slideContent.querySelector('p');
    descriptionElement.textContent = description;

    // Adiciona um evento de clique no botão Doar
donateButtons.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = '../pages/doar.html';
    });
});

    const donateButton = slideContent.querySelector('.donate-button');
    donateButton.style.marginTop = '20px';
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
