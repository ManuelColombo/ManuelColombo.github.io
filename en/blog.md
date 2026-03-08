---
title: "Blog"
layout: base.njk
permalink: "/en/blog/"
lang: en
---
# Blog

{% if collections.blogEn %}
<section class="wrapper">
{% for item in collections.blogEn | reverse %}
  {% set item = item %}{% include "card.njk" %}
{% endfor %}
</section>
{% endif %}

Here I share thoughts and reflections on design, UX research, and life in general.
All posts are automatically translated from Italian — you can read the original by clicking **IT** in the navigation.
