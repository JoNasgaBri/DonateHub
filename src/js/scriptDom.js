import { User } from './user.js';

// Make menuShow available globally
window.menuShow = menuShow;

// Função corrigida para alternar a visibilidade do submenu
export function toggleMenu() {
    const subMenu = document.getElementById("subMenu");
    const usuarioCadastrado = localStorage.getItem('usuarioCadastrado') === 'true';
    
    if (usuarioCadastrado && subMenu) {
        subMenu.classList.toggle("open-menu");
    }
}

function loadUserData() {
    try {
        const savedUser = User.load();
        const usuarioCadastrado = localStorage.getItem('usuarioCadastrado');

        console.log('Dados do usuário carregados:', savedUser);
        console.log('Usuário cadastrado:', usuarioCadastrado);

        if (savedUser && usuarioCadastrado === 'true') {
            // Elementos para manipular
            const userPic = document.querySelector('.user-pic');
            const btnCadastrar = document.getElementById('btn-cadastrar');
            const btnCadastrarMobile = document.getElementById('btn-cadastrar-mobile');
            const userNameElement = document.querySelector('.sub-menu h2');

            // Atualiza ícone do usuário
            if (userPic) {
                userPic.style.display = 'block';
            }

            // Esconde botões de cadastro
            if (btnCadastrar) {
                btnCadastrar.style.display = 'none';
            }
            if (btnCadastrarMobile) {
                btnCadastrarMobile.style.display = 'none';
            }

            // Atualiza nome do usuário no submenu
            if (userNameElement) {
                userNameElement.textContent = savedUser.name || 'Usuário';
            }

            console.log('Dados do usuário carregados com sucesso');
        } else {
            console.log('Nenhum usuário cadastrado');
        }
    } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
    }
}



// Função para salvar o estado do usuário após o cadastro
function handleFormSubmit(event) {
    event.preventDefault();
    
    try {
        // Captura dados do formulário
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value;
        const cep = document.getElementById('cep').value;
        const cpf = document.getElementById('cpf').value;

        // Criar e salvar usuário
        const user = new User(nome, email, telefone, cep, cpf);
        user.save();

        // Marcar usuário como cadastrado
        localStorage.setItem('usuarioCadastrado', 'true');

        // Redirecionar para página de perfil
        window.location.href = `perfil.html?nome=${encodeURIComponent(nome)}&telefone=${encodeURIComponent(telefone)}&email=${encodeURIComponent(email)}&cep=${encodeURIComponent(cep)}&cpf=${encodeURIComponent(cpf)}`;
    } catch (error) {
        console.error('Erro no cadastro:', error);
        alert('Erro ao realizar cadastro. Tente novamente.');
    }
}
// Função atualizada para manipular os botões de cadastro
function handleCadastroButton() {
    const btnCadastrar = document.getElementById('btn-cadastrar');
    const btnCadastrarMobile = document.getElementById('btn-cadastrar-mobile');
    const buttons = [btnCadastrar, btnCadastrarMobile];

    buttons.forEach(btn => {
        if (!btn) return;

        // Definir cores originais explicitamente
        btn.style.backgroundColor = '#A0F1A7'; 
        btn.style.color = '#1C1C1C'; 

        btn.addEventListener('click', () => {
            // Salvar cores originais
            const corOriginal = '#A0F1A7';
            const corTextoOriginal = '#1C1C1C';

            // Aplicar novas cores
            btn.style.backgroundColor = '#48f156';
            btn.style.color = 'black';
            btn.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                btn.style.backgroundColor = corOriginal;
                btn.style.color = corTextoOriginal;
                window.location.href = './pages/cadastro.html';
            }, 500);
        });
    });
}


function checkUserState() {
    const btnCadastrar = document.getElementById('btn-cadastrar');
    const btnCadastrarMobile = document.getElementById('btn-cadastrar-mobile');
    const userPic = document.querySelector('.user-pic');
    const usuarioCadastrado = localStorage.getItem('usuarioCadastrado');

    if (usuarioCadastrado === 'true') {
        // Usuário cadastrado
        if (btnCadastrar) {
            btnCadastrar.style.display = 'none'; // Esconde botão de cadastro desktop
        }
        if (btnCadastrarMobile) {
            btnCadastrarMobile.style.display = 'none'; // Esconde botão de cadastro mobile
        }
        if (userPic) {
            userPic.style.display = 'block'; // Mostra ícone do usuário
        }
    } else {
        // Usuário não cadastrado
        if (btnCadastrar) {
            btnCadastrar.style.display = 'block'; // Mostra botão de cadastro desktop
        }
        if (btnCadastrarMobile) {
            btnCadastrarMobile.style.display = 'block'; // Mostra botão de cadastro mobile
        }
        if (userPic) {
            userPic.style.display = 'none'; // Esconde ícone do usuário
        }
    }
}

// Função para configurar os eventos do submenu
function setupSubmenuEvents() {
    const userPic = document.querySelector('.user-pic');
    const subMenu = document.getElementById('subMenu');
    const usuarioCadastrado = localStorage.getItem('usuarioCadastrado') === 'true';

    // Configurar visibilidade inicial do ícone do usuário
    if (userPic) {
        userPic.style.display = usuarioCadastrado ? 'block' : 'none';
        
        // Adicionar evento de clique no ícone do usuário
        userPic.addEventListener('click', () => {
            toggleMenu();
        });
    }

    // Configurar links do submenu usando IDs
    const editarPerfilLink = document.getElementById('editarPerfil');
    const sairLink = document.getElementById('sairLink');

    if (editarPerfilLink) {
        editarPerfilLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Determinar o caminho correto baseado na localização atual
            const path = window.location.pathname.includes('/pages/') ? './perfil.html' : './pages/perfil.html';
            window.location.href = path;
        });
    }

    if (sairLink) {
        sairLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Limpar dados do usuário
            localStorage.removeItem('userData');
            localStorage.removeItem('usuarioCadastrado');
            localStorage.removeItem('userActivities');
            
            // Determinar o caminho correto para a página inicial
            const homePath = window.location.pathname.includes('/pages/') ? '../index.html' : './index.html';
            
            // Redirecionar para a página inicial
            window.location.href = homePath;
        });
    }

    // Fechar submenu quando clicar fora dele
    document.addEventListener('click', (e) => {
        if (usuarioCadastrado && subMenu && userPic) {
            if (!subMenu.contains(e.target) && !userPic.contains(e.target)) {
                subMenu.classList.remove('open-menu');
            }
        }
    });
}















// Função para fechar o menu mobile
function closeMenuMobile() {
    const menuMobile = document.querySelector('.mobile-menu');
    menuMobile.classList.remove('open');
    document.querySelector('.icon').src = "../src/assets/icons/menu_white_36dp.svg";
}

function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        closeMenuMobile();
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "../src/assets/icons/close_white_36dp.svg";
    }
}

// Adiciona os event listeners do menu mobile na inicialização
function setupMobileMenu() {
    const menuMobile = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const mobileLinks = menuMobile.querySelectorAll('a, button');
    
    // Adiciona evento de clique no ícone do menu
    menuIcon.addEventListener('click', menuShow);
    
    // Adiciona evento de clique nos links do menu
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenuMobile);
    });

    // Adiciona evento para fechar o menu quando clicar fora
    document.addEventListener('click', (e) => {
        if (menuMobile.classList.contains('open') && 
            !menuMobile.contains(e.target) && 
            !menuIcon.contains(e.target)) {
            closeMenuMobile();
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    handleCadastroButton();
    setupSubmenuEvents();
    setupMobileMenu();
    loadUserData();
    checkUserState();
    
    // Setup do formulário de cadastro
    const formCadastro = document.getElementById('form');
    if (formCadastro) {
        formCadastro.addEventListener('submit', handleFormSubmit);
    }
});
