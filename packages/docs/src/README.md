---
home: true
heroImage: /brand.svg
tagline: A framework for websites ‒ not web apps
---

Mana is a framework that lets you easily add functionality to your existing HTML.

## Example

~~~ html
<div class="@like-widget" data-like-widget-action-url="/api/add-like?article-id=123">
  <div class="@like-widget.value">42</div>
  <button class="@like-widget.button">Like this article</button>
</div>

<script src="/scripts/like-widget.js"></script>
~~~

This is all you have to do. There lives a **controller** in the file `like-widget.js` which how the *like widget* should behave. It doesn't assume a specific HTML structure, just the presence of some classes. These classes can be attached to any HTML element. That way this widget just fits any website.

Basically, it works similar to jQuery plugins but Mana has two major benefits:

1. If you want to use a widget you **don't have to touch JavaScript** at all. This makes it nice for teams with distinct JS developers and front-end designers.
1. You **don't have to manually re-initialize** a widget if you add some HTML to the DOM later on. Mana detects newly added widgets automatically.

## Learn more

- [Learn more about Mana](/introduction/)
- [Implement your own controller](/docs/)
