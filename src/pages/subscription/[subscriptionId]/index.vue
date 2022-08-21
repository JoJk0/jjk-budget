<template>
  <AppItemDetails :options="options">
    Vue component
  </AppItemDetails>
</template>

<script lang="ts" setup>
import SubscriptionDetails from '~/components/item-details/SubscriptionDetails.vue'
import AppTextField from '~/components/input-fields/AppTextField.vue'

const props = defineProps({
  subscriptionId: {
    type: String,
    required: true,
  },
})

// const emit = defineEmits({})

const options = {
  query: subscriptions.get,
  component: SubscriptionDetails,
  fields: [
    { name: 'name', label: 'Name', component: AppTextField },
    { name: 'amount', label: 'Amount', component: AppTextField },
    { name: 'currency', label: 'Currency', component: AppTextField },
    { name: 'accounts', label: 'Accounts', component: AppTextField },
  ],
}
</script>

<style lang="scss" scoped></style>
