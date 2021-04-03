<template>
  <Layout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Add New Paycheck
      </h2>
    </template>

    <div class="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <form @submit.prevent="form.post('/paychecks/store')">
        <tyr-form-section @submitted="addPaycheck">
          <template #title>
            Paycheck Information
          </template>

          <template #description>
            Financial information that can be found on your paycheck.
            <tyr-button @click.native="copyValuesFromLast" class="mt-3">
              Copy values from last paycheck
            </tyr-button>
          </template>

          <template #form>
            <div class="col-span-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 sm:px-6">
                Date
              </h3>
              <dl>
                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2 items-center">
                  <dt class="text-sm leading-5 font-medium text-gray-500">
                    Paycheck Date
                  </dt>
                  <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    <tyr-input type="date" ref="date" v-model="form.date" />
                    <tyr-input-error :message="form.errors.date" class="mt-2" />
                  </dd>
                </div>
              </dl>

              <h3 class="text-lg leading-6 font-medium text-gray-900 sm:px-6 mt-6">
                Income
              </h3>
              <dl>
                <div v-for="(field, i) in incomeFields" :key="field.name" :class="['sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2 items-center', { 'sm:border-t sm:border-gray-200': i !== 0 }]">
                  <dt class="text-sm leading-5 font-medium text-gray-500">
                    {{ field.label }}
                  </dt>
                  <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    <tyr-currency-input :ref="field.name" :id="field.name" class="form-input on-focus text-sm" v-model="form[field.name]" />
                    <tyr-input-error :message="form.errors[field.name]" class="mt-2" />
                  </dd>
                </div>
              </dl>

              <h3 class="text-lg leading-6 font-medium text-gray-900 sm:px-6 mt-6">
                Taxes
              </h3>
              <dl>
                <div v-for="(field, i) in taxFields" :key="field.name" :class="['sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2 items-center', { 'sm:border-t sm:border-gray-200': i !== 0 }]">
                  <dt class="text-sm leading-5 font-medium text-gray-500">
                    {{ field.label }}
                  </dt>
                  <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    <tyr-currency-input :ref="field.name" :id="field.name" class="form-input on-focus text-sm" v-model="form[field.name]" />
                    <tyr-input-error :message="form.errors[field.name]" class="mt-2" />
                  </dd>
                </div>
              </dl>

              <h3 class="text-lg leading-6 font-medium text-gray-900 sm:px-6 mt-6">
                Deductions
              </h3>
              <dl>
                <div v-for="(field, i) in deductionFields" :key="field.name" :class="['sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2 items-center', { 'sm:border-t sm:border-gray-200': i !== 0 }]">
                  <dt class="text-sm leading-5 font-medium text-gray-500">
                    {{ field.label }}
                  </dt>
                  <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    <tyr-currency-input :ref="field.name" :id="field.name" class="form-input on-focus text-sm" v-model="form[field.name]" />
                    <tyr-input-error :message="form.errors[field.name]" class="mt-2" />
                  </dd>
                </div>
              </dl>

              <h3 class="text-lg leading-6 font-medium text-gray-900 sm:px-6 mt-6">
                Snapshots
              </h3>
              <dl>
                <div v-for="(field, i) in snapshotFields" :key="field.name" :class="['sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2 items-center', { 'sm:border-t sm:border-gray-200': i !== 0 }]">
                  <dt class="text-sm leading-5 font-medium text-gray-500">
                    {{ field.label }}
                  </dt>
                  <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    <tyr-currency-input :ref="field.name" :id="field.name" class="form-input on-focus text-sm" v-model="form[field.name]" />
                    <tyr-input-error :message="form.errors[field.name]" class="mt-2" />
                  </dd>
                </div>
              </dl>

              <h3 class="text-lg leading-6 font-medium text-gray-900 sm:px-6 mt-6">
                Notes
              </h3>
              <dl>
                <div :class="['sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6 sm:py-2 items-center']">
                  <div>
                    <tyr-textarea v-model="form.notes" id="notes" class="form-input text-sm w-full" rows="4" />
                  </div>
                </div>
              </dl>
            </div>
          </template>

          <template #actions>
            <progress v-if="form.progress" :value="form.progress.percentage" max="100">
              {{ form.progress.percentage }}%
            </progress>
            <tyr-button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
              Save
            </tyr-button>
          </template>
        </tyr-form-section>
      </form>
    </div>
  </Layout>
</template>

<script>
  import Layout from '../../Layouts/AppLayout.vue'
  import TyrFormSection from '../../Components/FormSection.vue'
  import TyrButton from '../../Components/Button.vue'
  import TyrInput from '../../Components/Input.vue'
  import TyrInputError from '../../Components/InputError.vue'
  import TyrTextarea from '../../Components/Textarea.vue'
  import TyrCurrencyInput from '../../Components/CurrencyInput.vue'
  import { DateTime } from 'luxon'
  import { useForm } from '@inertiajs/inertia-vue3'
  import { ref } from 'vue'

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
    makeField('401k_contribution', '401k Contribution', 0),
    makeField('ira_contribution', 'IRA Contribution', 0),
    makeField('taxable_inv_contribution', 'Investment Contribution', 0),
    makeField('hsa_contribution', 'HSA Contribution', 0),
    makeField('home_equity_contribution', 'Home Equity Contribution', 0),
  ];
  const snapshotFields = [
    makeField('401k_balance', '401k Snapshot', 0),
    makeField('ira_balance', 'IRA Snapshot', 0),
    makeField('taxable_inv_balance', 'Investment Snapshot', 0),
    makeField('hsa_balance', 'HSA Balance', 0),
    makeField('savings_balance', 'Savings Balance', 0),
    makeField('debt', 'Debt Snapshot', 0),
    makeField('home_mortgage', 'Mortgage', 0),
    makeField('home_equity', 'Home Equity', 0),
    makeField('home_value', 'Home Value Snapshot', 0),
  ];

  let paycheckFormFields = {};
  const formFields = [...incomeFields, ...taxFields, ...deductionFields, ...snapshotFields];
  formFields.map(f => paycheckFormFields[f.name] = f.val);

  export default {
    props: {
      lastPaycheck: Object
    },
    components: {
      Layout,
      TyrFormSection,
      TyrButton,
      TyrInput,
      TyrInputError,
      TyrTextarea,
      TyrCurrencyInput
    },
    setup() {
      const form = useForm({
        'date': DateTime.local().toFormat('yyyy-MM-dd'),
        'notes': '',
        ...paycheckFormFields
      })

      const textarea = ref('test')

      function copyValuesFromLast() {
        this.form = this.$inertia.form({
          date: this.form.date,
          ...this.getFormFields(this.lastPaycheck)
        })
      }

      function getFormFields(defaultData) {
        let formFields = [...incomeFields, ...taxFields, ...deductionFields, ...snapshotFields];
        let paycheckFormFields = {};

        if (defaultData) {
          formFields = formFields.map(field => ({ ...field, val: defaultData[field.name] || field.val }))
        }
        
        formFields.map(f => paycheckFormFields[f.name] = f.val);
        
        return paycheckFormFields;
      }

      return {
        incomeFields,
        taxFields,
        deductionFields,
        snapshotFields,
        form,
        copyValuesFromLast,
      }
    }

    // props: {
    //   lastPaycheck: Object
    // },

    // components: {
    //   Layout,
    //   TyrFormSection,
    //   TyrButton,
    //   TyrInput,
    //   TyrInputError,
    //   TyrTextarea,
    //   TyrCurrencyInput
    // },

    // data() {
    //   return {
    //     incomeFields: [...incomeFields],
    //     taxFields: [...taxFields],
    //     deductionFields: [...deductionFields],
    //     snapshotFields: [...snapshotFields],
    //     timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    //     form: this.$inertia.form({
    //       'date': DateTime.local().toFormat('yyyy/MM/dd'),
    //       'notes': '',
    //       ...paycheckFormFields
    //     }, {
    //       bag: 'paycheckForm'
    //     })
    //   }
    // },

    // methods: {
    //   
    // }
  }
</script>