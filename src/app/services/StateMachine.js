import { Observable } from 'rxjs'
import { Hub } from '@aws-amplify/core'
import StateMachine from 'javascript-state-machine'
import StateMachineHistory from 'javascript-state-machine/lib/history'

StateMachine.prototype.listen = function () {
  return Observable.create(function (observer) {
    Hub.listen('TransitionChannel', transitionListener)

    function transitionListener (ev) {
      const { event, data = {} } = ev.payload
      switch (event) {
        case 'reset':
          fsm.reset()
          break
        case 'signIn':
          fsm.auth(data.user)
          break
        case 'signOut':
          fsm.signOut()
          break
        default:
          break
      }
      observer.next({
        currentState: fsm.state,
        payload: { ...fsm.data, ...data }
      })
    }
  })
}

const fsm = new StateMachine({
  init: 'guest',
  data: {
    data: {
      user: {}
    }
  },
  transitions: [
    { name: 'auth', from: '*', to: 'landing' },
    { name: 'signOut', from: '*', to: 'guest' },
    { name: 'reset', from: '*', to: 'landing' },
    {
      name: 'transitionTo',
      from: '*',
      to: function (nextState) {
        if (fsm.can(nextState)) {
          return nextState
        }
      }
    },
    {
      name: 'goBack',
      from: '*',
      to: function () {
        if (fsm.canHistoryBack) {
          fsm.historyBack()
          return fsm.history.slice(-1)[0]
        }
        return fsm.state
      }
    }
  ],
  plugins: [
    new StateMachineHistory({ max: 100 }) //  <-- plugin enabled here
  ],
  methods: {
    onAuth: function (lifecycle, data) {
      this.data.user = data
    },
    onSignOut: function () {
      this.data.user = {}
      fsm.clearHistory()
    },
    onInvalidTransition: function (transition, from, to) {
      console.error(`Invalid transition ${transition} from ${from} to ${to}`)
    }
  }
})

export default fsm
