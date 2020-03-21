import { Query } from '../../../core/query'
import { Player } from '../domain/player'
import { Observable } from 'rxjs'
import { GameRepository } from '../domain/game-repository'
import { Id } from '../domain/id'
import { map } from 'rxjs/operators'

type Params = { id: Id; name: string }

export class GetPlayersQry implements Query<Player[], Params> {
  constructor(private readonly gameRepository: GameRepository) {}

  execute({ id, name }: Params): Observable<Player[]> {
    return this.gameRepository.find(id).pipe(
      map(x => {
        return (x?.players ?? []).map(y => {
          return {
            celebrity: y.name === name ? '*********' : y.celebrity,
            name: y.name
          }
        })
      })
    )
  }
}
