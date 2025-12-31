// eslint-disable-next-line jest/no-mocks-import
import { RankingList, Score } from "../../__mocks__"
import { Result, type UseCase } from "../../src"

interface InsertScoreDTO {
  score: number
}

class InsertScore implements UseCase<RankingList> {
  execute(dto: InsertScoreDTO): Result<RankingList> {
    return (
      Result.ok<RankingList>(
        new RankingList({ allScores: [new Score({ score: dto.score })] })
      )
    )
  }
}

test("inserts an entity into an aggregate root", async () => {
  const insertScore = new InsertScore()
  const rankingList = insertScore.execute({ score: 28 })

  expect(rankingList.isSuccess).toBe(true)
  expect(rankingList.value).toBeInstanceOf(RankingList)
  expect(rankingList.value?.allScores).toHaveLength(1)
})
