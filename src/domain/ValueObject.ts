interface ValueObjectProps {
  [key: string]: unknown
}

abstract class ValueObject<T extends ValueObjectProps> {
  constructor(readonly props: T) { }

  equals(valueObject?: ValueObject<T>): boolean {
    if (valueObject == null || valueObject == undefined) {
      return (false)
    }

    if (valueObject.props === undefined) {
      return (false)
    }

    return (JSON.stringify(this.props) === JSON.stringify(valueObject.props))
  }
}

export { ValueObject, type ValueObjectProps }
