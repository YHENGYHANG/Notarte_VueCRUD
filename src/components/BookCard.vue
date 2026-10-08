<script setup>
defineProps({ book: { type: Object, required: true } })
const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <article class="book-card">
    <div>
      <p class="book-title">{{ book.title }}</p>
      <p class="book-meta">by {{ book.author }} &bull; {{ book.year }}</p>
      <div class="tags">
        <span class="tag">{{ book.category }}</span>
        <span :class="['tag', book.status.toLowerCase()]">{{ book.status }}</span>
      </div>
    </div>
    <div class="card-actions">
      <button class="icon-btn" type="button" :aria-label="`Edit ${book.title}`" @click="emit('edit', book)">✏️</button>
      <button class="icon-btn delete" type="button" :aria-label="`Delete ${book.title}`" @click="emit('delete', book)">🗑️</button>
    </div>
  </article>
</template>
