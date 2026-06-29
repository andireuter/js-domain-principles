import { Result, type IValidator } from "@andireuter/js-domain-principles"
import { type RegisterPlayDTO } from "../dto/RegisterPlayDTO"

class RegisterPlayValidator implements IValidator<RegisterPlayDTO> {
  validate(value: RegisterPlayDTO): Result<RegisterPlayDTO> {
    if (!value.possessionId.trim()) {
      return (Result.fail(new Error("possessionId is required")))
    }

    if (!value.teamId.trim()) {
      return (Result.fail(new Error("teamId is required")))
    }

    if (!value.playerId.trim()) {
      return (Result.fail(new Error("playerId is required")))
    }

    if (!Number.isInteger(value.quarter) || value.quarter < 1 || value.quarter > 4) {
      return (Result.fail(new Error("quarter must be in range 1..4")))
    }

    if (!Number.isInteger(value.points) || value.points < 0 || value.points > 3) {
      return (Result.fail(new Error("points must be in range 0..3")))
    }

    if (!Number.isInteger(value.shotClockSeconds)) {
      return (Result.fail(new Error("shotClockSeconds must be an integer")))
    }

    return (Result.ok(value))
  }
}

export { RegisterPlayValidator }
