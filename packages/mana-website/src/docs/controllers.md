---
title: Controllers
---

# Controllers

## Name

The name of the controller. This is the name used in your templates. It should be written in "kebab-cased" (lowercase characters and dashes).

~~~ js
mana.defineController({
  name: 'my-controller-name'
})
~~~

## Properties

~~~ js
mana.defineController({
  properties: {
    myProp: { default: 'some value' }
  }
})
~~~

The property `properties` is an object that defines all possible properties for that controller. The key is the name of the property. The value is a configuration object that defines how that property behaves.

### Property Configuration Object

| Property | Type | Description |
| -------- | ---- | ----------- |
| `default` | `string` | The default value. |
| `type` | `PropertyTypeDescriptor` | The type descriptor. It's used to convert values between usable values and HTML attributes (which are always strings). |

### Property Type Descriptor



## Targets

## Callbacks

**`setup`** ‒ gets called once when this controller gets registered.

**`connect`** ‒ gets called once for every element that connects to this controller.

**`disconnect`** ‒ gets called once the controller class is being removed from an element.
