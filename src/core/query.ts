import { UseCase } from './use-case'

export interface Query<Result, Param> extends UseCase<Result, Param> {}
