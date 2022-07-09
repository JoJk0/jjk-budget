<template>
  <form @submit.prevent="submitForm">
    <h1>Create Budget</h1>
    <h2>Time period</h2>
    <h2>Review current subscriptions</h2>
    <h2>Bank account balances</h2>
    <h2>Budgeted expenses</h2>
    <section id="expenses" />
    <h2>Budgeted income</h2>
    <v-btn type="submit" rounded color="primary">
      Create budget
    </v-btn>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { data } from '../../composables/data'
// const props = defineProps({});

// const emit = defineEmits({});

export interface CreateBudgetForm {
  name: string
  description: string
  startDate: string
  endDate: string
  bankAccounts: BankAccount[]
  subscriptions: Subscription[]
  expenses: Expense[]
  income: Income[]
}

const { values, submitForm } = useForm<CreateBudgetForm>({

})
</script>

<style lang="scss" scoped></style>
