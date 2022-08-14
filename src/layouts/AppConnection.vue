<template>
  <section class="app-connection">
    <app-search-input v-if="options.actions.list.searchOption" v-model="search" />
    <div class="filter-chips">
      <app-filter-chip
        v-for="({ name, label, values }, id) in options.actions.list.filterOptions" :key="name"
        v-model="filters[id]" class="filter" :label="label" :name="name" :items="values"
      />
      <app-filter-chip
        v-if="options.actions.list.sortOptions" v-model="sort" label="Sort by..."
        :items="options.actions.list.sortOptions"
      />
    </div>
    <div class="items">
      <v-progress-circular v-if="items === undefined" class="loading" />
      <slot v-if="items" v-bind="{ items }" />
      <div v-if="items && items.length === 0" class="none">
        🕸 No {{ options.connectionName }} added.
        <v-btn>Add {{ options.connectionName.slice(0, -1) }}</v-btn>
      </div>
      <div v-if="items && items.length === 0" class="none">
        🕸 No {{ options.connectionName }} found with the search criteria.
      </div>
      <!-- <md-filled-button v-if="options.actions.create" prepend-icon="add">
        Add
      </md-filled-button> -->
      <md-fab v-if="options.actions.create" prepend-icon="add">
        Add
        <app-dialog v-model="dialog" :title="options.actions.create.title" />
      </md-fab>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import MdFilledButton from '../../../vuetify-md3/md-button/MdFilledButton.vue'
import MdFab from '../../../vuetify-md3/md-fab/MdFab.vue'
import AppDialog from './AppDialog.vue'
import type { ConnectionOptions } from '~/types'

const props = defineProps({
  options: {
    type: Object as PropType<ConnectionOptions<any>>,
    required: true,
  },
})

// const emit = defineEmits({});

const search = ref('')

const itemName = computed(() => {
  return props.options.connectionName.slice(0, -1)
})

const dialog = ref(false)

const sort = ref<string | undefined>()

// TODO: Bulk actions & selection
// TODO: Mobile: Swipe actions / hold to select

const order = ref<'asc' | 'desc'>('asc')

const limit = ref<number>(20)

const offset = ref<number>(0)

const filters = ref<{
  [key in typeof props.options.actions.list['filterOptions']]: string | undefined
}[]>([])

const items = computed(() => props.options.actions.list.query(search.value/* , sort.value, filters.value, limit.value, offset.value */, props.options.actions.list.searchOption ?? '').value)

// const items = computed(() => items.value?.filter((item) => {
//   if (search.value && props.options.actions.list.searchOption)
//     return item[props.options.actions.list.searchOption].toLowerCase().includes(search.value.toLowerCase())

//   return true
// }) ?? [])
</script>

<style lang="scss" scoped>
.app-connection {
  .filter-chips {
    display: flex;
    align-items: center;
    gap: 1em;
    padding: 1em;
  }
  .items {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
  }
}
</style>
