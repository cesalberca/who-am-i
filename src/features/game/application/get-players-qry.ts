import { Query } from '../../../core/query'
import { Player } from '../../../core/player'
import { Observable } from 'rxjs'
import { GameRepository } from '../domain/game-repository'
import { Id } from '../../../core/id'
import { map } from 'rxjs/operators'

type Params = { id: Id }

export class GetPlayersQry implements Query<Player[], Params> {
  constructor(private readonly gameRepository: GameRepository) {}

  execute({ id }: Params): Observable<Player[]> {
    return this.gameRepository.find(id).pipe(map(x => x?.players ?? []))
  }
}
