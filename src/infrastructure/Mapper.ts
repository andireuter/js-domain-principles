import {
  AggregateRoot,
  EntityProps,
  ValueObject,
  ValueObjectProps
} from "../domain"

interface Mapper<T extends AggregateRoot<EntityProps> | ValueObject<ValueObjectProps>> { } // eslint-disable-line

export type { Mapper }
