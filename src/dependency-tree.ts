import { Dependencies } from './dependencies'
import { GameFirestoreRepository } from './features/game/infrastructure/game-firestore-repository'
import * as rxFire from 'rxfire/firestore'
import { app } from './features/game/infrastructure/firestore'
import { JoinGameCmd } from './features/game/application/join-game-cmd'

export const dependencyTree: Dependencies = {
  joinGameCmd: new JoinGameCmd(new GameFirestoreRepository(app, rxFire))
}
