---
title: "Portfolio"
layout: base.njk
permalink: "/portfolio/"
---
# Portfolio

{% for item in collections.portfolio | reverse %}
- [{{ item.data.title }}]({{ item.url }}){% if item.data.excerpt %} — {{ item.data.excerpt }}{% endif %}
{% endfor %}


**Portfolio Structure for Nexi Application**

1. **Introduction**
   - Brief bio highlighting your leadership in UX research and multicultural experience.

2. **Case Studies (2–3 recommended)**
   - *Stellantis Project (Publicis Sapient)*  
     - Overview, your role, research approach, key insights, impact on product decisions.
   - *Collaborative Publication System (Corriere della Sera)*  
     - Problem, process, outcomes, influence on editorial workflows.
   - *Crédit Agricole Consumer App*  
     - Research methods (e.g., eye tracking), actionable insights, results.

3. **Workshop Facilitation**
   - Examples of design-thinking sessions and workshops led, including outcomes and team impact.

4. **Research Activation**
   - How you’ve translated complex insights into presentations and inspired product teams.

5. **Leadership & Collaboration**
   - Stories/examples of motivating teams, fostering collaboration, and driving customer-centricity.

6. **Contact & Links**
   - Email, LinkedIn, Medium articles, relevant online profiles.