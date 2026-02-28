import {
  EntityId,
  Result,
  type UseCase,
  ValidationDecorator
} from "@andireuter/js-domain-principles"
import { type RegisterPlayDTO } from "../dto/RegisterPlayDTO"
import { RegisterPlayValidator } from "../validator/RegisterPlayValidator"
import { Possession } from "../../domain/aggregate/Possession"
import { CourtZone } from "../../domain/valueObject/CourtZone"
import { ShotClock } from "../../domain/valueObject/ShotClock"
import { PlayEvent } from "../../domain/entity/PlayEvent"
import { type IPossessionRepository } from "../../domain/repository/IPossessionRepository"

class RegisterPlayUseCase implements UseCase<Possession> {
  private readonly validation = new ValidationDecorator<RegisterPlayDTO>()
    .add(new RegisterPlayValidator())

  constructor(private readonly repository: IPossessionRepository) { }

  async execute(dto: RegisterPlayDTO): Promise<Result<Possession>> {
    const validationResult = this.validation.validate(dto)
    if (validationResult.isFailure) {
      return (Result.fail(validationResult.error ?? new Error("Invalid play payload")))
    }

    try {
      const possessionId = new EntityId(dto.possessionId)
      const currentPossession = await this.repository.findById(possessionId)

      const shotClockResult = ShotClock.create(dto.shotClockSeconds)
      if (shotClockResult.isFailure || shotClockResult.value === undefined) {
        return (Result.fail(shotClockResult.error ?? new Error("Invalid shot clock value")))
      }

      const possession = currentPossession ?? new Possession({
        teamId: dto.teamId,
        quarter: dto.quarter,
        shotClock: shotClockResult.value,
        events: [],
        isClosed: false
      }, possessionId)

      const zoneResult = CourtZone.create(dto.courtZone)
      if (zoneResult.isFailure || zoneResult.value === undefined) {
        return (Result.fail(zoneResult.error ?? new Error("Invalid court zone value")))
      }

      const playEventResult = PlayEvent.create({
        playerId: dto.playerId,
        playType: dto.playType,
        points: dto.points,
        courtZone: zoneResult.value
      })
      if (playEventResult.isFailure || playEventResult.value === undefined) {
        return (Result.fail(playEventResult.error ?? new Error("Invalid play event")))
      }

      const updateClockResult = possession.updateShotClock(shotClockResult.value)
      if (updateClockResult.isFailure) {
        return (Result.fail(updateClockResult.error ?? new Error("Could not update shot clock")))
      }

      const registerEventResult = possession.registerEvent(playEventResult.value)
      if (registerEventResult.isFailure) {
        return (Result.fail(registerEventResult.error ?? new Error("Could not register play event")))
      }

      await this.repository.save(possession)
      return (Result.ok(possession))
    } catch (error: unknown) {
      return (Result.fail(error as Error))
    }
  }
}

export { RegisterPlayUseCase }
