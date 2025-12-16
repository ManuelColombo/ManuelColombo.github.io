---
title: "Blog"
layout: base.njk
permalink: "/blog/"
---
# My Ideas

Here I share thoughts and reflections on design, UX research, and unrelated topics. My aim is to foster discussion and exchange ideas with fellow professionals and enthusiasts.
I'm curious about everything so expect a variety of topics! 

{% for item in collections.blog | reverse %}
  {% set item = item %}{% include "card.njk" %}
{% endfor %} 

- Scrivere qualcosa dal titolo "Gli utenti non partono dalla Home" perché se lavoriamo bene di seo vengono mandati già alla pagina giusta. La metafora del negozio fisico forse non funziona più. 
- Zorro e batman eroi ricchi che si fanno giustizia da soli. Uno contro un potere criminale, l'altro contro i criminali che il potere non riesce a fermare.
- Scrivere un articolo su come ho iniziato a struttrare la mia libreria di note per rendere Foam qualcosa di utile e non solo un bel giochino [[NoteTakingFoam]]