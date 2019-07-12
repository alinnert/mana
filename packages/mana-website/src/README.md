---
home: true
heroImage: /brand.svg
heroText: ""
tagline: A framework for websites, not web apps.
---

## Example

~~~ html
<div class="@like-counter" data-like-counter.action-url="/api/add-like?article-id=123">
  <div class="@like-counter.value">42</div>
  <button class="@like-counter.button">Like this article</button>
</div>

<script src="/scripts/like-counter.js"></script>
~~~

### What's happening here?

Let's assume that `like-counter.js` implements a small widget that sends a message to a server
