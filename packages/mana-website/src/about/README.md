---
title: What is Mana?
---

# About Mana

## Why *another* framework?

I don't want to compete with frameworks like React. I am trying to solve a different problem. In fact, I'm using Vue myself for developing web apps.

The thing is, the web doesn't only consist of client-side web apps. There are also websites powered by CMS, static site generators or web frameworks that generate HTML on the server and send it to the browser. Now these technologies create HTML, but React also creates HTML. And that's where things clash.

HTML should only be rendered fully on the server or fully on the client. This is what makes JS UI frameworks a poor choice for quite a few cases. Here we need a framework that doesn't generate new HTML, but attaches to existing HTML to manipulate it.

## Why not using WebComponents?

While WebComponents are in the coming, they do have some drawbacks:

- They require JS to render anything at all. Disable JavaScript and you will lose a lot of content.
- They also need to initialize themself at page load. This takes more time and processing power than actually necessary.
- They require you to wrap elements in new custom elements. For each feature you need a new element in your DOM. This adds complexity.

They do have their use cases, but they are far from perfect.

## Why the name "Mana"?

Mana ‒ as known from the fantasy genre ‒ is the energy of life. It brings life to otherwise dead objects. Just like the concept of mana, the framework Mana brings "live" to the otherwise "dead" HTML.