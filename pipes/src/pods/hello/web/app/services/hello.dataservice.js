import { API } from 'aws-amplify'

const getGreetingMessage = () =>
  API.get('hello', '/message', {
    response: true
  })

export default {
  getGreetingMessage
}
