<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>MTG Explorer</title>
</svelte:head>

<div class="app">
	<header>
		<nav>
			<a href="/" class="logo">🃏 MTG Explorer</a>
			<div class="nav-links">
				<a href="/cards">Cartas</a>
				<a href="https://docs.magicthegathering.io/" target="_blank" rel="noopener">API Docs</a>
			</div>
		</nav>
	</header>
	<main>
		{@render children()}
	</main>
	<footer>
		<p>Powered by <a href="https://magicthegathering.io" target="_blank">magicthegathering.io API</a></p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	header {
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
		padding: 0 1rem;
		box-shadow: var(--shadow);
	}

	nav {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 64px;
	}

	.logo {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-text);
		text-decoration: none;
	}

	.logo:hover {
		color: var(--color-accent);
		text-decoration: none;
	}

	.nav-links {
		display: flex;
		gap: 1.5rem;
	}

	.nav-links a {
		font-weight: 500;
		padding: 0.5rem 0;
	}

	main {
		flex: 1;
		max-width: 1400px;
		width: 100%;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	footer {
		background: var(--color-surface);
		border-top: 1px solid var(--color-border);
		padding: 1.5rem 1rem;
		text-align: center;
		color: var(--color-text-muted);
		font-size: 0.875rem;
	}

	@media (max-width: 640px) {
		nav {
			flex-direction: column;
			height: auto;
			padding: 1rem 0;
			gap: 0.75rem;
		}
	}
</style>
