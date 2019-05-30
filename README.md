# Mana

> Mana is a JavaScript UI framework for server rendered websites.

**Status:** WIP

## What Mana is

Mana is a UI framework that attaches itself to already existing HTML. This can be manually written HTML or HTML generated statically, or by a CMS like Drupal etc.

## What Mana is **not**

Mana is **not** a UI framework for web apps, like React and Vue, that generates and manages HTML itself.

## What does it look like?

First you define a controller like this:

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

Then you apply all the information to your HTML:

~~~ html
<div
  class="slide-in-menu @slide-in-menu"
  data-slide-in-menu.is-open="true"
  data-slide-in-menu.classes:is-open="slide-in-menu--is-open"
>
  <button class="@slide-in-menu.toggle-button">Toggle Button</button>
</div>
~~~

Controllers are applied via class names with the format `@{controller}`.

Attributes with the format `data-{controller}.{property}` are called "properties". They can pass additional information to your controller. It's like a function argument, where the controller is your function.

Attributes with the format `data-{controller}.{property}:{data map item}` ‒ called "data map properties" ‒ are technically the same, but multiple key value pairs can be grouped together. They are like passing an array to a function.

Class names with the format `@{controller}.{target}` signalize a target. A target makes it easy to select an element in association with a controller. A target needs to be inside the root element of that controller it belongs to. Otherwise Mana doesn't know which target belongs to which controller element.

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