import { EntityId, type Mapper } from "@andireuter/js-domain-principles"
import { Possession } from "../../domain/aggregate/Possession"
import { CourtZone } from "../../domain/valueObject/CourtZone"
import { PlayEvent } from "../../domain/entity/PlayEvent"
import { ShotClock } from "../../domain/valueObject/ShotClock"

interface PlayEventPersistenceDTO {
  playerId: string
  playType: "cut" | "pick-and-roll" | "fast-break" | "turnover"
  points: number
  courtZone: string
}

interface PossessionPersistenceDTO {
  id: string
  teamId: string
  quarter: number
  shotClockSeconds: number
  isClosed: boolean
  events: PlayEventPersistenceDTO[]
}

class PossessionMapper implements Mapper<Possession> {
  static toPersistence(domain: Possession): PossessionPersistenceDTO {
    return ({
      id: domain.id.toString,
      teamId: domain.teamId,
      quarter: domain.quarter,
      shotClockSeconds: domain.shotClock.seconds,
      isClosed: domain.isClosed,
      events: domain.events.map(event => ({
        playerId: event.playerId,
        playType: event.playType,
        points: event.points,
        courtZone: event.courtZone.value
      }))
    })
  }

  static toDomain(dto: PossessionPersistenceDTO): Possession {
    const shotClock = ShotClock.create(dto.shotClockSeconds)
    if (shotClock.isFailure || shotClock.value === undefined) {
      throw new Error("Invalid shot clock from persistence")
    }

    const events = dto.events.map(eventDto => {
      const zone = CourtZone.create(eventDto.courtZone)
      if (zone.isFailure || zone.value === undefined) {
        throw new Error("Invalid court zone from persistence")
      }

      const event = PlayEvent.create({
        playerId: eventDto.playerId,
        playType: eventDto.playType,
        points: eventDto.points,
        courtZone: zone.value
      })
      if (event.isFailure || event.value === undefined) {
        throw new Error("Invalid play event from persistence")
      }
      return (event.value)
    })

    return (new Possession({
      teamId: dto.teamId,
      quarter: dto.quarter,
      shotClock: shotClock.value,
      events,
      isClosed: dto.isClosed
    }, new EntityId(dto.id)))
  }
}

export { PossessionMapper, type PossessionPersistenceDTO, type PlayEventPersistenceDTO }
