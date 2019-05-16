import React, { useContext, useEffect } from 'react'
import { Context } from '../services/Provider'
import Typography from '@ivoryio/kogaio/Typography'
import { Flex, Space } from '@ivoryio/kogaio/Responsive'
import ActivityIndicator from '@ivoryio/kogaio/ActivityIndicator'

const Hello = () => {
  const { greeting, fetchGreeting, user = {} } = useContext(Context)
  useEffect(() => {
    fetchGreeting()
  }, [fetchGreeting])

  const { message, isFetching } = greeting
  const { name, family_name: lastName } = user
  const msg = message
    ? `${message}, ${name} ${lastName}!`
    : 'Hi! Please deploy the hello pod microservice by running ivory deploy'

  return (
    <Space py={4}>
      <Flex alignItems='center' justifyContent='center'>
        {isFetching ? (
          <ActivityIndicator
            alignSelf='center'
            colors={{ background: 'white', primary: 'gunmetal' }}
            size='3em'
          />
        ) : (
          <Typography textAlign='center' variant='h3'>
            {msg}
          </Typography>
        )}
      </Flex>
    </Space>
  )
}

export default Hello
