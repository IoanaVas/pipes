import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { map } from 'rxjs/operators'
import { observe } from 'frint-react'

import { isResponseOk } from './helpers'
import api from '../services/hello.dataservice'

export const Context = createContext({})
const Provider = ({ children, theme, regionData: { user } }) => {
  const [greeting, setGreeting] = useState({
    message: 'Hello',
    isFetching: true,
    error: null
  })

  const fetchGreeting = async () => {
    try {
      const response = await api.getGreetingMessage()
      const {
        status,
        data: { message }
      } = response
      if (isResponseOk(status)) {
        return setGreeting({
          ...greeting,
          message,
          isFetching: false
        })
      }
      setGreeting({
        ...greeting,
        isFetching: false,
        error: '* Error caught when fetching greeting'
      })
    } catch (err) {
      console.error("* Error caught in Provider's fetchGreeting", err)
      setGreeting({
        ...greeting,
        message: 'Hello',
        isFetching: false,
        error: err
      })
    }
  }
  return (
    <Context.Provider
      value={{
        greeting,
        fetchGreeting,
        theme,
        user: user.attributes
      }}
    >
      {children}
    </Context.Provider>
  )
}

const ObservedProvider = observe((app, props$) => {
  const region = app.get('region')
  const regionData$ = region
    .getData$()
    .pipe(map(regionData => ({ regionData })))
  return regionData$
})(Provider)

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  theme: PropTypes.object,
  regionData: PropTypes.object
}

export default ObservedProvider
