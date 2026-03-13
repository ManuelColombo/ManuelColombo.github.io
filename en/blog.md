---
title: "Blog"
layout: base.njk
permalink: "/en/blog/"
lang: en
---
# Blog

{% set blogItems = collections.blogEn if lang == "en" else collections.blog %}
{% if blogItems %}
<section>
{% for item in blogItems | reverse %}
  {% set item = item %}{% include "card.njk" %}
{% endfor %}
</section>
{% endif %}

Here I share thoughts and reflections on design, UX research, and life in general.
All posts are automatically translated from Italian — you can read the original by clicking **IT** in the navigation.
