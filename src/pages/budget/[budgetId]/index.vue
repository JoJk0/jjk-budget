<template>
  <div v-if="budget" class="container">
    <h1>View budget {{ budget.name }}</h1>
    <section id="time-period">
      <h2>Time period</h2>
      <div class="days">
        {{ daysNumber }} days
      </div>
      <div class="date">
        <div class="from">
          {{ budget.date.start }}
        </div>
        <div class="to">
          {{ budget.date.end }}
        </div>
      </div>
    </section>
    <section id="stats">
      <h2>Stats</h2>
      <div class="startingBalance">
        <h3>Starting balance</h3>
        {{ startingBalance }}
      </div>
      <div class="endingBalance">
        <h3>Ending balance</h3>
        {{ endingBalance }}
      </div>
      <div class="totalIncome">
        <h3>Total income</h3>
        {{ totalIncome }}
      </div>
      <div class="totalExpenses">
        <h3>Total expenses</h3>
        {{ totalExpenses }}
      </div>
      <div class="totalExpensesWithoutRevenue">
        <h3>Total expenses without revenue</h3>
        {{ totalExpensesWithoutRevenue }}
      </div>
    </section>
    <section id="banks">
      <h2>Bank account balances</h2>
      <div v-for="bank of budget.banks" :key="bank.id" class="bank">
        <h2 class="name" :style="{ color: bank.color }">
          {{ bank.name }}
        </h2>
        <div v-for="account of bank.accounts" :key="account.id" class="accounts">
          <div class="name">
            {{ account.name }}
          </div>
          <div class="amount">
            {{ account.balance }}
          </div>
        </div>
      </div>
    </section>
    <section id="expenses">
      <h2>Budgeted expenses</h2>
      <div v-for="expense of budget.expenses" :key="expense.id" class="expense">
        <div class="name">
          {{ expense.name }}
        </div>
        <div class="amount">
          {{ expense.amount }}
        </div>
      </div>
    </section>
    <section id="revenues">
      <h2>Budgeted income</h2>
      <div v-for="revenue of budget.revenues" :key="revenue.id" class="income">
        <div class="name">
          {{ revenue.name }}
        </div>
        <div class="amount">
          {{ revenue.amount }}
        </div>
      </div>
    </section>
  </div>
  <div v-else class="notfound">
    Budget not found
  </div>
</template>

<script lang="ts" setup>
import { data } from '../../../composables/data'

const props = defineProps({
  budgetId: {
    type: String,
    required: true,
  },
})

const budget = data.budgets.find(budget => budget.id === props.budgetId)

const daysNumber = computed(() => {
  if (!budget)
    return
  const start = new Date(budget.date.start)
  const end = new Date(budget.date.end)
  const diff = end.getTime() - start.getTime()
  return Math.round(diff / (1000 * 60 * 60 * 24))
})

const startingBalance = computed(() => budget ? budget.banks.reduce((acc, bank) => acc + bank.accounts.reduce((acc, account) => acc + account.balance, 0), 0) : undefined)

const totalIncome = computed(() => budget ? budget.revenues.reduce((acc, revenue) => acc + revenue.amount, 0) : undefined)

const totalExpenses = computed(() => budget ? budget.expenses.reduce((acc, expense) => acc + expense.amount, 0) : undefined)

const totalExpensesWithoutRevenue = computed(() => budget ? startingBalance.value! - totalExpenses.value! : undefined)

const endingBalance = computed(() => budget ? startingBalance.value! + totalIncome.value! - totalExpenses.value! : undefined)

// const emit = defineEmits({});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  padding: 1rem;
  gap: 1em;
  > * {
    border: 1px solid rgba(255,255,255,0.1);
    padding: 1em;
  }
}
#banks {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
  .accounts, .income, .expense, #stats > * {
    display: flex;
    flex-direction: row;
    gap: 1em;
  }
</style>
