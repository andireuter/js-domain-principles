import { EntityId } from "./EntityId"

interface EntityProps {
  [key: string]: unknown
}

abstract class Entity<T extends EntityProps> {
  protected readonly _id: EntityId
  readonly props: T

  constructor(props: T, id?: EntityId) {
    this._id = id ? id : new EntityId()
    this.props = props
  }

  isEntity = (object: unknown): object is Entity<T> => {
    return (object instanceof Entity)
  }

  equals(entity?: Entity<T>): boolean {
    if (entity == null || entity == undefined) {
      return (false)
    }

    if (this === entity) {
      return (true)
    }

    if (!this.isEntity(entity)) {
      return (false)
    }

    return (true)
  }
}

export { Entity, type EntityProps }
