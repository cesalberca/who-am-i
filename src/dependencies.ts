import { JoinGameCmd } from './features/game/application/join-game-cmd'
import { GetPlayersQry } from './features/game/application/get-players-qry'
import { GetPlayerAssigneesQry } from "./features/game/application/get-player-assignees-qry";
import { StartGameCmd } from "./features/game/application/start-game-cmd";

export interface Dependencies {
  joinGameCmd: JoinGameCmd
  getPlayersQry: GetPlayersQry
  getPlayerAssigneesQry: GetPlayerAssigneesQry,
  startGameCmd: StartGameCmd
}
