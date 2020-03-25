import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Page } from '../../../core/components/page'
import { Button } from '../../../core/components/button'
import { Container } from '../../../container'
import { Input } from '../../../core/components/input'
import { useHistory } from 'react-router'
import { bind } from '../../../core/utils/bind'
import styles from './lobby.module.css'
import { Player } from '../../../core/player'
import { tap } from 'rxjs/operators'
import { LobbyState } from './lobby-state'
import { EMPTY, Subscription } from 'rxjs'
import { reducer } from './lobby-reducer'

const cx = bind(styles)

export const Lobby: React.FC = () => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [celebrity, setCelebrity] = useState('')
  const [lobbyPlayers, setLobbyPlayers] = useState<Player[]>([])
  const {
    getPlayersQry,
    startGameCmd,
    joinLobbyCmd,
    hasGameStartedQry,
    createLobbyCmd
  } = useContext(Container)
  const history = useHistory()

  const [state, dispatch] = useReducer(reducer, {
    status: 'initial',
    name: '',
    celebrity: '',
    id: ''
  })

  useEffect(() => {
    if (state.status === 'created') {
      createLobbyCmd
        .execute()
        .toPromise()
        .then(x => {
          dispatch({ type: 'join', id: x, celebrity: state.celebrity, name: state.name })
        })
    }
  }, [state.name, state.celebrity, state.status, createLobbyCmd])

  useEffect(() => {
    let subscription: Subscription = EMPTY.subscribe()
    if (state.status === 'joined' || state.status === 'started') {
      subscription = hasGameStartedQry
        .execute({ id: state.id })
        .pipe(
          tap(hasGameStarted => {
            if (hasGameStarted) {
              history.push(`/games/${state.id}`, { playerName: state.name } as LobbyState)
            }
          })
        )
        .subscribe()
    }
    return () => subscription.unsubscribe()
  }, [hasGameStartedQry, state.id, state.name, history, state.status])

  useEffect(() => {
    if (state.status === 'started') {
      startGameCmd.execute({ id: state.id }).toPromise()
    }
  }, [startGameCmd, state.id, state.name, state.status])

  useEffect(() => {
    let subscription: Subscription = EMPTY.subscribe()

    if (state.status === 'joined') {
      joinLobbyCmd
        .execute({ id: state.id, player: { name: state.name, celebrity: state.celebrity } })
        .toPromise()
      subscription = getPlayersQry.execute({ id: state.id }).subscribe(x => setLobbyPlayers(x))
    }

    return () => subscription.unsubscribe()
  }, [state.id, state.status, state.name, state.celebrity, getPlayersQry, joinLobbyCmd])

  return (
    <Page>
      {state.status === 'initial' && (
        <section>
          <div className={cx('form')}>
            <h2>Play</h2>
            <Input label="Your name" value={name} onChange={setName} />
            <Input label="The name of the celebrity" value={celebrity} onChange={setCelebrity} />
            <footer className={cx('footer')}>
              <div className={cx('group')}>
                <Input label="Id of lobby" value={id} onChange={setId} />
                <Button
                  onClick={() => {
                    dispatch({ type: 'join', name, celebrity, id })
                  }}
                >
                  Join existing lobby
                </Button>
              </div>
              <div className={cx('group')}>
                <Button
                  onClick={() => {
                    dispatch({ type: 'create', name, celebrity })
                  }}
                >
                  Create lobby
                </Button>
              </div>
            </footer>
          </div>
        </section>
      )}
      {state.status === 'joined' && (
        <div>
          <h2>Lobby Id {state.id}</h2>
          {lobbyPlayers.map(player => (
            <p key={player.name}>{player.name}</p>
          ))}
          <Button
            onClick={() => {
              dispatch({ type: 'start' })
            }}
          >
            Start game
          </Button>
        </div>
      )}
    </Page>
  )
}
