import type { CreateGlobalStateReturn } from '@vueuse/core'
import type { QueryConstraint } from 'firebase/database'
import type { DefineComponent, Ref } from 'vue'
import type { Subscription, User } from './entities'

export interface Env {
  fixerApiKey: string
}

export interface AppData {
  title: string
  description: string
  primary: string
  secondary: string
  tertiary: string
  users: User[]
}

export interface DataConnection<T extends U, U> {
  list: U[]
  details: (Omit<T, keyof U>)[]
}

export type ConnectionGetterFunction<T> = CreateGlobalStateReturn<Ref<T[] | undefined>>

export interface ConnectionOptions<TListItem> {
  connectionName: string
  actions: {
    list: ConnectionListOptions<TListItem>
    create?: {
      mutation: Function
      fields: (ItemField | ItemSection)[]
    }
    delete?: {
      mutation: Function
    }
    get?: {
      query: Function
      fields: (ItemField | ItemSection)[]
    }
    set?: {
      mutation: Function
      fields: (ItemField | ItemSection)[]
    }
  }
}

export interface ConnectionListOptions<TListItem> {
  query: ConnectionGetterFunction<TListItem>
  sortOptions?: SortOptions<TListItem>
  filterOptions?: FilterOptions<TListItem>
  searchOption?: keyof TListItem
}

export interface ItemField {
  __typename: 'ItemField'
  name: string
  label: string
  component: DefineComponent
  required?: boolean
  disabled?: boolean
}

export interface ItemSection {
  __typename: 'ItemSection'
  name: string
  label: string
  fields: ItemField[]
}

export type SortOptions<T> = {
  value: keyof T
  label: string
}[]

export type Sort<T> = keyof T

export type FilterOptions<T extends Record<string, any>> = {
  [K in keyof T as number]: {
    name: K
    label: string
    filterFn: FilterFunction<K>
    values: SortOptions<T[K]>
  }
}

export type FilterFunction<TName extends string | number | Symbol = string> = (name: TName, value: string) => QueryConstraint[]

export type Filters<T extends Record<string, any>> = {
  name: keyof T
  value: string
}[]

// export interface RangeOptions {
//   __typename: 'RangeOptions'
//   min: {
//     label: string
//     value: string
//   }
//   max: {
//     label: string
//     value: string
//   }
// }

// export interface Range {
//   min: string
//   max: string
// }
