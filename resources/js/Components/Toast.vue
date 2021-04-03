<template>
  <div :class="`rounded-md bg-${variants[variant]}-50 p-4 m-6 shadow-lg`" role="alert">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg v-if="variant === 'success'" :class="`h-5 w-5 text-${variants[variant]}-400`" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div class="mx-3">
        <p :class="`text-sm leading-5 font-medium text-${variants[variant]}-800`">
          <slot />
        </p>
      </div>
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button @click="$emit('hide')" :class="`inline-flex rounded-md p-1.5 text-${variants[variant]}-500 hover:bg-${variants[variant]}-100 focus:outline-none focus:bg-${variants[variant]}-100 transition ease-in-out duration-150`">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const variants = {
  success: "green",
  error: "red",
  warning: "orange",
  info: "blue"
}
export default {
  props: {
    variant: String
  },
  data() {
    return {
      variants: { ...variants },
      show: true
    }
  },
  mounted() {
    setTimeout(() => this.show = false, 8500);
  }
}
</script>