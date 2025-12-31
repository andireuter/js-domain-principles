import { AggregateRoot } from "./AggregateRoot"
import { type EntityProps } from "./Entity"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars
interface IRepository<T extends AggregateRoot<EntityProps>> { }

export type { IRepository }
