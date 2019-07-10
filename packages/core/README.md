# @mana/core

The core of Mana. Provides the possibility to watch for certain elements to appear and disappear in the DOM.

## Usage

~~~ js
import { registerSelector } from '@mana/core'

registerSelector({
  root: document,
  selector: '.slide-in',
  
  onAdded (mutationRecord) {
    // An element matching the provided selector got added to the DOM.
  },
  
  onRemoved (mutationRecord) {
    // An element matching the provided selector got removed from the DOM.
  },
  
  onAttributeChanged (mutationRecord) {
    // An element matching the provided selector changed one of its attributes.
  }
})
~~~
