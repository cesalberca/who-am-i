import { GameRepository } from '../domain/game-repository'
import { Id } from '../domain/id'
import { Observable, of } from 'rxjs'
import { Player } from '../domain/player'
import { RxFire } from './rx-fire'
import { first, switchMap } from 'rxjs/operators'
import { Game } from '../domain/game'

export class GameFirestoreRepository implements GameRepository {
  constructor(private readonly firebase: firebase.app.App, private readonly rxFire: RxFire) {}

  private gamesRef = this.firebase.firestore().collection('games')

  join(id: Id, player: Player): Observable<void> {
    return this.rxFire.fromDocRef(this.gamesRef.doc(id)).pipe(
      first(),
      switchMap(document => {
        const data = document.data()
        document.ref.set({ players: [...(data?.players ?? []), player] })
        return of(undefined)
      })
    )
  }

  find(id: string): Observable<Game | undefined> {
    return this.rxFire.fromDocRef(this.gamesRef.doc(id)).pipe(switchMap(x => of(x.data() as Game)))
  }
}
