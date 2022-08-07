import type { Subscription } from './entities'

export type SubscriptionListItem = Pick<Subscription, 'name' | 'currency' | 'amount' | 'serviceUrl'>
