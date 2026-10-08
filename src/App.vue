<script setup>
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import StatsCards from './components/StatsCards.vue'
import BookForm from './components/BookForm.vue'
import BookCollection from './components/BookCollection.vue'
import ToastNotification from './components/ToastNotification.vue'
import { useBooks } from './composables/useBooks'

const {
  categories, editingId, formError, toastMessage, searchQuery,
  filterCategory, filterStatus, form, stats, filteredBooks, resetForm,
  submitBook, editBook, deleteBook, resetDemoData,
} = useBooks()
</script>

<template>
  <AppHeader :on-reset-demo="resetDemoData" />
  <main class="container">
    <HeroSection />
    <StatsCards :stats="stats" />
    <section class="workspace">
      <BookForm
        :form="form"
        :categories="categories"
        :editing="editingId !== null"
        :error="formError"
        @submit="submitBook"
        @clear="resetForm"
      />
      <BookCollection
        v-model:search-query="searchQuery"
        v-model:filter-category="filterCategory"
        v-model:filter-status="filterStatus"
        :books="filteredBooks"
        :categories="categories"
        @edit="editBook"
        @delete="deleteBook"
      />
    </section>
  </main>
  <ToastNotification :message="toastMessage" />
  <footer>BookNest CRUD &bull; Built with Vue 3</footer>
</template>
