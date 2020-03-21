import { GameRepository } from '../domain/game-repository'
import { Id } from '../domain/id'
import { RxFire } from './rx-fire'
import { Observable, of } from 'rxjs'
import { switchMapTo } from 'rxjs/operators'

export class GameFirestoreRepository implements GameRepository {
  constructor(private readonly firestore: firebase.app.App, private readonly rxFire: RxFire) {}

  private gamesRef = this.firestore.firestore().collection('games')

  join(id: Id): Observable<void> {
    return this.rxFire.collectionData(this.gamesRef, id).pipe(switchMapTo(of(undefined)))
  }
}
