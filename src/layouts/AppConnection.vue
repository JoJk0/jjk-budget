<template>
  <section class="app-connection">
    <md-filled-button v-if="options.actions.create" prepend-icon="add">
      Add
    </md-filled-button>
    <app-search-input v-if="options.actions.list.searchOption" v-model="search" />
    <div class="filter-chips">
      <app-filter-chip
        v-for="{ value, label, items } in options.actions.list.filterOptions"
        :key="value" v-model="filters[value]" class="filter"
        :label="label"
        :name="value"
        :items="items"
      />
      <app-filter-chip
        v-if="options.actions.list.sortOptions" v-model="sort" label="Sort by..."
        :items="options.actions.list.sortOptions"
      />
    </div>
    <div class="items">
      <v-progress-circular v-if="items === undefined" class="loading" />
      <slot v-if="items && items.length > 0 " v-bind="{ items }" />
      <div v-if="items && items.length === 0" class="none">
        🕸 No {{ options.connectionName }} added.
        <v-btn>Add {{ options.connectionName.slice(0, -1) }}</v-btn>
      </div>
      <div v-if="items && items.length === 0" class="none">
        🕸 No {{ options.connectionName }} found with the search criteria.
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import MdFilledButton from '../../../vuetify-md3/md-button/MdFilledButton.vue'
import AppNav from './AppNav.vue'
import type { ConnectionGetterFunction, ConnectionOptions } from '~/types'
const props = defineProps({
  options: {
    type: Object as PropType<ConnectionOptions<ConnectionGetterFunction<any>>>,
    required: true,
  },
})

// const emit = defineEmits({});

const search = ref('')

const sort = ref<string | undefined>()

const order = ref<'asc' | 'desc'>('asc')

const limit = ref<number>(20)

const offset = ref<number>(0)

const filters = ref<{
  [key in typeof props.options.actions.list['filterOptions']]: string | undefined
}[]>([])

const items = computed(() => props.options.actions.list.query(search.value, sort.value, order.value, filters.value, limit.value, offset.value).value)

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
