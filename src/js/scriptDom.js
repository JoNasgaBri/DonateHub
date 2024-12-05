import { User } from './user.js';

// Manipulação do formulário de cadastro
document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form');
    if (formCadastro) {
        formCadastro.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value;
            const email = document.getElementById('email').value;
            const cep = document.getElementById('cep').value;
            const cpf = document.getElementById('cpf').value;

            // Criar e salvar usuário
            const user = new User(nome, email, telefone, cep, cpf);
            user.save();

            // Redirecionar para a página de perfil com os dados
            window.location.href = `perfil.html?nome=${encodeURIComponent(nome)}&telefone=${encodeURIComponent(telefone)}&email=${encodeURIComponent(email)}&cep=${encodeURIComponent(cep)}&cpf=${encodeURIComponent(cpf)}`;
        });
    }

    // Função para lidar com o botão de cadastro na página inicial
    const clicado = () => {
        const cor = document.getElementById(`btn-cadastrar`);
        if (cor) {
            cor.addEventListener('click', () => {
                const corOriginal = cor.style.backgroundColor;
                const corTextoOriginal = cor.style.color;

                cor.style.backgroundColor = `#48f156`;
                cor.style.color = `black`;
                cor.style.transition = `.5s`;

                setTimeout(() => {
                    cor.style.backgroundColor = corOriginal;
                    cor.style.color = corTextoOriginal;
                    window.location.href = '../pages/cadastro.html';
                }, 500);
            });
        }
    }

    // Verifica se o usuário está logado e oculta o botão de cadastro
    // const user = User.load();
    // if (user) {
    //     const btnCadastrar = document.getElementById('btn-cadastrar');
    //     if (btnCadastrar) {
    //         btnCadastrar.style.display = 'none'; // Oculta o botão
    //     }
    // }

    clicado();
});
