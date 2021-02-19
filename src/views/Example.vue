<template>
  <form @submit.prevent="submit">
    <input
      type="email"
      placeholder="What is your Email?"
      :class="{ error: $v.email.$error }"
      v-model="email"
      @blur="$v.email.$touch()"
    />
    <!-- [@blur="$v.email.$touch()"] triggering the $dirty state on blur -->
    <!-- if a field is both $dirty and $invalid then that means there is an $error -->
    <div v-if="$v.email.$error">
      <!-- hides messages until field has error -->
      <p v-if="!$v.email.email" class="errorMessage">
        Please enter a valid email address
      </p>
      <p v-if="!$v.email.required" class="errorMessage">Email is required.</p>
    </div>
    <button type="submit" :disabled="$v.$invalid">Submit</button>
    <p v-if="$v.$anyError" class="errorMessage">
      Please fill out the required field(s).
    </p>
  </form>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: null
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log('Form Submission:', this.email)
      }
    }
  }
}
</script>
