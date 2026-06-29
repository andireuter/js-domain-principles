import { Result, ValueObject } from "@andireuter/js-domain-principles"

type CourtZoneValue = "paint" | "midrange" | "corner-three" | "top-three"

interface CourtZoneProps {
  value: CourtZoneValue
}

class CourtZone extends ValueObject<CourtZoneProps> {
  private constructor(props: CourtZoneProps) {
    super(props)
  }

  static create(zone: string): Result<CourtZone> {
    const normalizedZone = zone.trim().toLowerCase()
    const allowedZones: CourtZoneValue[] = [
      "paint",
      "midrange",
      "corner-three",
      "top-three"
    ]

    if (!allowedZones.includes(normalizedZone as CourtZoneValue)) {
      return (Result.fail(new Error(`Unsupported court zone: ${zone}`)))
    }

    return (Result.ok(new CourtZone({ value: normalizedZone as CourtZoneValue })))
  }

  get value(): CourtZoneValue {
    return (this.props.value)
  }
}

export { CourtZone, type CourtZoneValue, type CourtZoneProps }
