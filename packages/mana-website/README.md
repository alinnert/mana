---
title: Home
---

# Mana ‒ a UI framework for websites

Mana is a JavaScript Framework to progressively enhance websites.

While React, Vue and Angular are for **web apps**, Mana is for **websites**.

## How do I use Mana on my website?

Load Mana and a controller:

~~~ html
<script src="/js/mana.js"></script>
<script src="/js/lightbox.js"></script>
~~~

Add this controller's class to your HTML:

~~~ html
<a
  href="big-image.jpg"
  class="@lightbox"
  data-lightbox.description="This is some more detailed description."
>
  <img src="thumbnail.jpg" alt="some description" class="@lightbox.image">
</a>
~~~

That's it! Now every element with a `@lightbox` class becomes a lightbox. It doesn't matter when the element or the class is being added. It just works.

## How can I write my own controller?

You register a new controller with the `mana.defineController(controllerConfig)` function. The `controllerConfig` is an object that contains your controller code. For more information see the [documentation](/docs).