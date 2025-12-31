import { Result } from "../domain"

interface IValidator<T> {
  validate(value: T): Result<T>
}

export type { IValidator }
