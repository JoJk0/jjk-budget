import { initializeApp } from 'firebase/app'
import type { DatabaseReference, QueryConstraint } from 'firebase/database'
import { onValue } from 'firebase/database'
import * as rtdb from 'firebase/database'
import { useRTDB } from '@vueuse/firebase/useRTDB'
import { createGlobalState } from '@vueuse/core'
import type { ConnectionOptions, FilterOptions } from '~/types'
import firebaseConfig from '~/firebase'
import type { Subscription, UserProfile } from '~/types/entities'
import type { SubscriptionListItem } from '~/types/list-items'

const app = initializeApp(firebaseConfig)

const db = rtdb.getDatabase(app)

const userId = '0'

const q = (connectionName: string, type: 'list' | 'details', ...constraints: QueryConstraint[]) => rtdb.query(rtdb.ref(db, `users/${userId}/details/${connectionName}/${type}`), ...constraints)

export const buildQuery = (search: string | undefined, searchOption: string /* , sort: string | undefined, filters: FilterOptions<Record<string, any>>, limit: number, offset: number */) => {
  const constraints: QueryConstraint[] = []

  if (search) {
    constraints.push(rtdb.orderByChild(searchOption))
    constraints.push(rtdb.startAt(search))
    constraints.push(rtdb.endAt(`${search}\uF8FF`))
  }

  console.log(constraints)

  // if (sort)
  //   constraints.push(rtdb.orderByChild(sort))

  // if (filters.length > 0) {
  //   filters.forEach(({ name, label, values }) => {
  //     constraints.push(rtdb.orderByChild(name))
  //     constraints.push(rtdb.equalTo(value))
  //   })
  // }

  return constraints
}

export const useProfile = createGlobalState(() => useRTDB<UserProfile>(rtdb.ref(db, `users/${userId}/profile`)))

export const subscriptions = {
  list: (search: string | undefined, searchOption: string/* , sort: string | undefined, filters: FilterOptions<Record<string, any>>, limit: number, offset: number */) => createGlobalState(
    () => useRTDB<SubscriptionListItem[]>(q('subscriptions', 'list', ...buildQuery(search, searchOption/* , sort, filters, limit, offset */)) as DatabaseReference),
  )(),

  create: async (subscription: Subscription) => rtdb.push(rtdb.ref(db, `users/${userId}/details/` + 'subscriptions'), subscription),

  get: async (id: string) => rtdb.get(rtdb.ref(db, `subscriptions/${id}`)),

  set: async (subscription: Subscription) => rtdb.set(rtdb.ref(db, `subscriptions/${subscription.id}`), subscription),

  remove: async (id: string) => rtdb.remove(rtdb.ref(db, `subscriptions/${id}`)),
}

// export const subscriptionsByName = useRTDB<Subscription[]>(q('subscriptions', 'list', rtdb.orderByChild('currency')) as DatabaseReference)

export const useTitle = createGlobalState(
  () => useRTDB<string>(rtdb.ref(db, 'title')),
)

export const defineConnectionOptions = <T>(options: ConnectionOptions<T>) => options
