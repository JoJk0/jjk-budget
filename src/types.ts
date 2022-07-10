import type { Currency } from './composables/currency'
export interface Env {
  fixerApiKey: string
}

export interface AppData {
  title: string
  description: string
  primary: string
  secondary: string
  tertiary: string
  budgets: Budget[]
  categories: Category[]
  subscriptions: Subscription[]
  banks: Bank[]
  revenues: Revenue[]
  expenses: Expense[]
  lendings: Lending[]
  investments: Investment[]
  liabilities: Liability[]
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
}

export interface Budget {
  id: string
  name: string
  date: DatePeriod
  currencyInfo: CurrencyInfo
  banks: Bank[]
}

export interface DatePeriod {
  start: string
  end: string
}

export interface CurrencyInfo {
  baseCurrency: Currency
  conversionDate: string
  conversionRates: Record<Currency, number>
}

export interface Bank {
  id: string
  name: string
  color: string
  accounts: BankAccount[]
}

export type BankAccountType = 'CURRENT' | 'SAVINGS' | 'CREDIT_CARD'

export interface BankAccount {
  id: string
  name: string
  type: BankAccountType
  balance: number
  currency: Currency
}

export interface Subscription {
  id: string
  name: string
  amount: number
  currency: Currency
  timeframe: Timeframe
  categoryId?: string
}

export type TimeframeType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'

export interface Timeframe {
  type: TimeframeType
  value: number
}

export interface Revenue {
  id: string
  name: string
  color: string
  amount: number
  currency: Currency
}

export interface Expense {
  id: string
  name: string
  currency: Currency
  subscriptionId?: string
  categoryId?: string
}

export interface Lending {
  id: string
  name: string
  amount: number
  currency: Currency
  date: string
  interest: Interest
  repayments: Repayment[]
}

export interface Interest {
  type: 'MONTHLY' | 'YEARLY'
  value: number
}

export interface Repayment {
  id: string
  date: string
  amount: number
  currency: Currency
}

export type Liability = Lending

export interface Investment {
  id: string
  name: string
  commitments: InvestmentCommitment[]
  date: DatePeriod
  expectedReward: Amount
}

export interface InvestmentCommitment {
  id: string
  amount: number
  currency: Currency
  date: string
}

export interface Amount {
  amount: number
  currency: Currency
}
