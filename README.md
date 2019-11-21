![Mana](/packages/docs/src/.vuepress/public/brand-350.png)

> A small framework for interactive websites

**Status:** WIP

**Documentation [WIP]:** https://alinnert.github.io/mana

## What Mana is

Mana is a framework that lets you easily add interactivity to your existing HTML. You register targets in JavaScript and apply them to HTML using special classes. Connecting JS and HTML happens automatically. There's no need to manually apply a widget to a selector.

## What Mana is not

Mana is **not** a UI framework for web apps, like React and Vue, that generates and manages HTML itself. There is no virtual DOM, no render method, no anything.

## Example

~~~ html
<div class="@like-counter">17</div>
<button class="@like-button" data-like-action-url="/api/like-article?id=123">
  Like this article
</button>

<script src="/scripts/like-button.js"></script>
<script src="/scripts/like-counter.js"></script>
~~~

This is all you have to do. The two js files define two *targets*: `@like-button` and `@like-counter`. If you load the script files it will look for elements with these classes and attaches its logic to these elements. Its up to you where these targets are located and what kind of elements they are.

Basically, it works similar to jQuery plugins but Mana has two major benefits:

1. If you want to integrate a widget into your website you **don't have to touch JavaScript** at all. This makes it nice for teams with distinct JS developers and front-end designers.
1. You **don't have to manually re-initialize** a widget if you add some HTML to the DOM later on. Mana detects new elements automatically.

## Learn more

- [Learn more about Mana](https://alinnert.github.io/mana/introduction/)
- [Discover all available packges](https://alinnert.github.io/mana/packages/overview.html)

## License

[MIT](https://github.com/alinnert/mana/blob/master/LICENSE)
