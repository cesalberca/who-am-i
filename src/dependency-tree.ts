import { Dependencies } from './dependencies'
import { GameFirestoreRepository } from './features/game/infrastructure/game-firestore-repository'
import * as firebase from 'firebase'
import * as rxFire from 'rxfire/firestore'

export const dependencyTree: Dependencies = {
  gameRepository: new GameFirestoreRepository(firebase, rxFire)
}
