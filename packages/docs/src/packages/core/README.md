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
    // An element with class 'slide-in' got added to the DOM.
  },
  
  onRemoved (element) {
    // An element with class 'slide-in' got removed from the DOM.
  },
  
  onAttributeChanged (element, { attributeName, value, oldValue }) {
    // An element with class 'slide-in' changed one of its attributes.
  }
})
~~~