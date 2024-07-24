import type { RelationType } from './RelationType'

export interface Relation {
  id1: string
  id2: string
  type: RelationType
  description?: string
}
