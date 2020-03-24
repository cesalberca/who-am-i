import { Query } from '../../../core/query'
import { Observable } from 'rxjs'
import { GameRepository } from '../domain/game-repository'
import { Id } from '../../../core/id'
import { map } from 'rxjs/operators'

type Params = { id: Id; name: string }

export class GetPlayerAssigneesQry implements Query<Record<string, string>, Params> {
  constructor(private readonly gameRepository: GameRepository) {}

  execute({ id, name }: Params): Observable<Record<string, string>> {
    return this.gameRepository.find(id).pipe(
      map(x => x?.assignees ?? []),
      map(x => {
        const entries = Object.entries(x).map(([playerName, celebrity]) => [
          playerName,
          playerName === name ? '***********' : celebrity
        ])
        return Object.fromEntries(entries)
      })
    )
  }
}
