---
title: "Blog"
layout: base.njk
permalink: "/blog/"
---
# My Ideas

Here I share thoughts and reflections on design, UX research, and unrelated topics. My aim is to foster discussion and exchange ideas with fellow professionals and enthusiasts.
> I'm curious about everything so expect a variety of topics! 

## Italiano

*Qui condivido i miei pensieri e le mie riflessioni sul design, sulla ricerca UX e sulla vita in generale. Il mio obiettivo è quello di alimentare la discussione e scambiare idee con altri professionisti o persone interessate a questi argomenti*
> Sono curioso di più o meno tutto, quindi aspettatevi una gran varietà di argomenti!

{% for item in collections.blog | reverse %}
  {% set item = item %}{% include "card.njk" %}
{% endfor %} 

### Prossimi articoli in pipeline:

- Scrivere qualcosa dal titolo "Gli utenti non partono dalla Home" perché se lavoriamo bene di seo vengono mandati già alla pagina giusta. La metafora del negozio fisico forse non funziona più. 
- Zorro e batman eroi ricchi che si fanno giustizia da soli. Uno contro un potere criminale, l'altro contro i criminali che il potere non riesce a fermare.