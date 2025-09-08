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