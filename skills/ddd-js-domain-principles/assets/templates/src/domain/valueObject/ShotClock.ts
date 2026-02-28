import { Result, ValueObject } from "@andireuter/js-domain-principles"

interface ShotClockProps {
  seconds: number
}

class ShotClock extends ValueObject<ShotClockProps> {
  private constructor(props: ShotClockProps) {
    super(props)
  }

  static create(seconds: number): Result<ShotClock> {
    if (!Number.isInteger(seconds)) {
      return (Result.fail(new Error("Shot clock must be an integer value")))
    }

    if (seconds < 0 || seconds > 24) {
      return (Result.fail(new Error("Shot clock must be in range 0..24")))
    }

    return (Result.ok(new ShotClock({ seconds })))
  }

  get seconds(): number {
    return (this.props.seconds)
  }
}

export { ShotClock, type ShotClockProps }
