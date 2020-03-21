import { Id } from './id'
import { Observable } from 'rxjs'

export interface GameRepository {
  join(id: Id): Observable<void>
}
