import { EntityId } from "@andireuter/js-domain-principles"
import { Possession } from "../../domain/aggregate/Possession"
import { type IPossessionRepository } from "../../domain/repository/IPossessionRepository"

class InMemoryPossessionRepository implements IPossessionRepository {
  private readonly data = new Map<string, Possession>()

  async findById(id: EntityId): Promise<Possession | null> {
    return (this.data.get(id.toString) ?? null)
  }

  async save(possession: Possession): Promise<void> {
    this.data.set(possession.id.toString, possession)
  }
}

export { InMemoryPossessionRepository }
