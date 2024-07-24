import { v4 as uuidv4 } from 'uuid'
import type { Person } from './Person'
import type { Relation } from './Relation'
import type { PersonalData } from './PersonalData'
import type { RelationType } from './RelationType'

export class AppState {
  public persons: Person[] = []
  public relations: Relation[] = []

  addPerson(personalData: PersonalData) {
    const person: Person = {
      id: uuidv4(),
      personalData
    }
    this.persons.push(person)
  }

  removePerson(person: Person) {
    this._removeItem(person, this.persons)
  }

  addRelation(id1: string, id2: string, type: RelationType, description?: string) {
    const relation: Relation = {
      id1,
      id2,
      type,
      description
    }
    this.relations.push(relation)
  }

  removeRelation(relation: Relation) {
    this._removeItem(relation, this.relations)
  }

  private _removeItem<T>(item: T, array: T[]) {
    const index = array.indexOf(item)
    if (index > -1) {
      array.splice(index, 1)
    }
  }
}
