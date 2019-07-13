---
home: true
heroImage: /brand.svg
tagline: A framework for websites, not web apps.
---

## Usage example

~~~ html
<div class="@like-widget" data-like-widget.action-url="/api/add-like?article-id=123">
  <div class="@like-widget.value">42</div>
  <button class="@like-widget.button">Like this article</button>
</div>

<script src="/scripts/like-widget.js"></script>
~~~

Let's assume that `like-widget.js` implements a small widget which displays the number of people who liked an article on your website. There's also a button that allows your users to like said article.

The **controller** inside `like-widget.js` implements just the bare logic. You have to tell it how your website works. It needs to know where to output the updated like counter, which element triggers a "like" after being clicked and what URL to call if your user likes your article. This is done via special classes and attributes.

As you can see, all you have to do is to slightly update your HTML. Touching JavaScript is not required.

You can learn more about Mana on the [about page](/about/).

To learn how to implement your own controllers, you can [read the docs](/docs/).
