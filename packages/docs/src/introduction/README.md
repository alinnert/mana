---
title: What is Mana?
---

# What is Mana?

## The goal

Pretty much every major framework out there is built around the idea of developing complex applications using web technologies. But the web doesn't only consist of web apps, there are also a ton of traditional websites out there. Most of them also provide some kind of interactivity which makes the use of JavaScript necessary.

Making it easy to add interactivity to these websites is the goal of Mana. To reach this goal Mana follows one big principle:

There's no direct connection between HTML and JavaScript:

- JavaScript developers only need to touch **JavaScript** files.
- Front end designers only need to touch **HTML** files.

The only interface between both worlds are HTML classes and attributes.

## What about all the popular frameworks?

All well-known frameworks like React and Vue (and to some extend WebComponents) create and manage their own HTML. Websites on the other hand are generally server rendered or pre rendered. This creates a conflict about who manages the markup. Mana goes hand in hand with the paradigm of CMS and static site generators. It hooks into existing HTML only. It's *really* difficult to do this with the current big frameworks.

### Progressive enhancement

The way Mana works makes it easy to leverage "*progressive enhancement*". I.e. create your basic HTML and add additional JavaScript logic on top. If JavaScript is not available you can still display data or use server based interactivity like forms or hyperlinks.

## About the name

The framework takes its name from mana &ndash; the energy of life. It brings life to otherwise dead objects. Just like this mana, the framework Mana brings "life" (= interactivity) to the otherwise "dead" (= static) HTML.