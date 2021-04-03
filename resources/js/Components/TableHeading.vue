<template>
  <th v-if="!empty" class="px-3 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" :style="maxWidth ? `width: ${maxWidth}px` : ''">
    <slot />
  </th>
  <th v-else class="px-6 py-3 bg-gray-50" :style="maxWidth ? `width: ${maxWidth}px` : ''"></th>
</template>

<script>
  export default {
    props: {
      empty: Boolean,
      maxWidth: Number
    }
  }
</script>