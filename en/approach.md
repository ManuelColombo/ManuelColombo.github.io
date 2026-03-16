---
title: Portfolio
layout: base.njk
permalink: /en/approach/
lang: en
source: approach.md
source_hash: 651b0e32cfb3a62f
translation_reviewed: false
---

# A designer design.

The wordplay in English is beautiful and captures well what a designer does.

If you want to see my projects go [to the bottom of the page](#fondo). If you want to understand them, keep reading.

My approach to the profession is simple and vague in much the same way as this definition.
In Italian you need to spend a few more words just to clarify the meaning of that verb "to design" which when nominalized gives rise to the profession of Designer.

Moreover, when you talk about Design Leadership, User research and Business transformation, you move from vague tautology to something even more blurred and evanescent.

## How to translate "to Design"?

Design is no longer translated. We have Milan Design Week, we have Design furniture, we have memes that joke about "DiDesign", I myself used to make fun of whoever used it, before becoming a Designer, that is, one who *carries out design*.

The choices you can make to translate this action are limited: some prefer *progettare* (to plan/design) to a more childish *disegnare* (to draw). Perhaps because as graphic designers we always had the sense of inferiority of those dealing with decoration while in other rooms, the grown-ups, talked about business and money, drawing charts with excel.

I too was of the "project" school, if not that "drawing", in a broader sense is a synonym for it. Think of the *divine design*.
Today however we find ourselves in a world where *design* can no longer be translated with either of the two concepts. If a coffeepot or a sofa can be drawn, if a service or an industrial process can be planned, what should we say about governance strategies, alignment of objectives or value storytelling?

I propose without any humility to Italianize the English word, as we would with any verb from a video game. If to download becomes download_are, if to respawn becomes respawn_are, if to lag becomes lagg_are, Design must necessarily become **Design_are**.
Even better if read in Italian: it becomes designare: derived from the Latin Signum «sign», it means to indicate, to propose, to determine, to establish, to denote, to signify.

Design today is this. It's no longer just about harmonious lines, or the creation of a production chain. It's about giving meaning, proposing a path, indicating possible solutions and defining, from time to time, the most suitable one.

## My approach to Design: Strategy & Research

But how to designate. How to indicate the path to follow to clients and colleagues who must create a tangible solution?

It is necessary to practice theory and theorize practice.
It is necessary to know how things are done, to be able to do them and to be able to explain what was done. A chair designer must know wood and saws and the reasons that drive people to sit, a web designer must know programming languages, computers and the reasons that lead people to browse online. **What must an experience designer know?**

Assuming it's true that a UX designer should "Define digital strategies to align business objectives with real user needs", what should they do to accomplish this alignment?

We have a few ingredients: the strategy to define, now we can say Designate; the objectives of the business: that is, to make more money; the needs of users, who have something that drives them to spend money to obtain something they value.

Let's look at users, at people, and let's focus on value. **What is value?**
Value is that intangible thing that makes the difference between a memorable experience and one it's better to forget.

## On the Hunt for Value

To hunt for that value you need to broaden your gaze beyond digital design and then narrow it to a single pixel.
The view must embrace the infinitely large and the infinitely small: market contexts and device resolution, the spirit of the times and page load times. **Everything is Experience, every experience is unique and lived individually**

You understand that optimizing experiences is an endless task if put this way. So you use statistical shortcuts, all the more dangerous the more they're taken for truth.

You use other concepts that "stand for" the experience.
You find metrics to measure them and rely on them.

Then you tell them in a consultative language, bullet point style, like:

- I lead teams that conduct user research, using methods like interviews, usability testing and eye tracking to identify *actionable insights*.
- I have experience:
	- in reshaping *editorial workflows* for major publications,
	- in defining solutions for apps in the financial sector
	- in facilitating *design thinking* workshops that stimulate creativity and collaboration.
- I make research accessible:
	- I translate complex results into *clear and persuasive narratives* that empower teams and *guide product decisions*.
- My leadership style is based on empathy, curiosity and promoting a culture where every voice contributes to meaningful results.

The truth is that experience slips away, mutates, is full of contradictions, unsaid things, unknowns. Statistics on CTA conversion percentages are scientific, measurable, positionable on a graph. It's even possible to monitor its progress month by month. It hardly matters whether this percentage depends on the experience or not.

I will continue to Designate and try to capture the value of experience. If to do so I have to optimize conversions, reduce bounce rate, or reduce page load time, I will.

Many projects I have led and will lead are subject to confidentiality constraints, I can't always show public materials; I remain available to discuss my approach or specific cases upon request. When possible, I will add pages dedicated to individual projects within this portfolio.

*To learn more or get in touch: write to me at il.manuel.colombo @ gmail.com.*

<span id="fondo"></span>

## Some selected projects

{% set approachItems = collections.approachEn if lang == "en" else collections.approach %}
{% if approachItems %}
<section>
{% for item in approachItems | reverse %}
  {% set item = item %}{% include "card.njk" %}
{% endfor %}
</section>
{% endif%}
