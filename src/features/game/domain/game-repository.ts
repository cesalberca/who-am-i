import { Id } from './id'
import { Observable } from 'rxjs'
import { Player } from './player'
import { Game } from './game'

export interface GameRepository {
  join(id: Id, player: Player): Observable<void>
  find(id: Id): Observable<Game | undefined>
}
