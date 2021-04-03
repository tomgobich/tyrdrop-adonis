<template>
  <button :type="type" :class="`block w-full px-4 py-2 text-sm leading-5 text-gray-700 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ${className}`" v-if="as == 'button'">
    <slot></slot>
  </button>

  <inertia-link
    :href="href"
    :class="[`block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out`, className, { 'bg-gray-100 font-bold' : active }]"
    v-else>
    <slot></slot>
  </inertia-link>
</template>

<script>
  export default {
    props: {
      href: String,
      as: String,
      active: Boolean,
      className: String,
      type: {
        type: String,
        default: 'submit'
      }
    }
  }
</script>