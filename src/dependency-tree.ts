import { Dependencies } from './dependencies'
import { GameFirestoreRepository } from './features/game/infrastructure/game-firestore-repository'
import firebase from 'firebase'
import rxFire from 'rxfire/firestore'

export const dependencyTree: Dependencies = {
  gameRepository: new GameFirestoreRepository(firebase, rxFire)
}
