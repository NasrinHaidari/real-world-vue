<!-- //////////////////////// -->
      <span v-if="page != 1 && eventTotal > this.page * 3">|</span>
    <template v-if="eventTotal > this.page * 3">
      <router-link
        :to="{ name: 'list-event', query: { page: page + 1 } }"
        rel="next"
      >
        NextPage
      </router-link>
    </template>


<div>
    <h1>Event for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />

    <template v-if="page != 1">
      <router-link :to="{ name: 'list-event', query: { page: page - 1 } }" rel="prev"
        >PrePage </router-link>


      <template v-if="hasNextPage"> | </template>
    </template>

    <router-link :to="{ name: 'list-event', query: { page: page + 1 } }" rel="next">
      Next Page</router-link>
</div>


hasNextPage() {
    return this.event.eventsTotal > this.page * this.perPage
  },