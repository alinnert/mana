# Mana

> Mana is a JavaScript UI framework for existing HTML.

**Status:** WIP

## What Mana is

Mana is a UI framework that attaches itself to already existing HTML. This HTML can be manually HTML, generated statically, or by a CMS like Drupal etc.

So, you can use Mana to bind JS logic to ordinary websites in a componentized way. That way you could create "components" that can be attached to any HTML by using classes and attributes. It also helps you write code that's independent of project specific style classes. I.e. your "components" will work on Bootstrap websites just as fine as on ones that are built on top of a custom Sass framework.

## What Mana is not

Mana is **not** a UI framework for web apps, like React and Vue, that generates and manages HTML itself. There is no virtual DOM, no render method, and nothing alike.

## What does it look like?

First you define and configure a controller:

~~~ js
const controller = mana.defineController({
  name: 'slide-in-menu',
  properties: {
    isOpen: { default: 'false', type: mana.booleanProperty() },
    classes: {
      type: mana.simpleProperty(),
      dataMap: {
        isOpen: { required: true }
      }
    }
  },
  targets: {
    toggleButton: { }
  }
})
~~~

Then you apply the controller specific classes and attributes to your HTML:

~~~ html
<div
  class="slide-in-menu @slide-in-menu"
  data-slide-in-menu.is-open="true"
  data-slide-in-menu.classes:is-open="slide-in-menu--is-open"
>
  <button class="@slide-in-menu.toggle-button">Toggle Button</button>
</div>
~~~

Controllers are applied via class names with the format `@{controller}`. The `slide-in-menu` class could be a style class used by your CSS.

Attributes with the format `data-{controller}.{property}` are called "properties". They can pass additional information to your controller. It's like a function argument, where the controller is your function.

Attributes with the format `data-{controller}.{property}:{data map item}` ‒ called "data map properties" ‒ are technically the same, but multiple key value pairs can be grouped together. They are like passing an array to a function.

In this example you tell the controller which CSS class to set while the menu is open.

Class names with the format `@{controller}.{target}` signalize a target. A target makes it easy to select an element in association with a controller. A target needs to be inside the root element of that controller it belongs to. Otherwise Mana doesn't know which target belongs to which controller element. (Use "named controllers" to break this rule. See "Planned features" below.)

Now you can add logic to your controller:

~~~ js
mana.defineController({
  /* other config options... */

  onInit (context) {
    context.target.toggleButton.on('click', () => {
      context.property.isOpen.value = !context.property.isOpen.value
    })

    context.property.isOpen.onChange(isOpen => {
      // do something with `isOpen`
    })
  }
})
~~~

When you click on any `toggleButton` target you change the property `isOpen` (and also the associated HTML attribute) from `true` to `false` and vice versa.

With the `.onChange()` method you can listen to any change of the `isOpen` property (and, of course, also of the associated HTML attribute).

*Note:* The API for properties might change since I think about integrating Vue's upcoming reactivity system into Mana. But I'm not sure, yet.

## Planned features

### Named controllers

I plan to add the possibility to create targets outside of their root element. For that to work the target and the controller element need to be connected ‒ via a name.

Example:

~~~ html
<div class="@counter#main-counter">
  <div class="@counter.output"></div>
</div>

<div class="@counter#another-counter">
  <div class="@counter.output"></div>
</div>

<button class="@counter#main-counter.increment-button">Add 1</button>
~~~

That way the button knows it belongs to the first counter, not to the second, although it's not a descendant element of the first counter.