<script setup>
import { computed } from 'vue'

defineProps({
  form: { type: Object, required: true },
  categories: { type: Array, required: true },
  editing: { type: Boolean, default: false },
  error: { type: String, default: '' },
})
const emit = defineEmits(['submit', 'clear'])
const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <div class="panel form-panel">
    <div class="panel-heading">
      <div><p class="eyebrow">CRUD FORM</p><h2>{{ editing ? 'Edit Book' : 'Add a Book' }}</h2></div>
      <span v-if="editing" class="badge">EDITING</span>
    </div>
    <form novalidate @submit.prevent="emit('submit')">
      <label>Book Title
        <input v-model.trim="form.title" type="text" placeholder="e.g. The Great Gatsby" maxlength="100" required />
      </label>
      <label>Author
        <input v-model.trim="form.author" type="text" placeholder="e.g. F. Scott Fitzgerald" maxlength="80" required />
      </label>
      <div class="two-col">
        <label>Category
          <select v-model="form.category" required>
            <option value="">Select category</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </label>
        <label>Year Published
          <input v-model="form.year" type="number" min="1000" :max="currentYear" step="1" placeholder="2024" required />
        </label>
      </div>
      <label>Status
        <select v-model="form.status" required>
          <option value="Available">Available</option>
          <option value="Borrowed">Borrowed</option>
        </select>
      </label>
      <p v-if="error" class="form-error" role="alert">{{ error }}</p>
      <p v-else class="form-error" aria-hidden="true"></p>
      <div class="form-actions">
        <button class="secondary-btn" type="button" @click="emit('clear')">Clear</button>
        <button class="primary-btn" type="submit">{{ editing ? 'Save Changes' : 'Add Book' }}</button>
      </div>
    </form>
  </div>
</template>
