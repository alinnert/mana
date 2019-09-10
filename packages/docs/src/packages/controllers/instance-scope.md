---
title: Controller instance scope (this)
---

# The Controller instance scope

Or: what properties are available on `this` in controller functions?

| property | type | description |
| -------- | ---- | ----------- |
| `global` | `any` | You can store any data here that is available to all instances of this controller. You can use this to share data between them. |
| `attributes` | `AttributeMap` | This property gives you access to your defined attributes. You can also use this to listen for changes. |
| `targets` | `TargetMap` | This property gives you access to your defined targets. |
| `element` | `HTMLElement` | This is the element this controller instance is attached to. |