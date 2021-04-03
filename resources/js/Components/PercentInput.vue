<template>
  <input
    inputmode="numeric"
    class="form-input rounded-md shadow-sm"
    v-model="internalValue"
    @keydown.delete="skipPercent"
    @input="$emit('input', clean(internalValue))"
    ref="input"
  />
</template>

<script>
export default {
  props: ['value'],

  computed: {
    internalValue: {
      get() {
        return this.formattedValue;
      },
      set(value) {
        this.integerString = this.padIntegerString(value);

        let stringValue = this.toFixed(value);

        this.formattedValue = `${stringValue}%`;
      }
    }
  },

  data() {
    return {
      formattedValue: 0.00,
      integerString: "000",
      backspace: null
    }
  },

  mounted() {
    this.internalValue = this.value;
  },

  watch: {
    value(newValue) {
      this.internalValue = newValue;
    }
  },

  methods: {
    focus() {
      this.$refs.input.focus()
    },

    skipPercent(event) {
      this.backspace = this.internalValue;
    },

    padIntegerString(value) {
      let clean = this.clean(value);
      let split = (clean + "").split('.');

      if (split.length == 2) {
        split[1] = split[1].length < 2 ? (split[1] + "0") : split[1];
      } else {
        split[1] = "00";
      }

      return split.join('');
    },

    toFixed(value) {
      // if % was backspaced out, remove 1 additional character and add back %
      if (this.backspace && !(value + "").includes('%')) {
        value = (value + "").slice(0, -1);
        this.integerString = this.integerString.slice(0, -1);
      }

      let str = this.integerString.splice((this.integerString.length - 2), 0, '.');

      this.backspace = null;
      return str;
    },

    clean(value) {
      if (!value) return 0.00;
      return parseFloat((value + "").replace("%", ""));
    }
  }
}
</script>

