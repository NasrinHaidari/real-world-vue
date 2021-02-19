// will display the notification message itself
<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000) //This notification is from props
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}` //This will return ‘-text-success’ or ‘-text-error’ depending upon the type that is on our notification prop object
    }
  },
  methods: mapActions('notification', ['remove'])
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
