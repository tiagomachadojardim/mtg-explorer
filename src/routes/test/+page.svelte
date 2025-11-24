<script lang="ts">
  import { onMount } from 'svelte';
  
  let status = 'Loading...';
  let response: any = null;
  
  onMount(async () => {
    try {
      status = 'Fetching from API...';
      const res = await fetch('https://api.magicthegathering.io/v1/cards?page=1&pageSize=5');
      status = `Status: ${res.status} ${res.statusText}`;
      const data = await res.json();
      response = data;
      console.log('API Response:', data);
    } catch (err) {
      status = 'Error: ' + (err instanceof Error ? err.message : String(err));
      console.error('API Error:', err);
    }
  });
</script>

<h1>Teste da API MTG</h1>
<p>{status}</p>

{#if response}
  <h2>Resposta:</h2>
  <pre>{JSON.stringify(response, null, 2).substring(0, 2000)}</pre>
  
  {#if response.cards}
    <h3>Cartas ({response.cards.length}):</h3>
    <ul>
      {#each response.cards as card}
        <li>{card.name} - {card.set}</li>
      {/each}
    </ul>
  {/if}
{/if}

<style>
  pre {
    background: var(--color-surface);
    padding: 1rem;
    border-radius: var(--radius);
    overflow: auto;
    font-size: 0.85rem;
  }
  
  ul {
    list-style: disc;
    padding-left: 2rem;
  }
  
  li {
    margin: 0.5rem 0;
  }
</style>
