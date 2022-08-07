import { initializeApp } from 'firebase/app'
import type { QueryConstraint } from 'firebase/database'
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

const connectionName = 'subscriptions'

const q = (connectionName: string, ...constraints: QueryConstraint[]) => rtdb.query(rtdb.ref(db, `users/${userId}/details/${connectionName}`), ...constraints).ref

export const buildQuery = (search: string | undefined, sort: string | undefined, order: 'asc' | 'desc', filters: FilterOptions<Record<string, any>>, limit: number, offset: number) => {
  const constraints: QueryConstraint[] = []

  if (search) {
    constraints.push(rtdb.orderByChild(connectionName))
    constraints.push(rtdb.startAt(search))
    constraints.push(rtdb.endAt(`${search}\uF8FF`))
  }

  if (sort)
    constraints.push(rtdb.orderByChild(sort))

  if (order === 'desc' && search) {
    constraints.push(rtdb.orderByChild(connectionName))
    constraints.push(rtdb.endAt(search))
  }

  if (filters.length > 0) {
    filters.forEach(({ name, label, values }) => {
      constraints.push(rtdb.orderByChild(name))
      constraints.push(rtdb.equalTo(value))
    })
  }

  return constraints
}

export const useProfile = createGlobalState(() => useRTDB<UserProfile>(rtdb.ref(db, `users/${userId}/profile`)))

export const useSubscriptions = () => {
  const listSubscriptions = (search: string | undefined, sort: string | undefined, order: 'asc' | 'desc', filters: FilterOptions<Record<string, any>>, limit: number, offset: number) => createGlobalState(
    () => useRTDB<SubscriptionListItem[]>(q('subscriptions', ...buildQuery(search, sort, order, filters, limit, offset))),
  )()

  const createSubscription = async (subscription: Subscription) => rtdb.push(rtdb.ref(db, `users/${userId}/details/` + 'subscriptions'), subscription)

  const getSubscription = async (id: string) => rtdb.get(rtdb.ref(db, `subscriptions/${id}`))

  const setSubscription = async (subscription: Subscription) => rtdb.set(rtdb.ref(db, `subscriptions/${subscription.id}`), subscription)

  const removeSubscription = async (id: string) => rtdb.remove(rtdb.ref(db, `subscriptions/${id}`))

  const sort = async () => {}

  const filter = async () => {}

  return { listSubscriptions, getSubscription, setSubscription, createSubscription, removeSubscription, sort, filter }
}

export const subscriptionsByName = useRTDB<Subscription[]>(q(`users/${userId}/details/subscriptions/list`, rtdb.orderByChild('currency')))

export const useTitle = createGlobalState(
  () => useRTDB<string>(rtdb.ref(db, 'title')),
)

export const defineConnectionOptions = <T>(options: ConnectionOptions<T>) => options
