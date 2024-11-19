const clicado = () =>{
    const cor = document.getElementById(`btn-cadastrar`);

    const corOriginal = azul.style.backgroundColor;
    const corTextoOriginal = azul.style.color;

    cor.style.backgroundColor = `#48f156`;
    cor.style.color = `black`;
    cor.style.transition = `.5s`;

    setTimeout(() => {
        cor.style.backgroundColor = corOriginal;
        cor.style.color = corTextoOriginal;
        cor.style.scale = 0.9;
    }, 200);
}