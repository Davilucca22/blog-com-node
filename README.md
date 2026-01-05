## Blog com Node (Frontend)

Aplicação front-end em React para um blog simples que consome um back-end separado (API). O projeto foi inicializado com Create React App e organiza páginas e componentes em `src/`.

**Tecnologias:**
- React (v19)
- react-router-dom
- react-icons
- react-toastify

**Scripts principais:**
- `npm install`: instala dependências.
- `npm start`: inicia o servidor de desenvolvimento (padrão: http://localhost:3000).
- `npm run build`: gera a versão de produção.

**Observação:**
Por padrão o front-consome endpoints em `http://localhost:3000` como evidenciado no código (ex.: `/feed?page=1`, `/session`, `/:id/curtida`). Se o back-end estiver em outra porta/host, ajuste as URLs nas chamadas `fetch`.

**Estrutura principal do projeto**
- `public/` : arquivos estáticos (index.html, assets).
- `src/` : código-fonte React.
	- `index.js` : entrada da aplicação.
	- `App.js`, `Routes.js` : roteamento e configuração principal.
	- `components/menu/` : componente de menu (menu.js, menu.css).
	- `pages/` : páginas da aplicação:
		- `feed/` : página principal de feed de posts (`feed.js`, `feed.css`).
		- `home/` : página inicial (`index.js`, `style.css`).
		- `login/` : tela de login (`login.js`, `login.css`).
		- `postarFT/` : página para criar posts (`index.js`, `index.css`).
		- `register/` : registro de usuário (`index.js`, `Register.css`).
		- `userPerfil/` : perfil do usuário (`index.js`, `index.css`).

**Pontos importantes (baseado no código atual)**
- `src/pages/feed/feed.js`:
	- Busca posts com `fetch("http://localhost:3000/feed?page=1")` e dados de sessão em `http://localhost:3000/session`.
	- Implementa curtidas com `PUT` para `http://localhost:3000/:id/curtida`.
	- Usa estados para armazenar `nome`, `foto`, `dados` (posts), e controlar modais/comentários.
	- Usa `react-icons` para ícones (FiMenu, IoArrowBackOutline, IoIosHeart, FaRegComment, AiOutlineCheck).

**Como rodar (desenvolvimento)**
1. Instale as dependências:

```
npm install
```

2. Inicie a aplicação:

```
npm start
```

Abra http://localhost:3000 no navegador.

Se você tiver um back-end separado, inicie-o também e ajuste as rotas no front-end se necessário.

**Boas práticas e próximos passos sugeridos**
- Mover a URL base da API para uma variável de ambiente (`.env`) em vez de hardcode.
- Substituir `document.getElementById` por manipulação via estado/props do React para evitar mutações diretas do DOM.
- Centralizar chamadas HTTP em um utilitário (ex.: `src/services/api.js`) para facilitar manutenção.

**Contribuição**
- Faça um fork, crie uma branch com sua feature (`feature/nome`), e abra um Pull Request.

**Contato**
- Abra uma issue neste repositório para dúvidas, bugs ou sugestões.
