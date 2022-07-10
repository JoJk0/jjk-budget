<template>
  <form @submit.prevent="submitForm">
    <h1>Create Budget</h1>
    <v-text-field v-model="name" label="Budget name" placeholder="July budget" variant="outlined" rounded type="text" :error-messages="nameError" />
    <h2>Time period</h2>
    <section id="time-period">
      <v-text-field v-model="dateFrom" label="From" variant="outlined" rounded type="date" :error-messages="dateFromError" />
      <v-text-field v-model="dateTo" label="To" variant="outlined" rounded type="date" :error-messages="dateToError" />
    </section>
    <h2>Review current subscriptions</h2>
    <h2>Review current liabilities</h2>
    <h2>Review current lendings</h2>
    <h2>Review current investments</h2>
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
import { useField, useForm } from 'vee-validate'
import { data } from '../../composables/data'

const { banks, expenses, incomes, investments, lendings, liabilities, subscriptions } = data
// const props = defineProps({});

// const emit = defineEmits({});

export interface CreateBudgetForm {
  name: string
  startDate: string
  endDate: string
  bankAccounts: BankAccount[]
  subscriptions: Subscription[]
  expenses: Expense[]
  income: Income[]
}

const { submitForm } = useForm<CreateBudgetForm>()

const { value: name, errorMessage: nameError } = useField('name')
const { value: dateFrom, errorMessage: dateFromError } = useField('dateFrom')
const { value: dateTo, errorMessage: dateToError } = useField('dateTo')
</script>

<style lang="scss" scoped></style>
