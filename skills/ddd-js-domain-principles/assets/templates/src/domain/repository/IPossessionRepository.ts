import { EntityId, type IRepository } from "@andireuter/js-domain-principles"
import { Possession } from "../aggregate/Possession"

interface IPossessionRepository extends IRepository<Possession> {
  findById(id: EntityId): Promise<Possession | null>
  save(possession: Possession): Promise<void>
}

export type { IPossessionRepository }
