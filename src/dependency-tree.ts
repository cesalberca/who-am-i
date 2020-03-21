import { Dependencies } from './dependencies'
import { GameFirestoreRepository } from './features/game/infrastructure/game-firestore-repository'
import * as rxFire from 'rxfire/firestore'
import { app } from './features/game/infrastructure/firestore'

export const dependencyTree: Dependencies = {
  gameRepository: new GameFirestoreRepository(app, rxFire)
}
