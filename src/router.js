import Vue from 'vue'
import Router from 'vue-router'
import ListEvent from './views/ListEvent.vue'
import ShowEvent from './views/ShowEvent.vue'
import CreateEvent from './views/CreateEvent.vue'
import Nprogress from 'nprogress'
import store from '@/store/store'
import NotFound from './views/NotFound.vue'
import NetworkIssue from './views/NetworkIssue.vue'
import Example from '@/views/Example.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'list-event',
      component: ListEvent,
      props: true //because we’ll be setting our currentPage as a parameter to pass in as a prop
    },
    {
      path: '/event/:id',
      name: 'show-event',
      component: ShowEvent,
      props: true, // Set params to props
      beforeEnter(routeTo, routeFrom, next) {
        // before this route is loaded - it is a kind of (Per-Route)
        store
          .dispatch('event/feachEvent', routeTo.params.id)
          .then(event => {
            routeTo.params.event = event // <--- Set the event we retrieved the event2 gets sent in as the event prop
            next()
          })
          .catch(error => {
            if (error.response && error.response.status == 404) {
              next({ name: '404', params: { resource: 'event' } })
            } else {
              next({ name: 'network-issue' })
            }
          })
      }
    },
    {
      path: '/create',
      name: 'create-event',
      component: CreateEvent
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
    },
    {
      // Here's the new catch all route
      path: '*',
      redirect: { name: '404', params: { resource: 'event' } }
    },
    {
      path: '/example',
      component: Example
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  //  Start the route progress bar.
  Nprogress.start()
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  Nprogress.done()
})

export default router
