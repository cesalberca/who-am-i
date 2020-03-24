import { Command } from '../../../core/command'
import { Id } from '../../../core/id'
import { GameRepository } from '../domain/game-repository'
import { Observable } from 'rxjs'
import { Player } from '../../../core/player'

interface Params {
  id: Id
  player: Player
}

export class JoinGameCmd implements Command<Params> {
  constructor(private readonly gameRepository: GameRepository) {}

  execute({ id, player }: Params): Observable<void> {
    return this.gameRepository.join(id, player)
  }
}
