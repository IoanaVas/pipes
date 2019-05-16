import React from 'react'
import styled from 'styled-components'
import { Region } from 'frint-react'
import { Space } from '@ivoryio/kogaio'

const Auth = () => (
  <Space my='auto'>
    <AuthScreen name='auth' />
  </Space>
)

const AuthScreen = styled(Region)`
  width: 100%;
`

export default Auth
