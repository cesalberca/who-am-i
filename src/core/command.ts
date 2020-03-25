import { UseCase } from './use-case'

export interface Command<Param, Result = void> extends UseCase<Result, Param> {}
