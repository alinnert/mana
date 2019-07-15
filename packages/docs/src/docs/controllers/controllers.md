---
title: Create a controller
---

# Create a controller

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

The property `attributes` is an object that defines all possible properties for that controller. The **key** is how you reference the attribute's (converted) value. The **value** is a configuration object that defines how that attribute behaves.

### Attribute Configuration Object

| Property | Type | Description |
| -------- | ---- | ----------- |
| `default` | `string` | The default value. |
| `type` | `AttributeTypeDescriptor` | The type descriptor. It's used to convert values between usable values and HTML attributes (which are always strings). |

### Attribute Type Descriptor

## Targets

## Callbacks

**`onSetup`** ‒ gets called once when this controller gets registered.

**`onConnect`** ‒ gets called once for every element that connects to this controller.

**`onDisconnect`** ‒ gets called once the controller class is being removed from an element.
