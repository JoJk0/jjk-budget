<template>
  <div>
    <v-card-title>Budgets</v-card-title>
    <router-link to="/budget/0">
      View budget
    </router-link>
  </div>
</template>

<script setup lang="ts">
const name = $ref('')

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}
</script>
