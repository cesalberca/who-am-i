import { Dependencies } from './dependencies'
import { GameFirestoreRepository } from './features/game/infrastructure/game-firestore-repository'
import * as rxFire from 'rxfire/firestore'
import { app } from './features/game/infrastructure/firestore'
import { JoinGameCmd } from './features/game/application/join-game-cmd'
import { GetPlayersQry } from './features/game/application/get-players-qry'
import { GetPlayerAssigneesQry } from './features/game/application/get-player-assignees-qry'
import { StartGameCmd } from './features/game/application/start-game-cmd'

const gameFirestoreRepository = new GameFirestoreRepository(app, rxFire)

export const dependencyTree: Dependencies = {
  joinGameCmd: new JoinGameCmd(gameFirestoreRepository),
  getPlayersQry: new GetPlayersQry(gameFirestoreRepository),
  getPlayerAssigneesQry: new GetPlayerAssigneesQry(gameFirestoreRepository),
  startGameCmd: new StartGameCmd(gameFirestoreRepository)
}
