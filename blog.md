---
title: "Blog"
layout: base.njk
permalink: "/blog/"
---
# Blog

*Qui condivido i miei pensieri e le mie riflessioni sul design, sulla ricerca UX e sulla vita in generale. Il mio obiettivo è quello di alimentare la discussione e scambiare idee con altri professionisti o persone interessate a questi argomenti*
> Sono curioso di più o meno tutto, quindi aspettatevi una gran varietà di argomenti!


{% set blogItems = collections.blogEn if lang == "en" else collections.blog %}
{% if blogItems %}
<section class="wrapper">
{% for item in blogItems | reverse %}
  {% set item = item %}{% include "card.njk" %}
{% endfor %}
</section>
{% endif %}



