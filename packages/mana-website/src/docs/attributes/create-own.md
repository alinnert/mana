---
title: Create your own property descriptor
---

# Create your own property descriptor

~~~ js
const somePropDescriptor = (options) => {
  // do something with `options`

  return {
    parse (value) {
      return value
    },

    stringify (value) {
      return (value.toString && value.toString()) || ''
    }
  }
}
~~~