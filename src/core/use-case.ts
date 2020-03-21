import { Observable } from 'rxjs'

export interface UseCase<Result, Param> {
  execute(param: Param): Observable<Result>
}
