import React from 'react'
import './App.css'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Game } from './game'
import { Lobby } from './lobby'
import { Container } from '../../../container'
import { dependencyTree } from '../../../dependency-tree'

export const App: React.FC = () => {
  return (
    <Container.Provider value={dependencyTree}>
      <BrowserRouter>
        <Switch>
          <Route>
            <Lobby />
          </Route>
          <Route>
            <Game />
          </Route>
        </Switch>
      </BrowserRouter>
    </Container.Provider>
  )
}
