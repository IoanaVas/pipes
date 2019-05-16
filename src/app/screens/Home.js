import React from 'react'
import PropTypes from 'prop-types'
import { Region } from 'frint-react'
import { Flex } from '@ivoryio/kogaio'

const Home = ({ user }) => (
  <Flex flexDirection='column'>
    <Region name='hello' data={{ user }} />
  </Flex>
)

Home.propTypes = {
  user: PropTypes.object
}

export default Home
