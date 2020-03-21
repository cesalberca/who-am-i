import { JoinGameCmd } from './features/game/application/join-game-cmd'
import { GetPlayersQry } from "./features/game/application/get-players-qry";

export interface Dependencies {
  joinGameCmd: JoinGameCmd,
  getPlayersQry: GetPlayersQry
}
