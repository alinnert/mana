# @mana/properties

A collection of property descriptors (converters) to convert back and forth between HTML attributes and meaningful values.

## Usage

Based on this HTML:

~~~ html
<div data-some-bool-prop="YES"></div>
~~~

You can parse the attribute like this:

~~~ js
import { booleanProperty } from '@mana/properties'

const yesNoProp = booleanProperty({ trueValues: ['yes'], falseValues: ['no'], caseSensitive: false })
const element = document.getElementById('some-element')

const propValue = yesNoProp.parse(element, 'data-some-bool-attrib')

propValue // -> true
~~~

## Create your own property descriptors

A property descriptor is a simple object following a few rules to make it work. An instruction how to create your own will follow.
