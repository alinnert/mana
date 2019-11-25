// So... this is a playground to create the typesystem of Mana.
// This works better than creating it alongside the real code.
// Also, this helps me shaping the API.
// When it's done it needs to replace the old type definitions.

interface AttributeConverter<Type> {
  parse: (str: string) => Type
  stringify: (value: Type) => string
}

interface PropDescriptor<Type> {
  attribute: string
  default: string
  type: AttributeConverter<Type>
}

type PropsMap<Props> = {
  [PropName in keyof Props]: PropDescriptor<Props[PropName]>
}

interface TargetDescriptor<Props> {
  props: PropsMap<Props>
  init: (ctx: TargetContext<Props>) => void
}

type TargetOptions<Props> = Partial<TargetDescriptor<Props>>

type PropsInstance<Props> = {
  [PropName in keyof Props]: Props[PropName]
}

interface TargetContext<Props> {
  props: PropsInstance<Props>

  sendSignal: (signalName: string, data: unknown) => void
  sendSignalUp: (signalName: string, data: unknown) => void
  sendSignalDown: (signalName: string, data: unknown) => void
}

interface TestOptionsProps {
  foo: string
  bar: number
}

// This is a demo object to test if the types work as expected.

const testOptions: TargetOptions<TestOptionsProps> = {
  props: {
    foo: {
      attribute: 'data-foo',
      default: '',
      type: {
        parse (str): string { return str },
        stringify (value): string { return `${value}` }
      }
    },

    bar: {
      attribute: 'data-bar',
      default: '',
      type: {
        parse (str): number { return parseInt(str) },
        stringify (value): string { return value.toString() }
      }
    }
  },

  init (ctx): void {
    console.log('hi')
    console.log(ctx.props.bar)
  }
}
