import { Id } from '../../../core/id'

type Action =
  | {
      type: 'join'
      name: string
      celebrity: string
      id: Id
    }
  | {
      type: 'initial'
    }
  | {
      type: 'start'
    }

interface State {
  status: 'joined' | 'initial' | 'started'
  name: string
  celebrity: string
  id: Id
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'join':
      return {
        ...state,
        id: action.id,
        name: action.name,
        celebrity: action.celebrity,
        status: 'joined'
      }
    case 'start':
      return {
        ...state,
        status: 'started'
      }
    case 'initial':
      return {
        ...state,
        status: 'initial'
      }
  }
}
