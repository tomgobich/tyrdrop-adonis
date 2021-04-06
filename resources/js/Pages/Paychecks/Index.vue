<template>
  <Layout>
    <template #header>
      <div class="md:flex justify-between">
        <div class="font-semibold text-xl text-gray-800 leading-tight space-x-2 flex items-center">
          <h2 class="font-bold">
            Paychecks
          </h2>
          <span>/</span>
          <div>
            <tyr-dropdown align="right">
              <template #trigger>
                <button class="flex items-center border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                  {{ year }}
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
              </template>

              <template #content>
                <tyr-dropdown-link v-for="y in years" :key="y" :href="`/paychecks/${y}`" :active="y == year">
                  {{ y }}
                </tyr-dropdown-link>
              </template>
            </tyr-dropdown>
          </div>
        </div>
        <div>
          <tyr-button href="/paychecks/new">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Add Paycheck
          </tyr-button>
        </div>
      </div>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h3 v-if="summary !== null" class="text-lg leading-6 font-medium text-gray-900 px-3 sm:px-0">
          Summary <span class="opacity-50 italic text-sm">(compared to {{ latestCompletedMonth }} {{ year - 1}})</span>
        </h3>
        <!-- <tyr-stat-bar v-if="summary !== null" :stats="summary" class="mb-8" /> -->

        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4 px-3 sm:px-0">
          Paychecks
        </h3>
        <div v-show="!paychecks.length" class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
          <div class="prose">
            <h3>
              No Recorded Paychecks for {{ year }}
            </h3>

            <p>
              Get off to the races with {{ year }} by adding your first paycheck!
            </p>
            <ul>
              <li>Fill in as much info as you'd like</li>
              <li>We'll use the information you give us to aggregate your balances year over year</li>
              <li>We'll use investment information to forecast potential balances using your goals and actual contributions</li>
            </ul>
          </div>

          <tyr-button href="/paychecks/new" class="mt-6">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Add A New Paycheck
          </tyr-button>
        </div>
        <div v-show="paychecks.length" class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <tyr-table>
            <template #head>
              <tyr-table-heading>Category</tyr-table-heading>
              <tyr-table-heading v-for="paycheck in tableData" :key="paycheck.id" class="w-32">
                <tyr-dropdown align="left">
                  <template #trigger>
                    <button class="w-full group flex justify-end hover:text-gray-700 focus-within:text-gray-700 items-center border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-300 ease-in-out">
                      <svg class="w-4 h-4 mr-2 text-white group-hover:text-gray-700 transition duration-300 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                      {{ paycheck.date_display }}
                    </button>
                  </template>

                  <template #content>
                    <tyr-dropdown-link :href="`/paychecks/${paycheck.id}/edit`" className="normal-case text-sm flex items-center cursor-pointer">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      Edit Paycheck
                    </tyr-dropdown-link>
                    <tyr-dropdown-link as="button" @click.native="deletePaycheck(paycheck)" className="normal-case text-sm flex items-center cursor-pointer">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      Delete Paycheck
                    </tyr-dropdown-link>
                  </template>
                </tyr-dropdown>
              </tyr-table-heading>
            </template>
            <template #rows>
              <template v-for="group in fieldGroups" :key="group.label">
                <tr>
                  <tyr-table-data :colspan="tableData.length + 1" class="font-bold text-lg bg-gray-50">
                    {{ group.label }}
                  </tyr-table-data>
                </tr>
                <template v-for="field in group.fields" :key="field.name">
                  <tr v-if="group.label !== 'Annotations'">
                    <tyr-table-data className="font-semibold">
                      {{ field.label }}
                    </tyr-table-data>

                    <tyr-table-data v-for="paycheck in paychecks" :key="paycheck.id" align="right">
                      {{ asCurrency(paycheck[field.name]) }} 
                    </tyr-table-data>
                  </tr>
                  <tr v-else>
                    <tyr-table-data className="font-bold">
                      {{ field.label }}
                    </tyr-table-data>

                    <tyr-table-data v-for="paycheck in paychecks" :key="paycheck.id" align="right">
                      <div v-if="paycheck[field.name] && paycheck[field.name].length" :title="paycheck[field.name]" class="truncate">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                      </div>
                      <div v-else>N/A</div>
                    </tyr-table-data>
                  </tr>
                </template>
              </template>
            </template>
          </tyr-table>
        </div>
      </div>
    </div>

    <tyr-dialog-modal :show="confirmingPaycheckDeletion" @close="confirmingPaycheckDeletion = false">
      <template #title>
        Delete Paycheck
      </template>

      <template #content>
        Are you sure you want to permanantly delete this paycheck?
        This will be reflected on your balances and forecasts.

        <div class="mt-4">
          <tyr-table>
            <template #head>
              <tyr-table-heading>Date</tyr-table-heading>
              <tyr-table-heading>Gross Income</tyr-table-heading>
              <tyr-table-heading>Taxable Income</tyr-table-heading>
              <tyr-table-heading>Net Income</tyr-table-heading>
            </template>
            <template #rows>
              <tr>
                <tyr-table-data>{{ pendingPaycheck.date_display }}</tyr-table-data>
                <tyr-table-data>{{ pendingPaycheck.gross_income }}</tyr-table-data>
                <tyr-table-data>{{ pendingPaycheck.taxable_income }}</tyr-table-data>
                <tyr-table-data>{{ pendingPaycheck.net_income }}</tyr-table-data>
              </tr>
            </template>
          </tyr-table>
      </div>
    </template>

    <template #footer>
      <tyr-secondary-button @click.native="confirmingPaycheckDeletion = false">
        Nevermind
      </tyr-secondary-button>

      <tyr-danger-button class="ml-2" @click.native="destroyPaycheck" :class="{ 'opacity-25': pendingWorking }" :disabled="pendingWorking">
        Delete Account
      </tyr-danger-button>
    </template>
  </tyr-dialog-modal>
  </Layout>
</template>

<script>
import Layout from '../../Layouts/AppLayout.vue'
import TyrDropdown from '../../Components/Dropdown.vue'
import TyrDropdownLink from '../../Components/DropdownLink.vue'
import TyrButton from '../../Components/Button.vue'
import TyrTable from '../../Components/Table.vue'
import TyrTableHeading from '../../Components/TableHeading.vue'
import TyrTableData from '../../Components/TableData.vue'
import TyrDialogModal from '../../Components/DialogModal.vue'
import TyrSecondaryButton from '../../Components/SecondaryButton.vue'
import TyrDangerButton from '../../Components/DangerButton.vue'
import { ref, computed } from 'vue'
import { DateTime } from 'luxon'
import { Inertia } from '@inertiajs/inertia'

const makeGroup = (label, fields) => ({ label, fields });
const makeField = (name, label, val) => ({ name, label, val });
const incomeFields = [
  makeField('gross_income', 'Gross Income', 0),
  makeField('taxable_income', 'Taxable Income', 0),
  makeField('net_income', 'Net Income', 0),
];
const taxFields = [
  makeField('tax_federal', 'Federal Tax', 0),
  makeField('tax_state', 'State Tax', 0),
  makeField('tax_city', 'City Tax', 0),
  makeField('social_security', 'Social Security', 0),
  makeField('medicare', 'Medicare', 0),
];
const deductionFields = [
  makeField('health_insurance', 'Medical', 0),
  makeField('k_contribution', '401k Contribution', 0),
  makeField('ira_contribution', 'IRA Contribution', 0),
  makeField('taxable_inv_contribution', 'Investment Contribution', 0),
  makeField('hsa_contribution', 'HSA Contribution', 0),
  makeField('home_equity_contribution', 'Home Equity Contribution', 0),
];
const snapshotFields = [
  makeField('k_balance', '401k Snapshot', 0),
  makeField('ira_balance', 'IRA Snapshot', 0),
  makeField('taxable_inv_balance', 'Investment Snapshot', 0),
  makeField('hsa_balance', 'HSA Balance', 0),
  makeField('savings_balance', 'Savings Balance', 0),
  makeField('debt', 'Debt Snapshot', 0),
  makeField('home_mortgage', 'Mortgage', 0),
  makeField('home_equity', 'Home Equity', 0),
  makeField('home_value', 'Home Value Snapshot', 0),
];
const annotationFields = [
  makeField('notes', 'Notes', '')
]
const fieldGroups = [
  makeGroup('Income', incomeFields),
  makeGroup('Taxes', taxFields),
  makeGroup('Deductions', deductionFields),
  makeGroup('Snapshots', snapshotFields),
  makeGroup('Annotations', annotationFields)
]

const getDisplayDate = (paycheck) => DateTime.fromISO(paycheck.date).toLocaleString({
  month: 'short',
  day: 'numeric'
})

export default {
  props: {
    year: Number,
    years: Array,
    summary: Array,
    paychecks: Array
  },
  components: {
    Layout,
    TyrDropdown,
    TyrDropdownLink,
    TyrButton,
    TyrTable,
    TyrTableHeading,
    TyrTableData,
    TyrDialogModal,
    TyrSecondaryButton,
    TyrDangerButton
  },
  setup(props) {
    const pendingPaycheck = ref({})
    const pendingWorking = ref(false)
    const confirmingPaycheckDeletion = ref(false)

    const tableData = computed(() => props.paychecks.map(p => ({ ...p, date_display: getDisplayDate(p) })))
    const latestCompletedMonth = computed(() => {
      const firstPaycheck = props.paychecks.length && props.paychecks[0]
      return DateTime.fromISO(firstPaycheck.date).toLocaleString({ month: 'long' })
    })

    function deletePaycheck(paycheck) {
      pendingPaycheck.value = paycheck
      confirmingPaycheckDeletion.value = true
    }

    async function destroyPaycheck() {
      pendingWorking.value = true
      confirmingPaycheckDeletion.value = false
      const response = await Inertia.delete(`/paychecks/${pendingPaycheck.value.id}`)
      pendingWorking.value = false
      pendingPaycheck.value = null
    }

    function asCurrency(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }

    return {
      fieldGroups,
      pendingPaycheck,
      pendingWorking,
      confirmingPaycheckDeletion,
      tableData,
      latestCompletedMonth,
      deletePaycheck,
      destroyPaycheck,
      asCurrency
    }
  }
}
</script>