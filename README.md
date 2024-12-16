# Documentação do Projeto DonateHub

## Visão Geral

O DonateHub é uma plataforma destinada a facilitar doações e parcerias com instituições de caridade. O projeto é composto por várias páginas que permitem aos usuários se cadastrar, fazer doações e gerenciar seu perfil.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
DonateHub/
│
├── index.html
├── pages/
│   ├── cadastro.html
│   ├── doacoes.html
│   ├── doar.html
│   ├── parcerias.html
│   ├── perfil.html
│   └── sobre.html
│
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── css/
│   │ 
│   │   └── pages/  
│   └── js/
│
└── src/css/
    ├── pages/
    └── global.css
```

## Descrição das Páginas

### 1. `index.html`

A página inicial do DonateHub, que apresenta uma visão geral da plataforma e links para as principais funcionalidades.

### 2. `pages/cadastro.html`

Página de cadastro onde os usuários podem criar uma conta. Inclui campos para informações pessoais e opções de contato.

### 3. `pages/doacoes.html`

Página dedicada a mostrar as opções de doação disponíveis. Os usuários podem visualizar diferentes causas e fazer doações diretamente.

### 4. `pages/doar.html`

Página onde os usuários podem realizar doações. Inclui um formulário para selecionar a quantia e a causa da doação.

### 5. `pages/parcerias.html`

Página que apresenta as parcerias do DonateHub com outras instituições e como os usuários podem se envolver.

### 6. `pages/perfil.html`

Página do perfil do usuário, onde eles podem visualizar e editar suas informações pessoais e histórico de doações.

### 7. `pages/sobre.html`

Página que fornece informações sobre a missão e visão do DonateHub, além de detalhes sobre a equipe.

## Estrutura de Diretórios

### `src/assets/`

Contém todos os ícones e imagens utilizados no projeto.

### `src/css/`

Contém os arquivos CSS organizados em componentes e páginas. Os estilos globais são definidos em `global.css`.

### `src/js/`

Contém os arquivos JavaScript que gerenciam a interatividade do site, incluindo scripts para o carrossel, doações, e manipulação do DOM.

## Detalhes dos Arquivos CSS e JavaScript

### CSS

- **`global.css`**: Estilos globais aplicados a todo o projeto.
- **`pages/*.css`**: Estilos específicos para cada página, permitindo personalização e modularidade.

### JavaScript

- **`carousel.js`**: Script para gerenciar o carrossel de imagens na página inicial.
- **`donation.js`**: Script que lida com a lógica de doações.
- **`perfil.js`**: Gerencia a funcionalidade da página de perfil do usuário.
- **`scriptDom.js`**: Manipulação do DOM para interatividade.
- **`user.js`**: Gerencia a autenticação e informações do usuário.
