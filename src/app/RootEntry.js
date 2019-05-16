import React, { useState, useEffect } from 'react'
import { Flex } from '@ivoryio/kogaio'
import styled, { css } from 'styled-components'

import fsm from './services/StateMachine'
import { Header } from './components'
import { Auth, Home } from './screens'
import useWindowSize from './services/useWindowSize'

const RootEntry = () => {
  const { innerWidth, innerHeight } = useWindowSize()
  const [currentState, setCurrentState] = useState({
    name: fsm.state,
    payload: fsm.data
  })

  useEffect(() => {
    fsm.listen().subscribe({
      next: newState => _handleStateUpdated(newState),
      error: err => console.error('* Error caught in fsm listener', err),
      complete: () => console.warn(' * fsm is done listening')
    })
  }, [])

  const _handleStateUpdated = ({ currentState, payload }) =>
    setCurrentState({ name: currentState, payload })

  const CurrentScreen = (() => {
    const {
      payload: { user },
      name: stateName
    } = currentState
    switch (stateName) {
      case 'guest':
        return <Auth />
      case 'landing':
        return <Home user={user} />
      default:
        return <div>Oops!</div>
    }
  })()
  const {
    payload: { user },
    name: stateName
  } = currentState
  return (
    <Flex flexDirection='column'>
      <Header user={user} />
      <Body
        flexDirection='column'
        height={innerHeight}
        appState={stateName}
        width={innerWidth}
      >
        {CurrentScreen}
      </Body>
    </Flex>
  )
}

const screenSize = css`
  ${({ appState, height, width }) =>
    appState === 'guest'
      ? `width: ${width}px; height: ${height}px;`
      : `width: 100%; height: 100%;`}}
`

const Body = styled(Flex)`
  ${screenSize}
`

export default RootEntry
