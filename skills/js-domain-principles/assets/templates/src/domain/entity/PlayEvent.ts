import { Entity, EntityId, Result } from "@andireuter/js-domain-principles"
import { CourtZone } from "../valueObject/CourtZone"

type PlayType = "cut" | "pick-and-roll" | "fast-break" | "turnover"

interface PlayEventProps {
  playerId: string
  playType: PlayType
  points: number
  courtZone: CourtZone
  occurredAt: Date
}

class PlayEvent extends Entity<PlayEventProps> {
  private constructor(props: PlayEventProps, id?: EntityId) {
    super(props, id)
  }

  static create(input: {
    playerId: string
    playType: PlayType
    points: number
    courtZone: CourtZone
  }): Result<PlayEvent> {
    if (!input.playerId.trim()) {
      return (Result.fail(new Error("Player id is required")))
    }

    if (!Number.isInteger(input.points) || input.points < 0 || input.points > 3) {
      return (Result.fail(new Error("Points must be an integer in range 0..3")))
    }

    if (input.playType === "turnover" && input.points !== 0) {
      return (Result.fail(new Error("Turnover events must have 0 points")))
    }

    return (Result.ok(new PlayEvent({
      playerId: input.playerId,
      playType: input.playType,
      points: input.points,
      courtZone: input.courtZone,
      occurredAt: new Date()
    })))
  }

  get playerId(): string {
    return (this.props.playerId)
  }

  get playType(): PlayType {
    return (this.props.playType)
  }

  get points(): number {
    return (this.props.points)
  }

  get courtZone(): CourtZone {
    return (this.props.courtZone)
  }
}

export { PlayEvent, type PlayType, type PlayEventProps }
