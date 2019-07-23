---
title: About Core
---

# Mana Core

The core of Mana. Provides the possibility to watch for certain elements to appear and disappear in the DOM.

## Usage

~~~ js
import { watchClassName } from '@mana/core'

watchClassName('slide-in', {
  onAdded (element) {
    // An element matching the provided selector got added to the DOM.
  },
  
  onRemoved (element) {
    // An element matching the provided selector got removed from the DOM.
  },
  
  onAttributeChanged (element, attributeValue, attributeName) {
    // An element matching the provided selector changed one of its attributes.
  }
})
~~~