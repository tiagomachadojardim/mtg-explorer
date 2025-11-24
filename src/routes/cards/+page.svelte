<script lang="ts">
  export let data: {
    cards: import('$lib/api/types').Card[];
    page: number;
    filters: { name?: string; set?: string; type?: string };
    sets: import('$lib/api/types').Set[];
    error: string | null;
  };

  let name = data.filters.name ?? '';
  let set = data.filters.set ?? '';
  let type = data.filters.type ?? '';
  let viewMode: 'grid' | 'list' = 'grid';
  let selectedCard: string | null = null;
  let rotateX = 0;
  let rotateY = 0;
  let isDragging = false;

  function submit(e: Event) {
    e.preventDefault();
    const usp = new URLSearchParams();
    if (name) usp.set('name', name);
    if (set) usp.set('set', set);
    if (type) usp.set('type', type);
    usp.set('page', '1');
    const q = usp.toString();
    window.location.search = q;
  }

  function gotoPage(p: number) {
    const usp = new URLSearchParams(window.location.search);
    usp.set('page', String(p));
    window.location.search = usp.toString();
  }

  function openCard3D(imageUrl: string) {
    selectedCard = imageUrl;
    rotateX = 0;
    rotateY = 0;
  }

  function closeCard3D() {
    selectedCard = null;
    isDragging = false;
  }

  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    e.preventDefault();
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    rotateY += e.movementX * 0.5;
    rotateX -= e.movementY * 0.5;
    rotateX = Math.max(-60, Math.min(60, rotateX));
  }

  function handleMouseUp() {
    isDragging = false;
  }
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div class="page-header">
  <div>
    <h1>🎴 Explorar Cartas</h1>
    <p class="page-subtitle">{data.cards?.length ?? 0} cartas encontradas • Página {data.page}</p>
  </div>
  <div class="view-controls">
    <button 
      class="view-btn" 
      class:active={viewMode === 'grid'}
      on:click={() => viewMode = 'grid'}
      title="Visualização em grade"
    >⊞</button>
    <button 
      class="view-btn" 
      class:active={viewMode === 'list'}
      on:click={() => viewMode = 'list'}
      title="Visualização em lista"
    >☰</button>
  </div>
</div>

{#if data.error}
  <div class="error">
    <strong>⚠️ Erro:</strong> {data.error}
  </div>
{/if}

<form on:submit={submit} class="filters">
  <fieldset>
    <legend>Filtros</legend>
    <label>
      Nome
      <input bind:value={name} placeholder="Ex: Black Lotus" />
    </label>
    <label>
      Set
      <select bind:value={set}>
        <option value="">-- qualquer --</option>
        {#each data.sets as s}
          <option value={s.code}>{s.code} - {s.name}</option>
        {/each}
      </select>
    </label>
    <label>
      Tipo
      <input bind:value={type} placeholder="Ex: Creature" />
    </label>
    <button type="submit">Aplicar</button>
  </fieldset>
</form>

{#if data.cards.length === 0}
  <div class="empty-state">
    <div class="empty-icon">🔍</div>
    <p>Nenhuma carta encontrada.</p>
    <small>Tente ajustar os filtros de busca</small>
  </div>
{:else}
  <ul class="cards" class:list-view={viewMode === 'list'}>
    {#each data.cards as card}
      <li class="card" class:list-item={viewMode === 'list'}>
        <div class="card-image" on:click={() => openCard3D(card.imageUrl)} role="button" tabindex="0">
          <img src={card.imageUrl} alt={card.name} loading="lazy" />
        </div>
        <div class="card-content">
          <div class="header">
            <strong class="card-name">{card.name}</strong>
            <div class="badges">
              {#if card.rarity}
                <span class="rarity-badge" class:mythic={card.rarity === 'Mythic Rare'} class:rare={card.rarity === 'Rare'}>
                  {card.rarity}
                </span>
              {/if}
              {#if card.set}<span class="set">{card.set}</span>{/if}
            </div>
          </div>
          <div class="details">
            {#if card.type}
              <div class="card-type">{card.type}</div>
            {/if}
            {#if card.power && card.toughness}
              <div class="power-toughness">⚔️ {card.power}/{card.toughness}</div>
            {/if}
            {#if card.text}
              <p class="card-text">{@html card.text.replace(/\n/g,'<br/>')}</p>
            {/if}
            {#if card.flavor}
              <p class="flavor-text"><em>{card.flavor}</em></p>
            {/if}
          </div>
        </div>
      </li>
    {/each}
  </ul>
  <nav class="pagination">
    <button on:click={() => gotoPage(Math.max(1, data.page - 1))} disabled={data.page <= 1}>
      ← Anterior
    </button>
    <span class="page-info">Página <strong>{data.page}</strong></span>
    <button on:click={() => gotoPage(data.page + 1)}>
      Próxima →
    </button>
  </nav>
{/if}

{#if selectedCard}
  <div class="modal-3d" on:click={closeCard3D}>
    <div class="modal-content" on:click|stopPropagation>
      <button class="close-btn" on:click={closeCard3D}>✕</button>
      <div 
        class="card-3d-container"
        on:mousedown={handleMouseDown}
        style="transform: perspective(1000px) rotateX({rotateX}deg) rotateY({rotateY}deg);"
      >
        <img src={selectedCard} alt="Card 3D" class="card-3d" />
      </div>
      <p class="instruction">🖱️ Arraste para rotacionar a carta</p>
    </div>
  </div>
{/if}

<style>
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  h1 { 
    font-size: 2.5rem; 
    margin: 0;
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .page-subtitle {
    color: var(--color-text-muted);
    font-size: 0.95rem;
    margin-top: 0.25rem;
  }

  .view-controls {
    display: flex;
    gap: 0.5rem;
    background: var(--color-surface);
    padding: 0.25rem;
    border-radius: calc(var(--radius) / 1.5);
  }

  .view-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    color: var(--color-text-muted);
    cursor: pointer;
    border-radius: calc(var(--radius) / 2);
    font-size: 1.25rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .view-btn:hover {
    background: var(--color-bg);
    color: var(--color-text);
  }

  .view-btn.active {
    background: var(--color-accent);
    color: white;
  }
  
  .error {
    background: linear-gradient(135deg, #dc2626, #b91c1c);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--radius);
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow);
  }
  
  .error strong {
    display: block;
    margin-bottom: 0.25rem;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--color-text-muted);
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .empty-state p {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--color-text);
  }
  
  form.filters { 
    margin-bottom: 2rem; 
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  
  fieldset { 
    border: none;
    padding: 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    align-items: end;
  }
  
  legend {
    padding: 1rem 1.5rem;
    font-weight: 600;
    font-size: 1.1rem;
    background: var(--color-bg);
    width: 100%;
    margin: 0 -1.5rem 1rem;
  }
  
  label { 
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-muted);
  }
  
  input, select { 
    padding: 0.625rem 0.75rem;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: calc(var(--radius) / 1.5);
    color: var(--color-text);
    font-size: 0.95rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  input:focus, select:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  button { 
    padding: 0.625rem 1.25rem;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: calc(var(--radius) / 1.5);
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  
  button:hover:not(:disabled) {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
  }
  
  button:active:not(:disabled) {
    transform: translateY(0);
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  ul.cards { 
    list-style: none;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(520px, 1fr));
    margin: 0;
    padding: 0;
  }

  ul.cards.list-view {
    grid-template-columns: 1fr;
  }
  
  .card { 
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    overflow: hidden;
    display: flex;
    flex-direction: row;
    transition: all 0.3s ease;
    position: relative;
    height: 340px;
  }

  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 40px rgba(139, 92, 246, 0.3);
    border-color: var(--color-accent);
  }

  .card-image {
    position: relative;
    width: 240px;
    flex-shrink: 0;
    background: var(--color-bg);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .card-image:hover {
    transform: scale(1.05);
  }
  
  .card-image img { 
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .card-content {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: var(--color-accent) var(--color-bg);
    min-width: 0;
    word-break: break-word;
  }

  .card-content::-webkit-scrollbar {
    width: 6px;
  }

  .card-content::-webkit-scrollbar-track {
    background: var(--color-bg);
  }

  .card-content::-webkit-scrollbar-thumb {
    background: var(--color-accent);
    border-radius: 3px;
  }
  
  .header { 
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-border);
    min-height: 0;
  }

  .badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    align-items: center;
  }
  
  .card-name {
    font-size: 1.05rem;
    color: var(--color-text);
    line-height: 1.3;
    flex: 1;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    min-width: 0;
  }
  
  .set { 
    font-size: 0.7rem;
    background: var(--color-accent);
    color: white;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .rarity-badge {
    font-size: 0.7rem;
    background: rgba(30, 41, 59, 0.9);
    backdrop-filter: blur(5px);
    color: white;
    padding: 0.3rem 0.7rem;
    border-radius: 20px;
    font-weight: 600;
    text-transform: uppercase;
    border: 1px solid rgba(255, 255, 255, 0.2);
    flex-shrink: 0;
    white-space: nowrap;
  }

  .rarity-badge.rare {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    border-color: #fbbf24;
    box-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
  }

  .rarity-badge.mythic {
    background: linear-gradient(135deg, #f97316, #dc2626);
    border-color: #f97316;
    box-shadow: 0 0 10px rgba(249, 115, 22, 0.3);
  }
  
  .details { 
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-width: 0;
    overflow: hidden;
  }

  .mana-cost {
    background: var(--color-bg);
    padding: 0.4rem 0.75rem;
    border-radius: calc(var(--radius) / 2);
    font-family: 'Courier New', monospace;
    font-size: 0.95rem;
    color: var(--color-accent);
    font-weight: 700;
    border: 1px solid var(--color-border);
    display: inline-block;
    align-self: flex-start;
  }

  .card-type {
    color: var(--color-text);
    font-weight: 600;
    font-size: 0.85rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.4;
  }

  .power-toughness {
    background: var(--color-bg);
    padding: 0.3rem 0.75rem;
    border-radius: calc(var(--radius) / 2);
    font-weight: 700;
    color: var(--color-primary);
    display: inline-block;
    align-self: flex-start;
    white-space: nowrap;
  }
  
  .card-text { 
    font-size: 0.82rem;
    line-height: 1.5;
    color: var(--color-text-muted);
    background: rgba(15, 23, 42, 0.4);
    padding: 0.75rem;
    border-radius: calc(var(--radius) / 2);
    border-left: 3px solid var(--color-accent);
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .flavor-text {
    font-size: 0.78rem;
    color: var(--color-text-muted);
    opacity: 0.8;
    font-style: italic;
    padding-left: 0.5rem;
    border-left: 2px solid var(--color-border);
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.4;
  }

  .artist {
    color: var(--color-text-muted);
    font-size: 0.75rem;
    opacity: 0.7;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  .pagination { 
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: var(--color-surface);
    border-radius: var(--radius);
    border: 1px solid var(--color-border);
  }
  
  .pagination span {
    font-weight: 600;
    color: var(--color-text);
  }
  
  p {
    text-align: center;
    color: var(--color-text-muted);
    font-size: 1.1rem;
    padding: 3rem 1rem;
  }

  @media (max-width: 768px) {
    ul.cards {
      grid-template-columns: 1fr;
    }

    .card {
      flex-direction: column;
      height: auto;
      max-height: none;
    }

    .card-image {
      width: 100%;
      height: 400px;
    }

    .card-image img {
      object-fit: contain;
    }

    .card-content {
      max-height: none;
      overflow-y: visible;
    }

    .page-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  /* Modal 3D */
  .modal-3d {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(10px);
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .close-btn {
    position: absolute;
    top: -3rem;
    right: -1rem;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    font-size: 24px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }

  .card-3d-container {
    width: 500px;
    height: 700px;
    cursor: grab;
    user-select: none;
    transition: transform 0.1s linear;
    transform-style: preserve-3d;
    position: relative;
  }

  .card-3d-container:active {
    cursor: grabbing;
  }

  .card-3d-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    border-radius: 20px;
    transform: translateZ(-2px);
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
  }

  .card-3d {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 20px;
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.5),
      0 0 100px rgba(139, 92, 246, 0.3);
    filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.5));
    position: relative;
    z-index: 1;
    backface-visibility: hidden;
  }

  .instruction {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    text-align: center;
    margin: 0;
  }

  @media (max-width: 768px) {
    .card-3d-container {
      width: 90vw;
      height: calc(90vw * 1.4);
      max-width: 400px;
      max-height: 560px;
    }

    .close-btn {
      top: -2.5rem;
      right: 0;
    }
  }
</style>
