---
title: About Core
---

# Mana Core

The core of Mana. Provides the possibility to watch for certain elements to appear and disappear in the DOM.

## Usage

~~~ js
import { watchSelector } from '@mana/core'

watchSelector({
  selector: '.slide-in',
  context: document,
  
  onAdded (mutationRecord, data) {
    // An element matching the provided selector got added to the DOM.
  },
  
  onRemoved (mutationRecord, data) {
    // An element matching the provided selector got removed from the DOM.
  },
  
  onAttributeChanged (mutationRecord, data) {
    // An element matching the provided selector changed one of its attributes.
  }
})
~~~