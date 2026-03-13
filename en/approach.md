---
title: Portfolio
layout: base.njk
permalink: /en/approach/
lang: en
source: approach.md
source_hash: be8419777786382e
translation_reviewed: false
---

# A designer design.

The wordplay in English is really beautiful and captures the essence of what a designer does.

If you want to see my projects go [to the bottom of the page](#fondo). If you want to understand them, keep reading.

My approach to the profession is simple and vague in the same way this definition is.
In Italian you need to spend a few more words just to clarify the meaning of that verb "to design" which when turned into a noun gives rise to the profession of Designer.

Moreover, when we talk about Design Leadership, User research and Business transformation, we move from vague tautology to something even more blurred and evanescent.

## How to translate "to Design"?

Design, now we don't translate anymore. We have Milan's Design week, we have Design furniture, we have memes that joke about "DiDesign", I myself used to make fun of whoever used it, before becoming a Designer, that is one who *does design*.

The choices you can make to translate this action are limited: some prefer *progettare* (to project) to a more childish *disegnare* (to draw). Perhaps because as graphic designers we always had the sense of inferiority of those dealing with decoration while in the other rooms, the big players, talked about business and money, drawing graphs with excel.

I too was of the "project" school, except that "drawing", in a broader sense, is a synonym for it. Think of the *divine design*.
Today however we find ourselves in a world where *design* can no longer be translated with either of those two concepts. If a coffee maker or a sofa can be drawn, if a service or an industrial process can be projected, what should we say about governance strategies, objective alignment or value storytelling?

I propose without any humility to Italianize the English word, as we would with any verb from a video game. If to download becomes download_are, if to respawn becomes respawn_are, if to lag becomes lagg_are, Design must necessarily become **Design_are**.
Even better if read in Italian: it becomes designare: derived from the Latin Signum "sign", it means to indicate, to propose, to determine, to establish, to denote, to signify.

Design today is this. It is no longer just about harmonious lines, or creating a production chain. It is about giving meaning, proposing a path, indicating possible solutions and defining the one, time and again, most suited.

## My approach to Design: Strategy & Research

But how to designate. How to indicate the way forward to clients and colleagues who must create a tangible solution?

It is necessary to practice theory and theorize practice.
It is necessary to know how things are made, to be able to make them and to be able to explain what you have done. A chair designer must know wood and saws and the reasons that push people to sit down, a web designer must know programming languages, computers and the reasons that lead people to navigate online. **What must an experience designer know?**

Assuming it is true that a UX designer must "Define digital strategies to align business objectives with users' real needs", what must they do to accomplish this alignment?

We have a few ingredients: the strategy to define, now we can say Designate; the business objectives: that is to make more money; the needs of users, who have something that drives them to spend money to obtain something they value.

Let us look at users, at people, and focus on value. **What is value?**
Value is that intangible that makes the difference between a memorable experience and one you'd better forget.

## Hunting for Value

To hunt for that value you must broaden your gaze beyond digital design and then narrow it to the single pixel.
Your view must embrace the infinitely large and the infinitely small: market contexts and device resolution, the spirit of the times and page load times. **Everything is Experience, every experience is unique and lived individually**

You can see that optimizing experiences is an infinite task if put this way. Then you use statistical shortcuts, all the more dangerous the more they are taken as truth.

You use other concepts that "stand for" experience.
You find metrics to measure them and rely on them.

Then you tell them in a consulting language, bullet point style, like:

- I lead teams that conduct user research, using methods such as interviews, usability testing and eye tracking to identify *actionable insights*.
- I have experience:
	- in reshaping *editorial workflows* for major publishers,
	- in defining solutions for apps in the financial sector
	- in facilitating *design thinking* workshops that stimulate creativity and collaboration.
- I make research accessible:
	- I translate complex findings into *clear and persuasive narratives* that empower teams and *guide product decisions*.
- My leadership style is based on empathy, curiosity and promoting a culture where every voice contributes to meaningful results.

The truth is that experience escapes, changes, is full of contradictions, unsaid things, unknowns. The statistic on CTA conversion percentages is scientific, quantifiable, positionable on a graph. It's even possible to monitor its trend month after month. Never mind whether this percentage actually depends on the experience or not.

I will continue to Designate and try to capture the value of experience. If to do so I must optimize conversions, decrease bounce rate, or reduce page load time, I will do it.

Many projects that I have led and will lead are subject to confidentiality restrictions, I cannot always show public materials; I remain however available to discuss my approach or specific cases upon request. When possible, I will add pages dedicated to individual projects within this portfolio.

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
