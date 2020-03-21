import { Player } from './player'
import { Id } from './id'

export interface Game {
  id: Id
  players: Player[]
}
