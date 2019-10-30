---
title: What is Mana?
---

# What is Mana?

## The goal

Pretty much every major framework out there is built around the idea of developing complex applications using web technologies. But the web doesn't only consist of web apps, there are also a ton of traditional websites out there. Most of them also provide some kind of interactivity which makes the use of JavaScript necessary.

Making it easy to add interactivity to these websites is the goal of Mana. To reach this goal Mana follows one big principle:

There's no direct connection between HTML and JavaScript Code:

- JavaScript developers only need to touch **JavaScript** files.
- Front end designers only need to touch **HTML** files.

To make things work the JavaScript side expects some classes and attributes to be present. It's up the frontend designer to place them at the correct elements.

## What about all the popular frameworks?

All well-known frameworks like React and Vue (and to some extend WebComponents) create and manage their own HTML. Websites on the other hand are generally server rendered or pre rendered. This creates a conflict about who manages the markup. Mana goes hand in hand with the paradigm of CMS and static site generators. It hooks into existing HTML and doesn't manage its own.

It's *really* difficult to do this with these major frameworks.

### Progressive enhancement

The way Mana works makes it easy to leverage "*progressive enhancement*". Mana makes JavaScript based ineractivity an optional bonus. If JavaScript is not available you can still display data or use server based interactivity like forms or hyperlinks.

## About the name

Mana is mostly referred to as the energy of life. It brings life to otherwise dead objects. Just like the concept of mana, the framework Mana brings "life" (= functionality) to the otherwise "dead" (= static) HTML.