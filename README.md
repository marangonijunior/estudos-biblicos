# 📖 Estudos Bíblicos

Uma coleção de estudos bíblicos interativos e reflexões sobre as Escrituras, desenvolvidos como apresentações HTML imersivas e acessíveis.

## 🎯 Objetivo

Este projeto combina tecnologia web moderna com conteúdo bíblico sólido para criar experiências de estudo únicas — não apenas leitura passiva, mas reflexão ativa sobre como as verdades das Escrituras se aplicam à nossa vida hoje.

## 📚 Estudos Disponíveis

### [E se fosse você?](estudos/e-se-fosse-voce.html)
**Personagens Bíblicos · 25 slides · 3 atos**

Nove momentos decisivos na vida de Moisés, Noé e Ló. A pergunta central: se você estivesse no lugar deles, com os mesmos medos e pressões, o que teria feito?

**Estrutura:**
- **Ato I — Moisés**: sarça ardente, Mar Vermelho, bezerro de ouro, terra prometida
- **Ato II — Noé**: o chamado impossível, décadas de obra, tropeço após a vitória  
- **Ato III — Ló**: fuga de Sodoma, isolamento na caverna

**Recursos:**
- Navegação por teclado (setas, espaço, Home/End)
- Suporte a touch/swipe no mobile
- Links compartilháveis com hash (#5 vai direto ao slide 5)
- Design responsivo com tipografia cuidadosa

## 🎨 Design System

O projeto usa um design system consistente baseado em:

### Tipografia
- **Display**: Fraunces (serifada, para títulos e citações)
- **Corpo**: Cormorant Garamond (serifada, legível, elegante)
- **Mono**: JetBrains Mono (para referências e metadados)

### Paleta de Cores
```css
--ink: #1a1512           /* Texto principal */
--parchment: #f4ecdc     /* Fundo claro */
--parchment-deep: #e8dcc0 /* Fundo alternativo */
--gold: #b8873d          /* Dourado principal */
--gold-light: #d4a962    /* Dourado claro */
--crimson: #7a2e2a       /* Vermelho para acentos */
--sea: #2d4a5c          /* Azul para variação */
```

### Componentes Reutilizáveis
- Sistema de slides com animações escalonadas
- Navegação consistente (dots + botões + teclado)
- Corner marks para contexto
- Grain texture overlay para atmosfera

## 🛠 Estrutura Técnica

```
/
├── index.html              # Menu principal
├── assets/
│   ├── css/base.css       # Design system compartilhado  
│   └── js/slides.js       # Navegação de slides
├── estudos/
│   └── e-se-fosse-voce.html
└── README.md
```

### Tecnologias
- **HTML5**: Semântica e acessibilidade
- **CSS3**: Grid, flexbox, animações, variáveis customizadas
- **JavaScript ES6+**: Classes, módulos, navegação
- **Progressive Enhancement**: Funciona sem JS (básico)

## 🚀 Como usar

1. **Navegação**: Use as setas ← → ou espaço para avançar/voltar
2. **Mobile**: Swipe left/right funciona naturalmente  
3. **Compartilhar**: A URL se atualiza conforme você navega (ex: `#12`)
4. **Pular**: Home/End levam ao primeiro/último slide

## 🔄 Roadmap

- [ ] **Bem-aventurados**: Estudo sobre o Sermão do Monte
- [ ] **Histórias que Transformam**: Parábolas de Jesus
- [ ] **Elas Mudaram a História**: Mulheres na Bíblia  
- [ ] **Orações Brutas**: Honestidade radical nos Salmos
- [ ] **Sabedoria Prática**: Provérbios para segunda-feira

## 📝 Licença

Conteúdo bíblico de domínio público. Código sob MIT License.

---

**"Toda Escritura é inspirada por Deus e útil para o ensino"** — 2 Timóteo 3:16

Desenvolvido por [@marangonijunior](https://github.com/marangonijunior)
