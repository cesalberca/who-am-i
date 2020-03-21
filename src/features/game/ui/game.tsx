import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { Container } from '../../../container'
import { Player } from '../domain/player'
import { tap } from 'rxjs/operators'
import { Page } from '../../../core/components/page'
import { LobbyState } from './lobby-state'

export const Game: React.FC = () => {
  const {
    state: { playerName }
  } = useLocation<LobbyState>()
  const { id } = useParams()
  const container = useContext(Container)
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    const subscription = container.getPlayersQry
      .execute({ id: id!, name: playerName })
      .pipe(
        tap(x => {
          setPlayers(x)
        })
      )
      .subscribe()

    return () => subscription.unsubscribe()
  }, [id])

  return (
    <Page>
      {players.map(player => (
        <p key={player.name}>
          {player.name} - {player.celebrity}
        </p>
      ))}
    </Page>
  )
}
