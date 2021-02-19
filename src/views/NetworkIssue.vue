<template>
  <div>
    <h1>Uh-Oh!</h1>
    <h3>
      It looks you're experiencing some network issues, please click the back
      button and try again.
    </h3>
    <router-link :to="{ name: 'list-event' }"
      >Or go back to the event list</router-link
    >
  </div>
</template>
