import { AggregateRoot, EntityProps } from "../domain"

interface Mapper<T extends AggregateRoot<EntityProps>> { } // eslint-disable-line

export type { Mapper }
