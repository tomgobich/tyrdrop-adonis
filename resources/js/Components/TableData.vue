<template>
  <td :class="`px-3 py-2 whitespace-nowrap text-sm leading-5 text-gray-500 ${className}`" :colspan="colspan || 1" :style="maxWidth ? `width: ${maxWidth}px`: ''">
    <slot />
  </td>
</template>

<script>
  export default {
    props: {
      className: String,
      colspan: [String, Number],
      maxWidth: Number
    }
  }
</script>