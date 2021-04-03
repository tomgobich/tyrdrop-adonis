<template>
  <textarea class="form-input rounded-md shadow-sm" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" ref="input"></textarea>
</template>

<script>
export default {
  props: ['modelValue'],
  methods: {
    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>