import { RegisterPlayUseCase } from "../../src/application/useCase/RegisterPlayUseCase"
import { InMemoryPossessionRepository } from "../../src/infrastructure/persistence/InMemoryPossessionRepository"

test("registers a fast-break score in a possession", async () => {
  const repository = new InMemoryPossessionRepository()
  const useCase = new RegisterPlayUseCase(repository)

  const result = await useCase.execute({
    possessionId: "possession-7",
    teamId: "team-home",
    quarter: 2,
    playerId: "guard-11",
    playType: "fast-break",
    points: 2,
    courtZone: "paint",
    shotClockSeconds: 8
  })

  expect(result.isSuccess).toBe(true)
  expect(result.value?.events).toHaveLength(1)
  expect(result.value?.totalPoints).toBe(2)
})

test("rejects invalid shot-clock values", async () => {
  const repository = new InMemoryPossessionRepository()
  const useCase = new RegisterPlayUseCase(repository)

  const result = await useCase.execute({
    possessionId: "possession-8",
    teamId: "team-away",
    quarter: 4,
    playerId: "forward-22",
    playType: "pick-and-roll",
    points: 2,
    courtZone: "midrange",
    shotClockSeconds: 30
  })

  expect(result.isFailure).toBe(true)
  expect(result.error?.message).toContain("shot clock")
})
