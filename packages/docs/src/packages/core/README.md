---
title: About Core
---

# Mana Core

This is the core framework. It allows you to define targets, which can be added to the HTML through classes.

## Register a target

~~~ js
import { target } from '@mana/core'

// Register a 'like-button' target. In order to use it
// just add a class `@like-button` to some HTML element.
target('like-button', {
  // Register properties. These give you easy access to
  // HTML attributes, allow automatic conversion,
  // validation etc.
  props: {
    // The property is called `actionUrl`.
    // This is how you access it in your code.
    actionUrl: {
      // The property gets its value from the
      // `data-like-action-url` attribute from the
      // target element.
      attribute: 'data-like-action-url',

      // This attribute is marked as required.
      // Otherwise this target can't do its job.
      // If its not required, a default value
      // must be present using the `default` property.
      required: true
    }
  },

  // Register DOM events to every like-button target.
  events: {
    // This event gets called, whenever the user clicks
    // on a 'like-button'.
    click ({ event, target, props }) {
      // Send a signal to all other targets.
      // That way they know that a http request
      // is about to start.
      target.sendSignal('like-clicked')
      
      // Send the request to the server.
      const result = await window.fetch(props.actionUrl)

      // The data of the result depends on your API.
      const data = await result.json()

      // Let every widget know that the request
      // has finished.
      target.sendSignal('like-done')
    }
  },

  // Register "signals". These are basically
  // application events. They're called "signals"
  // to prevent confusion with DOM events.
  signals: {
    // Someone clicked a 'like-button'.
    // (Not necessarily the current instance)
    // Here you can change its appearance
    // to show a loading indicator.
    'like-clicked' ({ element, data }) {
      if (!data.buttonText) data.buttonText = element.textContent
      element.textContent = 'Please wait...'
    },

    // The process of sending the like to the
    // server has finished. Here you can
    // remove the loading indicator.
    'like-done' ({ element, data }) {
      element.textContent = data.buttonText
      data.buttonText = null
    }
  },

  // Execute code when an element receives
  // the `@like-button` class or an element
  // with that class gets added to the DOM.
  init () { },

  // Execute code when an element gets
  // the `@like-button` class removed or and
  // element with that class gets removed
  // from the DOM.
  destroy () { },

  // Execute code when an attribute of the
  // target element changes.
  attributeChanged () { }
})
~~~

## Find elements

> Note: This function will be moved to the `@mana/utils` package.

This function finds all elements that match a given selector. You can specify a second selector to filter the results. All elements that live inside an element that matches this filter selector are excluded from the results.

~~~ js
import { findElements } from '@mana/core'

const someElement = ...

const toggleElements = findElements({
  context: someElement,
  selector: '.slide-in__toggle',
  exclude: '.slide-in'
})
~~~

In this example the function returns all elements that follow all of these rules:

- It matches the selector `'.slide-in__toggle'`
- It lives inside `someElement`
- It does not live inside an element that matches the selector `.slide-in`
