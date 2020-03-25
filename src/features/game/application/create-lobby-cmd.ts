import { Command } from '../../../core/command'
import { GameRepository } from '../domain/game-repository'
import { Observable } from 'rxjs'
import { Player } from '../../../core/player'
import { Id } from '../../../core/id'

interface Params {
  player: Player
}

export class CreateLobbyCmd implements Command<Params, Id> {
  constructor(private readonly gameRepository: GameRepository) {}

  execute(): Observable<Id> {
    return this.gameRepository.create()
  }
}
