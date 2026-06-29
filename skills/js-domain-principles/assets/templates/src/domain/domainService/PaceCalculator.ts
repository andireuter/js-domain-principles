import { type DomainService } from "@andireuter/js-domain-principles"

interface PaceCalculator extends DomainService {
  estimate(events: number, minutes: number): number
}

export type { PaceCalculator }
