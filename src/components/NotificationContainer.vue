// will create a NotificationBar for every notification in the State
<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>
//:notification="notification" first is notification(Props in NotificationBar)
the secound is notification(object)
<script>
import NotificationBar from '@/components/NotificationBar.vue'
import { mapState } from 'vuex'

export default {
  components: {
    NotificationBar
  },
  computed: mapState('notification', ['notifications']) //notification is name of our modules && notifications is name of our state
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 0 2em 1em 0;
}
</style>
