import { createFetch } from '@vueuse/core'
import { fixerApiKey } from '~/env'

export const useCurrencyConverter = (fromCurrency?: Currency, toCurrency?: Currency, amount?: number) => {
  const fromCurrencyRef = ref(fromCurrency)
  const toCurrencyRef = ref(toCurrency)
  const amountRef = ref(amount)

  const conversionRate = ref<number>()

  const convertedAmount = computed(() => {
    if (amountRef.value && conversionRate.value)
      return amountRef.value * conversionRate.value

    return undefined
  })

  const baseUrl = new URL('https://api.apilayer.com/fixer/latest')
  baseUrl.searchParams.set('symbols', symbols)
  baseUrl.searchParams.set('base', base)

  const useFetch = createFetch({
    baseUrl: baseUrl.toString(),
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

  const { isFetching, error, data } = useFetch(baseUrl.toString(), { immediate: false })

  return {
    fromCurrency: fromCurrencyRef,
    toCurrency: toCurrencyRef,
    amount: amountRef,
    convertedAmount,
    conversionRate,
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
