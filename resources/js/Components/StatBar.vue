<template>
  <!--
Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
Read the documentation to get started: https://tailwindui.com/documentation
-->
  <div>
    <div class="mt-5 rounded-lg bg-white overflow-hidden shadow">
      <div v-for="(stat, i) in stats" :key="stat.title" :class="[{ 'border-t border-gray-200 md:border-0 md:border-l': i !== 0, 'md:border-t': i > 2 }]">
        <div class="px-3 py-2">
          <dl>
            <dt class="text-base leading-6 font-normal text-gray-900">
              {{ stat.title }}
            </dt>
            <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div class="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
                {{ asCurrency(stat.current) }}
                <span class="ml-2 text-sm leading-5 font-medium text-gray-500">
                from {{ asCurrency(stat.previous) }}
              </span>
              </div>
              <div v-if="stat.diff > 0" class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium leading-5 bg-green-100 text-green-800 md:mt-2 lg:mt-0">
                <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="sr-only">
                  Increased by
                </span>
                {{ getDisplayDiff(stat.diff) }}%
              </div>
              <div v-else-if="stat.diff < 0" class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium leading-5 bg-red-100 text-red-800 md:mt-2 lg:mt-0">
                <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="sr-only">
                  Decreased by
                </span>
                {{ getDisplayDiff(stat.diff) }}%
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: Array
  },

  methods: {
    getDisplayDiff(diff) {
      return diff.toLocaleString('fullwide', { maximumFractionDigits: 2 })
    },

    asCurrency(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }
  }
}
</script>