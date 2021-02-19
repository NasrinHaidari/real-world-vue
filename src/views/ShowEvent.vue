<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date | date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer ? event.organizer.name : '' }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>

    <BaseIcon name="map"><h2 class="location">Location</h2></BaseIcon>
    <p>{{ event.location }}</p>

    <h2>Event Details</h2>
    <p>{{ event.description }}</p>

    <h2>
      Attendees
      <span class="badge -fill-gradient">{{
        event.attendees ? event.attendees.length : 0
      }}</span>
    </h2>
    <ul class="list-group">
      <li
        class="list-item"
        v-for="(attendee, index) in event.attendees"
        :key="index"
      >
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    event: {
      // send in event as a prop from our new Per-Route Guard To router.js
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
