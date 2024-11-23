const clicado = () =>{
    const cor = document.getElementById(`btn-cadastrar`);

    cor.addEventListener('click', () => {
        // Redireciona para outra página
        window.location.href = './pages/cadastro.html';
    });

    const corOriginal = cor.style.backgroundColor;
    const corTextoOriginal = cor.style.color;

    cor.style.backgroundColor = `#48f156`;
    cor.style.color = `black`;
    cor.style.transition = `.5s`;

    setTimeout(() => {
        cor.style.backgroundColor = corOriginal;
        cor.style.color = corTextoOriginal;
        cor.style.scale = 0.9;
    }, 500);
}

const clicado2 = () =>{
    const cor = document.getElementById(`donate`);

    cor.addEventListener('click', () => {
        // Redireciona para outra página
        window.location.href = './pages/doar.html';
    });

    const corOriginal = cor.style.backgroundColor;
    const corTextoOriginal = cor.style.color;

    cor.style.backgroundColor = `#48f156`;
    cor.style.color = `black`;
    cor.style.transition = `.5s`;

    setTimeout(() => {
        cor.style.backgroundColor = corOriginal;
        cor.style.color = corTextoOriginal;
        cor.style.scale = 0.9;
    }, 500);
}

const clicado3 = () =>{
    const cor = document.getElementById(`saber-mais`);

    cor.addEventListener('click', () => {
        // Redireciona para outra página
        window.location.href = './pages/sobre.html';
    });

    const corOriginal = cor.style.backgroundColor;
    const corTextoOriginal = cor.style.color;

    cor.style.backgroundColor = `#5856D6`;
    cor.style.color = `white`;
    cor.style.transition = `.5s`;

    setTimeout(() => {
        cor.style.backgroundColor = corOriginal;
        cor.style.color = corTextoOriginal;
        cor.style.scale = 0.9;
    }, 500);
}