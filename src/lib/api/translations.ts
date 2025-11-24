// Sistema de tradução completo para MTG
const translationMap: Record<string, string> = {
  // === NOMES DE CARTAS ===
  "Ancestor's Chosen": 'Escolhido do Ancestral',
  'Angel of Mercy': 'Anjo da Misericórdia',
  'Angelic Blessing': 'Bênção Angélica',
  'Angelic Wall': 'Muralha Angélica',
  'Aura of Silence': 'Aura de Silêncio',
  
  // === TIPOS ===
  'Creature': 'Criatura',
  'Instant': 'Mágica Instantânea',
  'Sorcery': 'Feitiço',
  'Enchantment': 'Encantamento',
  'Artifact': 'Artefato',
  'Planeswalker': 'Planeswalker',
  'Land': 'Terreno',
  'Tribal': 'Tribal',
  'Legendary': 'Lendário',
  'Basic': 'Básico',
  'Wall': 'Muralha',
  
  // === SUBTIPOS ===
  'Angel': 'Anjo', 'Human': 'Humano', 'Cleric': 'Clérigo', 'Warrior': 'Guerreiro',
  'Wizard': 'Mago', 'Knight': 'Cavaleiro', 'Soldier': 'Soldado', 'Elf': 'Elfo',
  'Goblin': 'Goblin', 'Dragon': 'Dragão', 'Demon': 'Demônio', 'Beast': 'Besta',
  'Bird': 'Pássaro', 'Zombie': 'Zumbi', 'Vampire': 'Vampiro', 'Spirit': 'Espírito',
  'Elemental': 'Elemental', 'Giant': 'Gigante', 'Dwarf': 'Anão', 'Merfolk': 'Tritão',
  
  // === RARIDADES ===
  'Common': 'Comum', 'Uncommon': 'Incomum', 'Rare': 'Rara', 
  'Mythic': 'Mítica', 'Mythic Rare': 'Mítica Rara',
  
  // === HABILIDADES ===
  'Flying': 'Voar', 'flying': 'voar',
  'First strike': 'Iniciativa', 'first strike': 'iniciativa',
  'Double strike': 'Iniciativa dupla',
  'Deathtouch': 'Toque mortífero',
  'Haste': 'Ímpeto',
  'Hexproof': 'Resistência a magia',
  'Defender': 'Defensor',
  'Vigilance': 'Vigilância',
  'Trample': 'Atropelar',
  'Lifelink': 'Vínculo com a vida',
  'Reach': 'Alcance', 'reach': 'alcance',
  'Menace': 'Ameaçar',
  'Indestructible': 'Indestrutível',
  
  // === FRASES COMPLETAS ===
  "This creature can't attack.": 'Esta criatura não pode atacar.',
  "This creature can't be blocked except by creatures with flying or reach.": 'Esta criatura não pode ser bloqueada exceto por criaturas com voar ou alcance.',
  "This creature can't attack, and it can block creatures with flying.": 'Esta criatura não pode atacar, e ela pode bloquear criaturas com voar.',
  "Not all silences are easily broken.": 'Nem todos os silêncios são facilmente quebrados.',
  "Every tear shed is a drop of immortality.": 'Cada lágrima derramada é uma gota de imortalidade.',
  '"The Ancestor protects us in ways we can\'t begin to comprehend."': '"O Ancestral nos protege de formas que não podemos começar a compreender."',
  
  // === TERMOS DE JOGO ===
  'enters the battlefield under your control': 'entra no campo de batalha sob seu controle',
  'enters the battlefield': 'entra no campo de batalha',
  'leaves the battlefield': 'deixa o campo de batalha',
  'the battlefield': 'o campo de batalha',
  'battlefield': 'campo de batalha',
  'under your control': 'sob seu controle',
  'in your graveyard': 'em seu cemitério',
  'graveyard': 'cemitério',
  'from your hand': 'da sua mão',
  'in your hand': 'em sua mão',
  'to your hand': 'para sua mão',
  'library': 'grimório',
  
  // === AÇÕES ===
  'Whenever': 'Toda vez que', 'whenever': 'toda vez que',
  'When': 'Quando', 'when': 'quando',
  'you gain': 'você ganha', 'you control': 'você controla',
  'you may': 'você pode', 'you': 'você',
  'deals combat damage': 'causa dano de combate',
  'deals damage': 'causa dano',
  'combat damage': 'dano de combate',
  'draw a card': 'compra um card', 'draw': 'compra',
  'equal to its': 'igual a sua', 'equal to': 'igual a',
  'comes into play': 'entra em jogo',
  
  // === PALAVRAS COMUNS ===
  'target creature': 'criatura alvo',
  'target player': 'jogador alvo',
  'target artifact': 'artefato alvo',
  'target enchantment': 'encantamento alvo',
  'creature': 'criatura', 'creatures': 'criaturas',
  'player': 'jogador', 'opponent': 'oponente',
  'opponents': 'oponentes',
  'artifact': 'artefato', 'enchantment': 'encantamento',
  'spell': 'mágica', 'spells': 'mágicas',
  'card': 'card', 'cards': 'cards',
  'permanent': 'permanente',
  
  // === ATRIBUTOS ===
  'power': 'poder', 'toughness': 'resistência',
  'life': 'vida', 'damage': 'dano',
  'control': 'controle', 'hand': 'mão',
  
  // === CONECTORES ===
  'and it can': 'e ela pode',
  'and': 'e', 'or': 'ou', 'with': 'com', 'without': 'sem',
  'for each': 'para cada', 'each': 'cada',
  'your': 'seu', 'sua': 'sua', 'its': 'sua', 'their': 'deles',
  'this': 'esta', 'This': 'Esta',
  'that': 'aquela', 'all': 'todas',
  'other': 'outro', 'another': 'outro',
  'target': 'alvo',
  'more to': 'a mais para',
  'more': 'mais', 'cost': 'custo',
  'play': 'jogar', 'cast': 'conjurar',
  'Destroy': 'Destrua', 'destroy': 'destrua',
  'Sacrifice': 'Sacrifique', 'sacrifice': 'sacrifique',
  
  // === AÇÕES ESPECÍFICAS ===
  "can't attack": 'não pode atacar',
  "can't be blocked": 'não pode ser bloqueada',
  "can't begin to comprehend": 'não podemos começar a compreender',
  'block': 'bloquear',
  'attack': 'atacar',
  'gain': 'ganha',
  'move to': 'mover para',
  'are easily broken': 'são facilmente quebrados',
  'protects us in ways we': 'nos protege de formas que',
  'shed is a drop of immortality': 'derramada é uma gota de imortalidade',
};

// Função que traduz texto completo de forma inteligente
function smartTranslate(text: string): string {
  if (!text) return '';
  
  let result = text;
  
  // Ordenar por tamanho decrescente para substituir frases completas primeiro
  const sortedEntries = Object.entries(translationMap)
    .sort((a, b) => b[0].length - a[0].length);
  
  sortedEntries.forEach(([english, portuguese]) => {
    // Usar regex com flags case-insensitive quando apropriado
    const isLowerCase = english === english.toLowerCase();
    const flags = isLowerCase ? 'gi' : 'g';
    const escaped = english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, flags);
    result = result.replace(regex, portuguese);
  });
  
  return result;
}

export function translateCardName(name: string): string {
  return smartTranslate(name);
}

export function translateType(type: string): string {
  return smartTranslate(type);
}

export function translateRarity(rarity: string): string {
  return translationMap[rarity] || smartTranslate(rarity);
}

export function translateText(text: string): string {
  return smartTranslate(text);
}
