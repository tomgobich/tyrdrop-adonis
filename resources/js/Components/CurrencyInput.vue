<template>
  <input 
    ref="inputRef" 
    class="form-input"
    :value="formattedValue"
  >
</template>

<script>
import { watch } from 'vue'
import useCurrencyInput from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number,
    options: {
      type: Object,
      default: () => ({
        locale: 'en',
        currency: 'USD',
        autoDecimalDigits: true,
        distractionFree: false,
        precision: 2,
      })
    }
  },
  setup (props) {
    const {
      inputRef,
      formattedValue,
      setOptions,
      setValue
    } = useCurrencyInput(props.options)

    watch(() => props.modelValue, (value) => {
      setValue(value)
    })

    watch(() => props.options, (options) => {
      setOptions(options)
    })

    return { inputRef, formattedValue }
  }
}
</script>