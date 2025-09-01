---
title: "Blog"
layout: base.njk
permalink: "/blog/"
---
# Blog

{% for post in collections.blog | reverse %}
- [{{ post.data.title }}]({{ post.url }}) ({{ post.date | date("dd/MM/yyyy") }})
{% endfor %}
