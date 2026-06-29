import { AggregateRoot, EntityId, Result } from "@andireuter/js-domain-principles"
import { PlayEvent } from "../entity/PlayEvent"
import { ShotClock } from "../valueObject/ShotClock"

interface PossessionProps {
  teamId: string
  quarter: number
  shotClock: ShotClock
  events: PlayEvent[]
  isClosed: boolean
}

class Possession extends AggregateRoot<PossessionProps> {
  constructor(props: PossessionProps, id?: EntityId) {
    super(props, id)
  }

  updateShotClock(shotClock: ShotClock): Result<Possession> {
    if (this.props.isClosed) {
      return (Result.fail(new Error("Cannot change shot clock after possession closed")))
    }

    this.props.shotClock = shotClock
    return (Result.ok(this))
  }

  registerEvent(event: PlayEvent): Result<Possession> {
    if (this.props.isClosed) {
      return (Result.fail(new Error("Cannot register events for closed possession")))
    }

    if (this.props.shotClock.seconds === 0) {
      return (Result.fail(new Error("Cannot register event with shot clock at 0")))
    }

    this.props.events.push(event)
    return (Result.ok(this))
  }

  closePossession(): Result<Possession> {
    if (this.props.events.length === 0) {
      return (Result.fail(new Error("Cannot close possession without any play event")))
    }

    this.props.isClosed = true
    return (Result.ok(this))
  }

  get teamId(): string {
    return (this.props.teamId)
  }

  get quarter(): number {
    return (this.props.quarter)
  }

  get events(): PlayEvent[] {
    return (this.props.events)
  }

  get shotClock(): ShotClock {
    return (this.props.shotClock)
  }

  get isClosed(): boolean {
    return (this.props.isClosed)
  }

  get totalPoints(): number {
    return (this.props.events.reduce((total, event) => total + event.points, 0))
  }
}

export { Possession, type PossessionProps }
