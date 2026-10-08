<script setup>
defineProps({ categories: { type: Array, required: true } })
const searchQuery = defineModel('searchQuery', { type: String, default: '' })
const filterCategory = defineModel('filterCategory', { type: String, default: '' })
const filterStatus = defineModel('filterStatus', { type: String, default: '' })
</script>

<template>
  <div class="toolbar">
    <input v-model="searchQuery" type="search" placeholder="Search title or author..." aria-label="Search title or author" />
    <select v-model="filterCategory" aria-label="Filter by category">
      <option value="">All categories</option>
      <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
    </select>
    <select v-model="filterStatus" aria-label="Filter by status">
      <option value="">All statuses</option>
      <option value="Available">Available</option>
      <option value="Borrowed">Borrowed</option>
    </select>
  </div>
</template>
