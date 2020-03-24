import { Query } from '../../../core/query'
import { Observable } from 'rxjs'
import { GameRepository } from '../domain/game-repository'
import { Id } from '../../../core/id'
import { map } from 'rxjs/operators'

type Params = { id: Id }

export class HasGameStartedQry implements Query<boolean, Params> {
  constructor(private readonly gameRepository: GameRepository) {}

  execute({ id }: Params): Observable<boolean> {
    return this.gameRepository.find(id).pipe(map(x => x?.start !== undefined ?? false))
  }
}
