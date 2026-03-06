---
title: Portfolio
layout: base.njk
permalink: /en/approach/
lang: en
source: approach.md
source_hash: 71fdf093a040b165
translation_reviewed: false
---

# A designer design.

The wordplay in English is very beautiful and captures well what a designer does.

If you want to see my projects go [to the bottom of the page](#fondo). If you want to understand them, keep reading.

My approach to the profession is as simple and vague as this definition itself.
In Italian you need to spend a few more words just to clarify the meaning of that verb "to design" which when substantivized gives rise to the profession of Designer.

Moreover, when talking about Design Leadership, User research, and Business transformation, you move from vague tautology to something even more nebulous and evanescent.

## How to translate "to Design"?

Design, by now, is no longer translated. We have Milan's Design week, we have Design furniture, we have memes making fun of "DiDesign", I myself used to mock people who used it, before becoming a Designer, that is someone who *practices design*.

The choices available for translating this action are limited: some prefer *progettare* (to project) to a more childish *disegnare* (to draw). Perhaps because as graphic designers we always had the sense of inferiority of those dealing with decoration while in other rooms, the big guys, talked about business and money, drawing graphs with excel.

I was also of the "project" school, if not that "drawing," in a broader sense, is a synonym for it. Think of the *divine design*.
But today we find ourselves in a world where *design* can no longer be translated with either of the two concepts. If a coffee pot or a sofa can be drawn, if a service or an industrial process can be designed, what should we say of governance strategies, alignment of objectives, or value storytelling?

I propose without any humility to Italianize the English word, as we would with any verb from a video game. If to download becomes download_are, if to respawn becomes respawn_are, if to lag becomes lagg_are, Design must necessarily become **Design_are**.
Better still if read in Italian: it becomes designare: derived from the Latin Signum "sign", it means to indicate, to propose, to determine, to establish, to denote, to signify.

Design today is this. It is no longer just about harmonious lines, or the creation of a production chain. It is about giving meaning, about proposing a path, about indicating possible solutions and defining, time by time, the most suitable one.

## My approach to Design: Strategy & Research

But how to designate. How to show the way forward to clients and colleagues who must create a tangible solution?

It is necessary to practice theory and theorize practice.
It is necessary to know how things are done, to be able to do them and to be able to explain what you've done. A chair designer must know about wood and saws and the reasons that push people to sit down, a web designer must know programming languages, computers, and the reasons that drive people to browse online. **What must a designer of experiences know?**

Assuming it's true that a UX designer must "Define digital strategies to align business objectives with real user needs," what must they do to accomplish this alignment?

We have a few ingredients: the strategy to define, now we can say Designate; business objectives: that is, make more money; user needs, which have something that drives them to spend money to obtain something they value.

Let's look at users, at people, and focus on value. **What is value?**
Value is that intangible thing that makes the difference between a memorable experience and one better forgotten.

## Hunting for Value

To hunt for that value, you need to widen your gaze beyond digital design and then narrow it down to a single pixel.
The view must embrace the infinitely large and the infinitely small: market contexts and device resolution, the spirit of the times and page load time. **Everything is Experience, every experience is unique and lived individually.**

You see how optimizing experiences is an endless task if approached this way. So you use statistical shortcuts, all the more dangerous the more they are taken as truth.

You use other concepts that "stand for" experience.
You find metrics to measure them and rely on them.

Then you tell them in consulting language, bullet-pointed, like:

- I lead teams that conduct user research, using methods such as interviews, usability testing, and eye-tracking to identify *actionable insights*.
- I have experience:
	- in reshaping *editorial workflows* for major publications,
	- in defining solutions for apps in the financial sector
	- in facilitating *design thinking* workshops that stimulate creativity and collaboration.
- I make research accessible:
	- I translate complex findings into *clear and persuasive narratives* that empower teams and *guide product decisions*.
- My leadership style is based on empathy, curiosity, and the promotion of a culture in which every voice contributes to meaningful outcomes.

The truth is that experience eludes, changes, is full of contradictions, unsaid things, unknowns. Statistics on CTA conversion percentages are scientific, percentage-based, plottable on a graph. It's even possible to monitor their trend month after month. It hardly matters whether this percentage depends on experience or not.

I will continue to Designate and try to capture the value of experience. If to do so I must optimize conversions, reduce bounce rate, or shorten page load time, I will.

Many projects I have led and will lead are subject to confidentiality restrictions, I cannot always show public materials; I remain available to discuss my approach or specific cases upon request. When possible, I will add pages dedicated to individual projects within this portfolio.

*To learn more or get in touch: write to me at il.manuel.colombo @ gmail.com.*

<span id="fondo"></span>
## Some selected projects

{% if collections.approach %}
<section class="wrapper">
{% for item in collections.approach | reverse %}
  {% set item = item %}{% include "card.njk" %}
{% endfor %}
</section>
{% endif%}
