---
title: Templates
---

# Templates

## Controllers

You attach controllers with a class that starts with a `@`. The exact name is defined by the controller.

Example:

~~~ html {1}
<div class="counter @counter"></div>
~~~

## Targets

Targets are similar, but use a `.` to separate controller name from target name.

Example:

~~~ html {2-3}
<div class="counter @counter">
  <div class="counter__value @counter.value"></div>
  <button class="counter__button @counter.button"></div>
</div>
~~~

## Attributes

You can pass values to your controller using data-attributes. The syntax is similar to target classes.

Example:

~~~ html {1}
<div class="counter @counter" data-counter.initial-value="5">
  <div class="counter__value @counter.value"></div>
  <button class="counter__button @counter.button"></div>
</div>
~~~
