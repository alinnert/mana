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
    isOpen: { default: 'false', type: mana.booleanProperty() }
  },
  targets: {
    toggleButton: {}
  },
  dataMaps: {
    classes: ['is-open']
  }
})
~~~

Then you apply all the information to your HTML:

~~~ html
<div
  class="slide-in-menu @slide-in-menu"
  data-slide-in-menu[is-open]="true"
  data-slide-in-menu:classes[is-open]="slide-in-menu--is-open"
>
  <button class="@slide-in-menu:toggle-button">Toggle Button</button>
</div>
~~~

Controllers are applied via class names with the format `@<controller name>`.

Attributes with the format `data-<controller name>[<property name>]` can pass additional information to your controller code. It's like a function argument, where the controller is your function.

Attributes with the format `data-<controller name>:<data map name>[<data map property>]` are technically the same, but can be grouped into data maps. They are like passing an array to a function.

Class names like `@<controller name>:<target name>` signalize a target. A target makes it easy to select different HTML elements in association with a controller.

Now you can add logic to your controller:

~~~ js
controller.onInit(context => {
  context.target.toggleButton.on('click', () => {
    context.property.isOpen.value = !context.property.isOpen.value
  })

  context.property.isOpen.onChange(isOpen => {
    // do something with `isOpen`
  })
})
~~~

When you click on any `toggleButton` target you change the property `isOpen` (and also the associated HTML attribute) from `true` to `false` and vice versa.

With the `.onChange()` method you can react to any change of the `isOpen` property (and, of course, also of the associated HTML attribute).

*Note:* The API for properties might change since I think about integrating Vue's upcoming reactivity system into Mana. But I'm not sure, yet.