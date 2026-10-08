<script setup>
defineProps({ stats: { type: Object, required: true } })
const cards = [
  { key: 'total', label: 'Total Books' },
  { key: 'available', label: 'Available' },
  { key: 'borrowed', label: 'Borrowed' },
  { key: 'categories', label: 'Categories' },
]
</script>

<template>
  <section class="stats" aria-label="Library statistics">
    <article v-for="card in cards" :key="card.key">
      <span>{{ card.label }}</span><strong>{{ stats[card.key] }}</strong>
    </article>
  </section>
</template>
