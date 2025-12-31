import {
  AggregateRoot, EntityProps, Result
} from "../domain"

interface UseCase<T extends AggregateRoot<EntityProps>> {
  execute(dto?: object): Promise<Result<T>> | Result<T>
}

export type { UseCase }
