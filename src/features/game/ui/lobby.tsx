import React, { useContext, useState } from 'react'
import { Page } from '../../../core/components/page'
import { Button } from '../../../core/components/button'
import { Container } from '../../../container'
import { Input } from '../../../core/components/input'
import { tap } from 'rxjs/operators'
import { useHistory } from 'react-router'

export const Lobby: React.FC = () => {
  const container = useContext(Container)
  const [id, setId] = useState('')
  const history = useHistory()
  return (
    <Page>
      <div>
        <h2>Join a lobby</h2>
        <Input label="Id of lobby" value={id} onChange={setId} />
        <Button
          onClick={() =>
            container.gameRepository
              .join(id)
              .pipe(tap(() => history.push(`/games/${id}`)))
              .toPromise()
          }
        >
          Join
        </Button>
      </div>
    </Page>
  )
}
