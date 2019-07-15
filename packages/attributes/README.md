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

// get the element
const element = document.getElementById('some-element')

// define settings for `booleanAttribute()`
const yesNoCI = { trueValues: ['yes'], falseValues: ['no'], caseSensitive: false }

// read the attribute value using the attribute descriptor and the settings from above
const attribValue = booleanAttribute(yesNoCI).parse(element, 'data-some-bool-attrib')

attribValue // -> true
~~~

## Available attribute descriptors

This package will contain the following attribute descriptors:

- **booleanAttribute** ‒ Parse attributes to strings. Which strings should be parsed to which value is customizable.
- **numberAttribute** ‒ Parses numbers.
- **stringAttribute** ‒ Parses strings. Can be used to validate and manipulate strings.
- **listAttribute** ‒ Parses a list of values and converts it into an array. You can use other attribute descriptors to parse each individual item.
- **jsonAttribute** ‒ Parses a JSON string.
- maybe more...

## Create your own attribute descriptors

An attribute descriptor is a simple object following a few rules to make it work. An instruction how to create your own will follow.
