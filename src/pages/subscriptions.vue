<template>
  <section>
    <h1 class="headline1">
      Subscriptions
    </h1>
    <AppConnection :options="options">
      <template #default="{ items }">
        <SubscriptionCard v-for="(item, id) of items" :key="id" :subscription="item" />
      </template>
    </AppConnection>
  </section>
</template>

<script lang="ts" setup>
import { equalTo, orderByChild } from '@firebase/database'
import { DateTime } from 'luxon'
import { subscriptions } from '~/composables/api'
import AppTextField from '~/components/input-fields/AppTextField.vue'
import AppConnection from '~/layouts/AppConnection.vue'

// const props = defineProps({});

// const emit = defineEmits({});

// const mdbadge = new MdBadge()

const options = defineConnectionOptions({
  connectionName: 'subscriptions',
  actions: {
    list: {
      query: subscriptions.list,
      searchOption: 'name',
      sortOptions: [
        { label: 'Name', value: 'name' },
        { label: 'Amount', value: 'amount' },
        { label: 'Status', value: 'active' },
        { label: 'Frequency', value: 'timeframe/type' },
      ],
      filterOptions: [
        {
          label: 'Currency',
          name: 'currency',
          filterFn: (name, value) => [
            orderByChild(name),
            equalTo(value),
          ],
          values: [
            { label: 'British Pound', value: 'GBP' },
            { label: 'Polish Złoty', value: 'PLN' },
          ],
        },
        {
          label: 'Accounts',
          name: 'accounts',
          filterFn: (name, value) => [
            orderByChild(name),
            equalTo(value),
          ],
          values: [
            { label: 'Utilities [Barclays]', value: '23nj45n235j2' },
            { label: 'GBP Account [Starling Bank]', value: 'pl4kjl3g3rvfedn' },
          ],
        },
        {
          label: 'Status',
          name: 'status',
          values: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ],
        },
        {
          label: 'Date',
          name: 'date',
          filterFn: (name, value) => {
            const today = DateTime.local().startOf('day')
            const yesterday = today.minus({ days: 1 })
            return [
              orderByChild(name),
              equalTo(value),
            ]
          },
          values: [
            { label: 'Today', value: 'today' },
            { label: 'Yesterday', value: 'yesterday' },
            { label: 'This week', value: 'thisWeek' },
            { label: 'Last week', value: 'lastWeek' },
            { label: 'This month', value: 'thisMonth' },
            { label: 'Last month', value: 'lastMonth' },
            { label: 'This year', value: 'thisYear' },
            { label: 'Last year', value: 'lastYear' },
          ],
        },
        {
          label: 'Amount',
          name: 'amount',
          values: [
            { label: 'Greater than', value: 'gt' },
            { label: 'Less than', value: 'lt' },
          ],
        },
      ],
    },
    create: {
      title: 'Add subscription',
      mutation: subscriptions.create,
      fields: [
        { name: 'name', label: 'Name', component: AppTextField },
        { name: 'amount', label: 'Amount', component: AppTextField },
        { name: 'currency', label: 'Currency', component: AppTextField },
        { name: 'accounts', label: 'Accounts', component: AppTextField },
      ],
    },
    delete: {
      mutation: subscriptions.remove,
    },
    details: {
      route: {
        name: 'subscription/[subscriptionId]',
      },
    },
    set: {
      mutation: subscriptions.set,
      fields: [
        { name: 'name', label: 'Name', component: AppTextField },
        { name: 'amount', label: 'Amount', component: AppTextField },
        { name: 'currency', label: 'Currency', component: AppTextField },
        { name: 'accounts', label: 'Accounts', component: AppTextField },
      ],
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
