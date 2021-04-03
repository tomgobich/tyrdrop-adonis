<template>
  <input class="form-input rounded-md shadow-sm" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" ref="input">
</template>

<script>
  export default {
    props: ['type','modelValue'],
    methods: {
      focus() {
        this.$refs.input.focus()
      }
    }
  }
</script>