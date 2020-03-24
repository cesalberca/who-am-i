import React, { useContext, useEffect, useState } from 'react'
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

const cx = bind(styles)

export const Lobby: React.FC = () => {
  const container = useContext(Container)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [celebrity, setCelebrity] = useState('')
  const [lobbyPlayers, setLobbyPlayers] = useState<Player[]>([])
  const [hasJoined, setHasJoined] = useState(false)
  const { getPlayersQry, startGameCmd } = useContext(Container)

  useEffect(() => {
    let subscription: Subscription = EMPTY.subscribe()

    if (id !== '') {
      subscription = getPlayersQry.execute({ id }).subscribe(x => setLobbyPlayers(x))
    }

    return () => subscription.unsubscribe()
  }, [id, getPlayersQry, hasJoined])

  const history = useHistory()
  return (
    <Page>
      <div className={cx('form')}>
        <h2>Join a lobby</h2>
        <Input label="Id of lobby" value={id} onChange={setId} />
        <Input label="Your name" value={name} onChange={setName} />
        <Input label="The name of the celebrity" value={celebrity} onChange={setCelebrity} />
        <Button
          onClick={() => {
            setHasJoined(!hasJoined)
            container.joinGameCmd.execute({ id, player: { name, celebrity } }).toPromise()
          }}
        >
          Join
        </Button>
      </div>
      <div>
        {lobbyPlayers.map(player => (
          <p key={player.name}>{player.name}</p>
        ))}
        {hasJoined && (
          <Button
            onClick={() => {
              startGameCmd
                .execute({ id })
                .pipe(tap(() => history.push(`/games/${id}`, { playerName: name } as LobbyState)))
                .toPromise()
            }}
          >
            Start game
          </Button>
        )}
      </div>
    </Page>
  )
}
