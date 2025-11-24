# 🎴 MTG Explorer

<p align="center">
  <img src="https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="SvelteKit">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
</p>

Aplicação moderna e interativa para explorar cartas de **Magic: The Gathering** consumindo a [API pública oficial](https://docs.magicthegathering.io/).

## ✨ Funcionalidades

- 🔍 **Busca avançada** de cartas por nome, set e tipo
- 🎨 **Interface dark mode** com design moderno e gradientes
- 📱 **Totalmente responsivo** para desktop, tablet e mobile
- 🖼️ **Visualização 3D interativa** - clique em qualquer carta para rotacioná-la em perspectiva 3D
- ⚡ **Cache inteligente** com TTL de 60s para otimizar requisições
- 🎯 **Filtros em tempo real** com feedback visual
- 📄 **Paginação** para navegar entre milhares de cartas
- 🎭 **Dois modos de visualização**: grade e lista

## 🚀 Demo

https://github.com/tiagomachadojardim/mtg-explorer

## 🛠️ Stack Tecnológico

- **Framework**: SvelteKit 2.x
- **Build Tool**: Vite 7.x
- **Linguagem**: TypeScript (modo estrito)
- **Estilização**: Tailwind CSS 4.x + CSS Variables
- **API**: [Magic: The Gathering API v1](https://api.magicthegathering.io/v1)
- **Deploy**: Vercel / Netlify / Cloudflare Pages ready

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/tiagomachadojardim/mtg-explorer.git

# Entre no diretório
cd mtg-explorer

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🎯 Uso

### Buscar Cartas

1. Acesse a página "Explorar Cartas"
2. Use os filtros para buscar por:
   - **Nome**: Digite o nome da carta (ex: "Black Lotus")
   - **Set**: Selecione uma coleção específica
   - **Tipo**: Filtre por tipo (Creature, Instant, etc.)
3. Clique em "Aplicar" para atualizar os resultados

### Visualização 3D

- Clique em qualquer imagem de carta
- **Arraste com o mouse** para rotacionar em 3D
- Observe o verso gradiente ao rotacionar 180°
- Clique no **X** ou no fundo escuro para fechar

### Alternância de Visualização

Use os botões no canto superior direito para alternar entre:
- **⊞ Grade**: Cards em grid compacto
- **☰ Lista**: Cards em lista horizontal com detalhes

## 🏗️ Estrutura do Projeto

```
mtg-explorer/
├── src/
│   ├── lib/
│   │   ├── api/
│   │   │   ├── mtg.ts          # Cliente HTTP da API
│   │   │   └── types.ts        # Interfaces TypeScript
│   │   └── assets/             # Imagens e recursos
│   ├── routes/
│   │   ├── +page.svelte        # Home com slider interativo
│   │   ├── +layout.svelte      # Layout global
│   │   ├── layout.css          # Tema dark e variáveis CSS
│   │   └── cards/
│   │       ├── +page.svelte    # Página de exploração
│   │       └── +page.ts        # Load function SSR
│   └── app.html
├── static/                     # Assets estáticos
├── package.json
└── README.md
```

## 🔧 Configuração Avançada

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
PUBLIC_MTG_API_BASE=https://api.magicthegathering.io/v1
```

### Build para Produção

```bash
# Gerar build otimizada
npm run build

# Preview da build
npm run preview
```

### Deploy

#### Vercel
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Upload da pasta build/
```

## 🎨 Personalização

### Tema de Cores

Edite `src/routes/layout.css`:

```css
:root {
  --color-primary: #3b82f6;    /* Azul primário */
  --color-accent: #8b5cf6;     /* Roxo de destaque */
  --color-bg: #0a0a0f;         /* Fundo escuro */
}
```

### Cache TTL

Ajuste em `src/lib/api/mtg.ts`:

```typescript
const CACHE_TTL = 120000; // 2 minutos
```

## 📚 API Reference

### Cliente MTG

```typescript
import { getCards, getCard, getSets } from '$lib/api/mtg';

// Buscar cartas com filtros
const cards = await getCards(fetch, {
  page: 1,
  pageSize: 50,
  name: 'Dragon',
  set: 'M21',
  type: 'Creature'
});

// Buscar carta específica por ID
const card = await getCard(fetch, '12345');

// Listar todos os sets
const sets = await getSets(fetch);
```

### Tipos TypeScript

```typescript
interface Card {
  id: string;
  name: string;
  type: string;
  imageUrl?: string;
  text?: string;
  flavor?: string;
  power?: string;
  toughness?: string;
  rarity?: string;
  set?: string;
}
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📝 Roadmap

- [ ] Adicionar filtros de cores (WUBRG)
- [ ] Implementar filtro de raridade visual
- [ ] Cache persistente com IndexedDB
- [ ] Favoritos/Wishlist local
- [ ] Exportar deck em formato Arena/MTGO
- [ ] Dark/Light mode toggle
- [ ] Internacionalização (i18n)
- [ ] PWA support

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Tiago Jardim**

- GitHub: [@tiagomachadojardim](https://github.com/tiagomachadojardim)
- LinkedIn: [Tiago Jardim](https://linkedin.com/in/tiago-machado-jardim)
- Portfolio: [tiagojardim.dev](https://meu-portifolio-qtwy.onrender.com)

## 🙏 Agradecimentos

- [Magic: The Gathering API](https://docs.magicthegathering.io/) pela API pública
- [Wizards of the Coast](https://company.wizards.com/) pelos assets de Magic: The Gathering
- Comunidade SvelteKit pelo framework incrível

---

<p align="center">
  Feito com ❤️ e ⚡ por <a href="https://github.com/tiagomachadojardim">Tiago Jardim</a>
</p>
