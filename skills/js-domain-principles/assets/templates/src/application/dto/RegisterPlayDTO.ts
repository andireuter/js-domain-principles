import { type PlayType } from "../../domain/entity/PlayEvent"

interface RegisterPlayDTO {
  possessionId: string
  teamId: string
  quarter: number
  playerId: string
  playType: PlayType
  points: number
  courtZone: string
  shotClockSeconds: number
}

export type { RegisterPlayDTO }
