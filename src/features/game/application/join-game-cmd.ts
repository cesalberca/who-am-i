import { Command } from '../../../core/command'
import { Id } from '../domain/id'
import { GameRepository } from '../domain/game-repository'
import { Observable } from "rxjs";

export class JoinGameCmd implements Command<Id> {
  constructor(private readonly gameRepository: GameRepository) {}

  execute(id: Id): Observable<void> {
    return this.gameRepository.join(id)
  }
}
