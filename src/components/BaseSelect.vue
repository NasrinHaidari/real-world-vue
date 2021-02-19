<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <option
        v-for="option in options"
        :key="option"
        :selected="option === value"
        >{{ option }}</option
      >
      <!-- :selected="option === value" if the option matches our value prop. If it does, the option become selected option and display -->
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin'
export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped></style>
