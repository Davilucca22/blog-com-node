## Blog com Node (Frontend)

Front-end em React (Create React App) para um blog social com autenticação, postagens, curtidas, comentários, perfil de usuário e sistema de seguidores. Consome um back-end separado via API REST.

### 🚀 Tecnologias
- React 19
- react-router-dom (v7.9.5)
- react-icons (v5.5.0)
- react-toastify (v11.0.5)
- CSS puro e arquivos por componente
- Context API para gerenciamento de estado

### ✨ Funcionalidades Principais

#### 🔐 Autenticação
- **Login** - autenticação com email/usuário e senha
- **Registro** - criação de nova conta de usuário
- **Sessão** - mantém usuário autenticado
- **Logout** - sair da conta

#### 📝 Postagens
- **Criar postagem** - postar com foto/imagem
- **Ver feed** - listagem de posts dos usuários seguidos e públicos
- **Curtir posts** - adicionar/remover curtida em posts
- **Comentar** - adicionar comentários em posts
- **Deletar posts** - remover posts próprios
- **Editar posts** - editar conteúdo de posts criados

#### 👥 Perfil de Usuário
- **Perfil próprio** - visualizar e gerenciar informações pessoais
- **Perfil de outros usuários** - visualizar perfil público de outros usuários
- **Editar perfil** - atualizar foto de perfil, bio e informações
- **Editar senha** - alterar senha de acesso
- **Foto de perfil** - adicionar/atualizar foto de perfil

#### 🔗 Sistema de Seguidores
- **Seguir usuários** - adicionar usuários para seguir
- **Deixar de seguir** - remover seguidores
- **Ver seguidores** - listar usuários que seguem
- **Ver seguindo** - listar usuários que o usuário segue

#### 🔍 Busca
- **Buscar usuários** - procurar por outros usuários no sistema
- **Navegar para perfil** - acessar perfil de usuários encontrados

#### 🌙 Extras
- **Dark theme** - modo escuro da interface
- **Menu lateral** - navegação entre páginas
- **Notificações** - sistema de toast para feedback do usuário

### ⚙️ Scripts
- `npm install` - instala as dependências.
- `npm start` - inicializa o servidor de desenvolvimento (http://localhost:3000).
- `npm run build` - gera build de produção em `build/`.
- `npm test` - executa testes automatizados.

### 🌐 Configuração de API
Por padrão o front usa `http://localhost:3000` como base para chamadas (ex.: `/feed?page=1`, `/session`, `/:id/curtida`).

Recomenda-se configurar a URL da API via variáveis de ambiente:
- Crie `.env` com `REACT_APP_API_URL=http://localhost:3000`.
- Use `process.env.REACT_APP_API_URL` nas chamadas `fetch`.

### 📁 Estrutura principal
```
src/
├── index.js                 - entrada da aplicação
├── App.js                   - componente raiz com providers
├── Routes.js                - definição de rotas
├── APIs/                    - chamadas fetch para backend
│   ├── auth.js
│   ├── fetchAttDados.js     - atualizar dados
│   ├── fetchBusca.js        - buscar usuários
│   ├── fetchComentario.js   - comentários
│   ├── fetchCurtir.js       - curtidas
│   ├── fetchDeixaSeguir.js  - deixar de seguir
│   ├── fetchDeleta.js       - deletar posts
│   ├── fetchEdit.js         - editar posts
│   ├── fetchEditaInfo.js    - editar informações
│   ├── fetchFeed.js         - feed de posts
│   ├── fetchFeedUser.js     - feed de usuário específico
│   ├── fetchlogin.js        - login
│   ├── fetchPerfilOutro.js  - perfil de outro usuário
│   ├── fetchPostar.js       - criar post
│   ├── fetchRegister.js     - registrar novo usuário
│   ├── fetchSeguir.js       - seguir usuário
│   ├── fetchSenha.js        - alterar senha
│   └── fetchSessao.js       - dados da sessão
├── components/              - componentes reutilizáveis
│   ├── feedDePosts/         - listagem e exibição de posts
│   ├── DeletaPost/          - modal de confirmação de deleção
│   ├── infoUser/            - exibição de informações do usuário
│   ├── menu/                - menu de navegação lateral
│   ├── modalPublico/        - modal genérico
│   └── loading/             - loader
├── Hooks/                   - custom hooks com lógica reutilizável
│   ├── useAttDados.js       - atualizar dados
│   ├── useBusca.js          - buscar usuários
│   ├── useComentario.js     - gerenciar comentários
│   ├── useCurtir.js         - gerenciar curtidas
│   ├── useDeixaSeguir.js    - deixar de seguir
│   ├── useDeleta.js         - deletar posts
│   ├── useEdit.js           - editar posts
│   ├── useEditInfo.js       - editar informações
│   ├── useFeed.js           - carregar feed
│   ├── useFeedUser.js       - carregar feed de usuário
│   ├── useLogin.js          - login
│   ├── usePerfilOutro.js    - dados de outro perfil
│   ├── usePostar.js         - criar post
│   ├── useRegister.js       - registrar novo usuário
│   ├── useSeguir.js         - seguir usuário
│   ├── useSenha.js          - alterar senha
│   └── useSessao.js         - dados da sessão
├── context/
│   └── FeedContext.js       - Context API para estado global
└── pages/                   - páginas da aplicação
    ├── login/               - página de login
    ├── register/            - página de registro
    ├── feed/                - feed principal
    ├── postarFT/            - criar post com foto
    ├── userPerfil/          - perfil do usuário logado
    ├── editInfo/            - editar informações do perfil
    ├── editsenha/           - editar senha
    ├── userEdit/            - página de edição de perfil
    ├── perfilOutro/         - perfil de outro usuário
    └── buscaUser/           - busca de usuários
```

### 📍 Rotas da Aplicação
- `/` - página de login
- `/register` - página de registro
- `/feed` - feed principal de postagens
- `/Perfil/:id` - perfil do usuário autenticado
- `/postar` - criar nova postagem
- `/editperfil` - editar perfil
- `/editainfo` - editar informações pessoais
- `/editsenha` - alterar senha
- `/details/:id` - visualizar perfil de outro usuário
- `/busca` - buscar usuários

### 🧩 Componentes principais
- **`feedDePosts`** - exibe lista de posts com opções de curtir, comentar e deletar
- **`menu`** - menu de navegação lateral com links para páginas principais
- **`infoUser`** - exibe informações e foto do usuário
- **`modalPublico`** - modal genérico para confirmações e diálogos
- **`DeletaPost`** - confirmação antes de deletar um post
- **`loading`** - indicador de carregamento

### 🛠️ Como rodar
1. Clone o repositório
   ```bash
   git clone https://github.com/seu-usuario/blog-com-node.git
   cd blog-com-node
   ```

2. Instale as dependências
   ```bash
   npm install
   ```

3. Crie arquivo `.env` (opcional, para configurar API customizada)
   ```
   REACT_APP_API_URL=http://localhost:3000
   ```

4. Inicie o servidor de desenvolvimento
   ```bash
   npm start
   ```

5. Abra `http://localhost:3000` no navegador

**Nota:** O back-end deve estar rodando na mesma porta configurada em `.env` para que as requisições funcionem corretamente.

### 📦 Build de Produção
```bash
npm run build
```
Gera uma pasta `build/` otimizada pronta para deploy (Vercel, Netlify, etc).

### ✅ Melhorias sugeridas
- Extrair URL da API para `.env` (como sugerido no `.env.example`)
- Centralizar chamadas fetch em um serviço único (`src/services/api.js`)
- Remover manipulação direta do DOM (`document.getElementById`) em favor de React state/refs
- Adicionar validação de entrada nos formulários
- Implementar tratamento de erros mais robusto
- Adicionar testes automatizados (Jest/React Testing Library)
- Otimizar re-renders com useMemo e useCallback
- Melhorar acessibilidade (ARIA labels, contraste de cores)
- Adicionar paginação no feed e resultados de busca

### 🤝 Contribuição
1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nome`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nome`)
5. Abra um Pull Request com descrição detalhada das alterações

### 📬 Contato
- Abra uma **issue** para bugs, dúvidas ou sugestões
- Entre em contato via email ou mensagem direct
- Davilucarios47@gmail.com
