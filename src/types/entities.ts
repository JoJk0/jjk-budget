import type { Currency } from '../composables/currency'
import type { SubscriptionListItem } from './list-items'
import type { DataConnection } from '.'

export interface User {
  profile: UserProfile
  settings: UserSettings
  details: UserDetails
}

export interface UserProfile {
  name: string
  email: string
}

export interface UserSettings {
  currency: Currency
  language: string
}

export interface UserDetails {
  budgets: Budget[]
  categories: Category[]
  subscriptions: DataConnection<Subscription, SubscriptionListItem>
  banks: Bank[]
  revenues: Revenue[]
  expenses: Expense[]
  lendings: Lending[]
  investments: Investment[]
  liabilities: Liability[]
}

export interface Category {
  name: string
  color: string
  icon: string
}

export interface Budget {
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
  name: string
  color: string
  accounts: BankAccount[]
}

export type BankAccountType = 'CURRENT' | 'SAVINGS' | 'CREDIT_CARD'

export interface BankAccount {
  name: string
  type: BankAccountType
  balance: number
  currency: Currency
}

export interface Subscription {
  name: string
  amount: number
  currency: Currency
  startDate: string
  timeframe: Timeframe
  active?: boolean
  categoryId?: string
  serviceUrl?: string
}

export type TimeframeType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'

export interface Timeframe {
  type: TimeframeType
  value: number
}

export interface Revenue {
  name: string
  color: string
  amount: number
  currency: Currency
}

export interface Expense {
  name: string
  currency: Currency
  subscriptionId?: string
  categoryId?: string
}

export interface Lending {
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
  date: string
  amount: number
  currency: Currency
}

export type Liability = Lending

export interface Investment {
  name: string
  commitments: InvestmentCommitment[]
  date: DatePeriod
  expectedReward: Amount
}

export interface InvestmentCommitment {
  amount: number
  currency: Currency
  date: string
}

export interface Amount {
  amount: number
  currency: Currency
}
