<template>
  <div>
    <h1>Oops!</h1>
    <h3>The {{ resource }} you are looking for is not here.</h3>
    <router-link :to="{ name: 'list-event' }"
      >Back to the Home page</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped></style>
