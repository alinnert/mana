# @mana/attributes

A collection of commonly used attribute descriptors (= converters and validators) to convert back and forth between HTML attributes and JS native data types.

This is necessary because attributes are always of type *string*. Attribute descriptors can also be used to validate attributes.

## Usage

Based on this HTML:

~~~ html
<div data-some-bool-attrib="YES"></div>
~~~

You can parse the attribute like this:

~~~ js
import { booleanAttribute } from '@mana/attributes'

const yesNoAttribute = booleanAttribute({ trueValues: ['yes'], falseValues: ['no'], caseSensitive: false })
const element = document.getElementById('some-element')

const attribValue = yesNoAttribute.parse(element, 'data-some-bool-attrib')

attribValue // -> true
~~~

## Create your own attribute descriptors

An attribute descriptor is a simple object following a few rules to make it work. An instruction how to create your own will follow.
