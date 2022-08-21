import type { CreateGlobalStateReturn } from '@vueuse/core'
import type { QueryConstraint } from 'firebase/database'
import type { DefineComponent, Ref } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
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

export type ConnectionGetterFunction<T> = (search: string | undefined, searchOption: string /* , sort: string | undefined, filters: FilterOptions<T>, limit: number, offset: number */) => Ref<T[] | undefined>

export interface ConnectionOptions<TListItem extends Record<string, string>> {
  connectionName: string
  actions: {
    list: ConnectionListOptions<TListItem>
    create?: {
      title: string
      mutation: Function
      fields: (ItemField<keyof TListItem & string> | ItemSection)[]
    }
    delete?: {
      mutation: Function
    }
    details?: {
      route: RouteLocationRaw
    }
    set?: {
      mutation: Function
      fields: (ItemField<keyof TListItem & string> | ItemSection)[]
    }
  }
}

export interface ItemDetailsOptions<T> {
  query: Function
  component: DefineComponent
  fields: (ItemField < keyof T & string > | ItemSection)[]
}

export interface ConnectionListOptions<TListItem> {
  query: ConnectionGetterFunction<TListItem>
  sortOptions?: SortOptions<TListItem>
  filterOptions?: FilterOptions<TListItem>
  searchOption?: keyof TListItem
}

export interface ItemField<TName extends string = string> {
  __typename: 'ItemField'
  name: TName
  label: string
  component: DefineComponent
  required?: boolean
  disabled?: boolean
  help?: boolean
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
