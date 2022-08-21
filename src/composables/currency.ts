import { createFetch } from '@vueuse/core'
import type { Dinero, Transformer } from 'dinero.js'
import { allocate, convert, dinero, toFormat } from 'dinero.js'
import * as currencies from '@dinero.js/currencies'
import { fixerApiKey } from '~/env'

export function intlFormat<T>(dineroObject: Dinero<T>, locale: string, options = {}) {
  const transformer: Transformer<T> = ({ amount, currency }) => {
    return amount.toLocaleString(locale, {
      ...options,
      style: 'currency',
      currency: currency.code,
    })
  }

  return toFormat(dineroObject, transformer)
}

export const useCurrencyConverter = <TAmount>(amount: Dinero<TAmount>, toCurrency?: currencies.Currency<TAmount>) => {
  const userSettings = useUserSettings()
  const base = computed(() => userSettings.value ? currencies[userSettings.value.currency] : undefined)

  // const refreshRate = 60
  const apiUrl = 'https://api.apilayer.com/fixer/latest'
  const symbols = 'USD,EUR,GBP,AUD,CAD,PLN,SEK,NOK,CHF,CZK,DKK,HKD,HUF,ILS,JPY,MXN,MYR,NZD,PHP,SGD,THB,TRY,ZAR'
  const locale = 'en-GB'

  const baseUrl = computed(() => {
    if (!base.value)
      return
    const u = new URL(apiUrl)
    u.searchParams.set('symbols', symbols)
    u.searchParams.set('base', base.value.code)
    return u
  })

  const useCurrencyRates = createFetch({
    baseUrl: () => baseUrl.value ? baseUrl.value.toString() : '',
    options: {
      async beforeFetch({ options }) {
        if (!options.headers)
          return { options }
        options.headers.apikey = fixerApiKey
        return { options }
      },
    },
    fetchOptions: {
      method: 'GET',
      mode: 'cors',
    },
  })

  const { isFetching, error, data } = useCurrencyRates<FixerLatestResponse>(baseUrl.value.toString(), { immediate: false })

  const toCurrencyRef = ref(toCurrency)
  const amountRef = ref(amount)

  const rates = computed(() => data.value?.rates)

  const convertedAmount = computed(() => toCurrencyRef.value ? convert<TAmount>(amountRef.value, toCurrencyRef.value, rates.value) : undefined)

  const localeAmount = computed(() => convertedAmount.value ? intlFormat(convertedAmount.value, locale) : undefined)

  return {
    toCurrency: toCurrencyRef,
    amount: amountRef,
    convertedAmount,
    localeAmount,
    isFetching,
    error,
  }
}

export type Currency = 'GBP' | 'EUR' | 'PLN' | 'USD' | 'TRY' | 'ARS' | 'INR' | 'CAD' | 'JPY' | 'MXN' | 'NOK' | 'RUB' | 'SEK' | 'CHF'

export interface FixerLatestResponse {
  'base': Currency
  'date': string
  'rates': Record<Currency, number>
  'success': boolean
  'timestamp': number
}
