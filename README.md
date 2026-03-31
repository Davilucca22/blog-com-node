## Blog com Node (Frontend)

Front-end em React (Create React App) para um blog com postagens, curtidas, comentários e perfil de usuário. Consome um back-end separado via API REST.

### 🚀 Tecnologias
- React 19
- react-router-dom
- react-icons
- react-toastify
- CSS puro e arquivos por componente

### ⚙️ Scripts
- `npm install` - instala as dependências.
- `npm start` - inicializa o servidor de desenvolvimento (http://localhost:3000).
- `npm run build` - gera build de produção em `build/`.

### 🌐 Configuração de API
Por padrão o front usa `http://localhost:3000` como base para chamadas (ex.: `/feed?page=1`, `/session`, `/:id/curtida`).

Recomenda-se configurar a URL da API via variáveis de ambiente:
- Crie `.env` com `REACT_APP_API_URL=http://localhost:3000`.
- Use `process.env.REACT_APP_API_URL` nas chamadas `fetch`.

### 📁 Estrutura principal
- `public/` - arquivos estáticos.
- `src/` - aplicação React.
  - `index.js` - entrada.
  - `App.js`, `Routes.js` - roteamento.
  - `components/` - componentes reutilizáveis.
  - `pages/` - páginas do app.

Páginas já implementadas:
- `feed/` - feed de postagens.
- `buscaUser/` - busca de usuário.
- `editInfo/`, `editsenha/`, `userEdit/` - edição de dados.
- `login/`, `register/` - autenticação.
- `perfilOutro/`, `userPerfil/`, `mostraSeguidores/` - perfis e seguidores.
- `postarFT/` - post com foto.

### 🧩 Componentes importantes
- `components/infoUser` - exibe informações do usuário.
- `components/menu` - menu lateral.
- `components/feedDePosts` - listagem de posts.
- `components/modalPublico` - modal de post público.

### 🛠️ Como rodar
1. `npm install`
2. `npm start`
3. Abra `http://localhost:3000`

Se usar back-end local, execute o servidor da API antes.

### ✅ Melhorias sugeridas
- Extrair URL da API para `.env`.
- Centralizar chamadas fetch em `src/services/api.js`.
- Remover manipulação direta do DOM (`document.getElementById`) em favor de React state/props.
- Adicionar testes automatizados (Jest/React Testing Library).

### 🤝 Contribuição
1. Fork
2. branch `feature/nome`
3. PR com descrição das alterações

### 📬 Contato
- Abra uma issue para bugs/dúvidas/sugestões.

