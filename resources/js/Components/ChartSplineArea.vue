<template>
  <apexchart type="area" height="400" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
export default {
  props: {
    series: Array,
    xaxis: Object,
    chart: { type: Object, default: () => ({ 
      height: 400,
      type: 'area',
      toolbar: { show: false }
    })},
    tooltip: { type: Object, default: () => ({
      x: {
        format: 'dd/MM/yy'
      }
    })}
  },

  computed: {
    chartOptions() {
      return {
        chart: this.chart,
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: this.xaxis,
        tooltip: this.tooltip
      }
    }
  }
}
</script>