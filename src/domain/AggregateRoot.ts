import { Entity, type EntityProps } from "./Entity"

import { EntityId } from "./EntityId"

abstract class AggregateRoot<T extends EntityProps> extends Entity<T> {
  get id(): EntityId {
    return (this._id)
  }
}

export { AggregateRoot }
