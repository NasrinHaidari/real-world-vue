<template>
  <div>
    <h1>Event for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />

    <template v-if="page != 1">
      <router-link
        :to="{ name: 'list-event', query: { page: page - 1 } }"
        rel="prev"
        >PrePage
      </router-link>
    </template>

    <span v-if="page != 1 && event.eventTotal > this.page * this.event.perPage"
      >|</span
    >

    <template v-if="event.eventTotal > this.page * 3">
      <router-link
        :to="{ name: 'list-event', query: { page: page + 1 } }"
        rel="next"
      >
        NextPage
      </router-link>
    </template>
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store/store'

// Moved the current page & action call outside the component

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1 // <--  We call parseInt on the (page) query parameter to ensure it’s a number.
  store
    .dispatch('event/feachEvents', {
      page: currentPage
    })
    .then(() => {
      //pass it into the component as a prop, so we can print next pages
      routeTo.params.page = currentPage
      next()
    })
}

export default {
  props: {
    page: {
      // current page gets passed in as a prop
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
    // EventCard: EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  computed: {
    ...mapState(['event', 'user']) //one event card for Each items in this array <EventCard>
  }
}
</script>
