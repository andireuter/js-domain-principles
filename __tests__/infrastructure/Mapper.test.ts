// eslint-disable-next-line jest/no-mocks-import
import { RankingList, Score } from "../../__mocks__"

import { type Mapper } from "../../src"

interface RankingListDTO {
  score: number
}

class RankingListMapper implements Mapper<RankingList> {
  static toDomain(dto: RankingListDTO): RankingList {
    return (
      new RankingList({ allScores: [new Score({ score: dto.score })] })
    )
  }
}

test("maps a dto to an aggregate root", async () => {
  const rankingList = RankingListMapper.toDomain({ score: 28 })

  expect(rankingList).toBeInstanceOf(RankingList)
  expect(rankingList.allScores).toHaveLength(1)
})
