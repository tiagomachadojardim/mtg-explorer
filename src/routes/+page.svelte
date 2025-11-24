<script lang="ts">
	import { onMount } from 'svelte';
	import azorius from '$lib/assets/Azorius_Wallpaper_2560x1440.jpg';
	import dimir from '$lib/assets/Dimir_Wallpaper_2560x1440.jpg';
	import orzhov from '$lib/assets/Orzhov_Wallpaper_2560x1440.jpg';

	const backgrounds = [azorius, dimir, orzhov];
	let currentBg = 0;
	let nextBg = 1;
	let transitioning = false;

	onMount(() => {
		const interval = setInterval(() => {
			transitioning = true;
			nextBg = (currentBg + 1) % backgrounds.length;
			
			setTimeout(() => {
				currentBg = nextBg;
				transitioning = false;
			}, 1000);
		}, 6000);

		return () => clearInterval(interval);
	});

	function selectBg(index: number) {
		if (index !== currentBg && !transitioning) {
			transitioning = true;
			nextBg = index;
			setTimeout(() => {
				currentBg = index;
				transitioning = false;
			}, 1000);
		}
	}
</script>

<div class="hero-wrapper">
	<div class="bg-slider">
		<div class="bg" style="background-image: url({backgrounds[currentBg]});" class:active={!transitioning}></div>
		<div class="bg" style="background-image: url({backgrounds[nextBg]});" class:active={transitioning}></div>
		<div class="overlay"></div>
	</div>
	
	<div class="hero-content">
		<div class="logo-section">
			<div class="magic-circle">
				<span class="symbol">⬡</span>
			</div>
			<h1 class="glitch" data-text="MTG EXPLORER">MTG EXPLORER</h1>
		</div>
		
		<p class="subtitle animate-in">Mergulhe no universo de <strong>Magic: The Gathering</strong></p>
		<p class="description">Explore milhares de cartas, descubra estratégias e construa seus decks</p>
		
		<div class="cta-group">
			<a href="/cards" class="btn btn-primary">
				<span class="btn-icon">⚔️</span>
				<span>Explorar Cartas</span>
			</a>
			<a href="/cards?type=Creature" class="btn btn-secondary">
				<span>Criaturas</span>
			</a>
		</div>

		<div class="stats-grid">
			<div class="stat-card">
				<div class="stat-icon">🎴</div>
				<div class="stat-value">20.000+</div>
				<div class="stat-label">Cartas Únicas</div>
			</div>
			<div class="stat-card">
				<div class="stat-icon">📦</div>
				<div class="stat-value">500+</div>
				<div class="stat-label">Sets Disponíveis</div>
			</div>
			<div class="stat-card">
				<div class="stat-icon">⚡</div>
				<div class="stat-value">100%</div>
				<div class="stat-label">Atualizado</div>
			</div>
		</div>

		<div class="bg-controls">
			{#each backgrounds as _, i}
				<button 
					class="bg-dot" 
					class:active={currentBg === i}
					on:click={() => selectBg(i)}
					aria-label="Mudar plano de fundo {i + 1}"
				></button>
			{/each}
		</div>
	</div>
</div>

<style>
	.hero-wrapper {
		position: relative;
		min-height: calc(100vh - 64px);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		margin: -2rem -1rem;
	}

	.bg-slider {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		opacity: 0;
		transition: opacity 1s ease-in-out;
	}

	.bg.active {
		opacity: 1;
	}

	.overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.75));
		backdrop-filter: blur(2px);
	}

	.hero-content {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: 3rem 1rem;
		max-width: 900px;
		animation: fadeInUp 0.8s ease-out;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.logo-section {
		margin-bottom: 2rem;
	}

	.magic-circle {
		width: 80px;
		height: 80px;
		margin: 0 auto 1.5rem;
		border: 3px solid var(--color-accent);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 30px rgba(139, 92, 246, 0.5), inset 0 0 20px rgba(139, 92, 246, 0.2);
		animation: pulse 3s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(139, 92, 246, 0.5); }
		50% { transform: scale(1.05); box-shadow: 0 0 50px rgba(139, 92, 246, 0.8); }
	}

	.symbol {
		font-size: 2.5rem;
		color: var(--color-accent);
		filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.8));
	}

	h1.glitch {
		font-size: clamp(2.5rem, 8vw, 5rem);
		font-weight: 900;
		letter-spacing: 0.1em;
		margin: 0;
		background: linear-gradient(135deg, #fff, var(--color-accent), var(--color-primary));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 0 0 40px rgba(139, 92, 246, 0.5);
		position: relative;
	}

	.subtitle {
		font-size: 1.5rem;
		color: #fff;
		margin: 1.5rem 0 0.5rem;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
	}

	.subtitle strong {
		color: var(--color-accent);
		text-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
	}

	.description {
		font-size: 1.1rem;
		color: rgba(255, 255, 255, 0.8);
		margin-bottom: 3rem;
		text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
	}

	.cta-group {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 4rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2.5rem;
		border-radius: 50px;
		font-weight: 700;
		font-size: 1.1rem;
		transition: all 0.3s ease;
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border: 2px solid transparent;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
		color: white;
		box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
	}

	.btn-primary:hover {
		transform: translateY(-3px) scale(1.02);
		box-shadow: 0 15px 40px rgba(139, 92, 246, 0.6);
		text-decoration: none;
	}

	.btn-secondary {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		color: white;
		border-color: rgba(255, 255, 255, 0.3);
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-3px);
		border-color: var(--color-accent);
		text-decoration: none;
	}

	.btn-icon {
		font-size: 1.3rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
		margin: 3rem 0;
	}

	.stat-card {
		background: rgba(30, 41, 59, 0.6);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(139, 92, 246, 0.3);
		border-radius: var(--radius);
		padding: 2rem 1rem;
		transition: all 0.3s ease;
	}

	.stat-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 15px 40px rgba(139, 92, 246, 0.4);
		background: rgba(30, 41, 59, 0.8);
		border-color: var(--color-accent);
	}

	.stat-icon {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.stat-value {
		font-size: 2rem;
		font-weight: 900;
		color: var(--color-accent);
		text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
	}

	.stat-label {
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.9rem;
		margin-top: 0.25rem;
	}

	.bg-controls {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
		margin-top: 3rem;
	}

	.bg-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.3);
		border: 2px solid rgba(255, 255, 255, 0.5);
		cursor: pointer;
		transition: all 0.3s ease;
		padding: 0;
	}

	.bg-dot:hover {
		background: rgba(255, 255, 255, 0.6);
		transform: scale(1.2);
	}

	.bg-dot.active {
		background: var(--color-accent);
		border-color: var(--color-accent);
		box-shadow: 0 0 15px rgba(139, 92, 246, 0.8);
		transform: scale(1.3);
	}

	@media (max-width: 640px) {
		.hero-content {
			padding: 2rem 1rem;
		}

		.stats-grid {
			grid-template-columns: 1fr;
		}

		.cta-group {
			flex-direction: column;
			width: 100%;
		}

		.btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>

