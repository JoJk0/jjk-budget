import type { UseRTDBOptions } from '@vueuse/firebase'
import type { DataSnapshot, Query } from 'firebase/database'
import { onValue } from 'firebase/database'
import type { Ref } from 'vue'

export * from './dark'

export function useRTDBQuery<T = any>(
  query: Query,
  options: UseRTDBOptions = {},
) {
  const {
    autoDispose = true,
  } = options
  const data = ref(undefined) as Ref<T | undefined>

  function update(snapshot: DataSnapshot) {
    data.value = snapshot.val()
  }

  const off = onValue(query, update)

  if (autoDispose)
    tryOnScopeDispose(() => off())

  return data
}
