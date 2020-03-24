import { Command } from '../../../core/command'
import { Id } from '../../../core/id'
import { GameRepository } from '../domain/game-repository'
import { Observable } from 'rxjs'

interface Params {
  id: Id
}

export class StartGameCmd implements Command<Params> {
  constructor(private readonly gameRepository: GameRepository) {}

  execute({ id }: Params): Observable<void> {
    return this.gameRepository.start(id)
  }
}
