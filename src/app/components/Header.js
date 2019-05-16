import React from 'react'
import PropTypes from 'prop-types'
import { Hub } from '@aws-amplify/core'
import { Region } from 'frint-react'

import { TopBar, Touchable, Typography } from '@ivoryio/kogaio'
import { Flex, Space } from '@ivoryio/kogaio/Responsive'

const Header = ({ user }) => {
  const hasUser = Object.keys(user).length !== 0
  const _redirectToLanding = () =>
    Hub.dispatch(
      'TransitionChannel',
      {
        event: 'reset',
        message: 'Requested escape route'
      },
      'Header'
    )
  return (
    <>
      {hasUser ? (
        <Space px={4} height='60px'>
          <TopBar bg='gunmetal'>
            <Flex alignItems='center' justifyContent='space-between' width={1}>
              <Touchable effect='opacity' onClick={_redirectToLanding}>
                <Typography
                  color='white'
                  data-testid='dashboard-title'
                  fontSize={3}
                >
                  Dashboard
                </Typography>
              </Touchable>
              <Region name='user-menu' data={{ user }} />
            </Flex>
          </TopBar>
        </Space>
      ) : null}
    </>
  )
}

Header.propTypes = {
  user: PropTypes.object
}

export default Header
