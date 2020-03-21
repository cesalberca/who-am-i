import { Id } from './id'
import { Observable } from 'rxjs'
import { Player } from './player'

export interface GameRepository {
  join(id: Id, player: Player): Observable<void>
}
