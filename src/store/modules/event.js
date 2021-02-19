import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  eventTotal: 0,
  events: [],
  event: {},
  perPage: 3
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, event) {
    state.events = event
  },
  SET_EVENTS_TOTAL(state, eventTotal) {
    state.eventTotal = eventTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}
export const actions = {
  createEvent({ commit, rootState, dispatch }, event) {
    console.log('User creating Event is: ' + rootState.user.user.name)
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'SUCCESS',
          message: 'Your event has been created!'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem in creating events' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error //because we can avoid to redirect in show-event page when error occure(avoid to all of code to done)
      })
  },
  feachEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then(response => {
        commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem in feaching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  feachEvent({ commit, getters }, id) {
    // This (getters) is for avoid We’re Loading Data Twice
    // Send in the getters
    var event = getters.getEvenById(id) // See if we already have this event

    if (event) {
      // If we do, set the event
      commit('SET_EVENT', event)
      return event
    } else {
      // If not, get it with the API. we go ahead and get that single event from the API
      return EventService.getEvent(id).then(ress => {
        commit('SET_EVENT', ress.data)
        return ress.data
      })
    }
  }
}
export const getters = {
  // now we can use catlength(getters) any where in your application
  // catlength: state => state.categories.length,
  // doneTodos: state => {
  //   return state.todos.filter(todo => todos.done)
  // },
  // activeTodosCount: state => {
  //   return state.todos.filter(todo => !todos.done).length
  // },
  getEvenById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
