<script setup>
import BookToolbar from './BookToolbar.vue'
import BookCard from './BookCard.vue'
import EmptyState from './EmptyState.vue'

defineProps({
  books: { type: Array, required: true },
  categories: { type: Array, required: true },
})
const searchQuery = defineModel('searchQuery', { type: String, default: '' })
const filterCategory = defineModel('filterCategory', { type: String, default: '' })
const filterStatus = defineModel('filterStatus', { type: String, default: '' })
const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="panel list-panel">
    <div class="panel-heading list-heading">
      <div><p class="eyebrow">BOOK COLLECTION</p><h2>Library Records</h2></div>
      <span class="record-count">{{ books.length }} {{ books.length === 1 ? 'record' : 'records' }}</span>
    </div>
    <BookToolbar
      v-model:search-query="searchQuery"
      v-model:filter-category="filterCategory"
      v-model:filter-status="filterStatus"
      :categories="categories"
    />
    <div v-if="books.length" class="book-list" aria-live="polite">
      <BookCard v-for="book in books" :key="book.id" :book="book" @edit="emit('edit', $event)" @delete="emit('delete', $event)" />
    </div>
    <EmptyState v-else />
  </div>
</template>
