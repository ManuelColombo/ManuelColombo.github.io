---
title: "Portfolio"
layout: base.njk
permalink: "/approach/"
---

# Strategic Design & Research Highlights

As a design lead and UX researcher, I specialize in driving **user-centered innovation** across diverse industries and multicultural teams. My work blends strategic vision with hands-on research, guiding organizations to align business goals with real user needs.

I lead research initiatives from discovery to activation, using methods like interviews, usability testing, and eye tracking to uncover actionable insights. My experience includes shaping editorial workflows for major news media, informing app design for financial services, and facilitating design-thinking workshops that spark creativity and collaboration.

I believe in making research accessible—translating complex findings into clear, inspiring narratives that empower teams and drive product decisions. My leadership style centers on empathy, curiosity, and fostering a culture where every voice contributes to meaningful outcomes.

While confidentiality limits what I can share publicly, I’m always open to discussing my approach or specific challenges I’ve helped solve. As permissions allow, I’ll add dedicated project pages to this portfolio.

*Feel free to reach out at **il.manuel.colombo @ gmail.com** if you’d like to know more or connect!*


## My projects

{% for item in collections.approach | reverse %}
  {% set item = item %}{% include "card.njk" %}
{% endfor %} 

<!--
1. **Case Studies (2–3 recommended)**
   - *Stellantis Project (Publicis Sapient)*  
     - Overview, your role, research approach, key insights, impact on product decisions.
   - *Collaborative Publication System (Corriere della Sera)*  
     - Problem, process, outcomes, influence on editorial workflows.
   - *Crédit Agricole Consumer App*  
     - Research methods (e.g., eye tracking), actionable insights, results.

2. **Workshop Facilitation**
   - Examples of design-thinking sessions and workshops led, including outcomes and team impact.

3. **Research Activation**
   - How you’ve translated complex insights into presentations and inspired product teams.

4. **Leadership & Collaboration**
   - Stories/examples of motivating teams, fostering collaboration, and driving customer-centricity.

5. **Contact & Links**
   - Email, LinkedIn, Medium articles, relevant online profiles.
 - -->
