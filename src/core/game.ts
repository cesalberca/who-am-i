import { Player } from './player'
import { Id } from './id'

export interface Game {
  id: Id
  start?: Date
  end?: Date
  assignees: Player[]
  players: Player[]
}
