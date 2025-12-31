import { IValidator } from "./IValidator"
import { Result } from "../domain"

interface IValidationDecorator<T> {
  add(validator: IValidator<T>): this
  validate(value: T): Result<T>
}

export type { IValidationDecorator }
