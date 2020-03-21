import { Query } from '../../../core/query'
import { Player } from '../domain/player'
import { Observable } from 'rxjs'
import { GameRepository } from '../domain/game-repository'
import { Id } from '../domain/id'
import { map } from 'rxjs/operators'

type Params = { id: Id; name: string }

export interface RandomProvider {
  provide(): number
}

export class Assigner {
  constructor(private readonly randomProvider: RandomProvider) {}

  assign(players: Player[]): Record<string, string> {
    const assignments: Record<string, string> = {}
    const randomizedNames = this.randomizeArray(players)

    for (let [index, name] of randomizedNames.entries()) {
      const nextIndex = index + 1
      const assignee = nextIndex === randomizedNames.length ? 0 : nextIndex
      assignments[name.name] = randomizedNames[assignee].celebrity
    }

    return assignments
  }

  private randomizeArray<T>(array: T[]) {
    const randomizedArray = array.slice()
    for (let i = randomizedArray.length - 1; i > 0; i--) {
      const j = Math.floor(this.randomProvider.provide() * (i + 1))
      ;[randomizedArray[i], randomizedArray[j]] = [randomizedArray[j], randomizedArray[i]]
    }
    return randomizedArray
  }
}

export class GetPlayersQry implements Query<Record<string, string>, Params> {
  constructor(private readonly gameRepository: GameRepository) {}

  execute({ id, name }: Params): Observable<Record<string, string>> {
    return this.gameRepository.find(id).pipe(
      map(x => x?.players ?? []),
      map(x => {
        const assigner = new Assigner({
          provide(): number {
            return Math.random()
          }
        })
        return assigner.assign(x)
      }),
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
