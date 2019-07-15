---
title: Create your own attribute descriptor
---

# Create your own attribute descriptor

~~~ js
const someAttrDescriptor = (options) => {
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