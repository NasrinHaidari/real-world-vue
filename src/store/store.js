import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/event.js'
import * as notification from '@/store/modules/notification.js'
// This {*} pulls in all the constants in user.js

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, // Include this module
    event,
    notification
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    todos: [
      //Passing getters to Getters
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ]
    // events: [
    //   // Dynamic Getters
    //   { id: 1, title: '...', organizer: '...' },
    //   { id: 2, title: '...', organizer: '...' },
    //   { id: 3, title: '...', organizer: '...' },
    //   { id: 4, title: '...', organizer: '...' }
    // ]
  }
})
