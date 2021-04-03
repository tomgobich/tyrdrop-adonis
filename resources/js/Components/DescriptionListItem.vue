<template>
  <div class="sm:grid sm:grid-cols-2 sm:gap-2 sm:px-2 sm:py-2">
    <dt class="text-sm leading-5 font-medium text-gray-500">
      <slot name="title" />
    </dt>
    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0" :class="[dataAlignment]">
      <slot name="data" />
    </dd>
  </div>
</template>

<script>
export default {
  props: {
    alignData: String
  },
  computed: {
    dataAlignment() {
      switch(this.alignData) {
        case 'right':
          return "text-right"
        default:
          return "";
      }
    }
  }
}
</script>