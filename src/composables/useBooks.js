import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { categories, emptyBookForm, seedBooks, STORAGE_KEY } from '../data/books'

function loadBooks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) return parsed
    }
  } catch (error) {
    console.error('Could not load saved books:', error)
  }
  return seedBooks.map(book => ({ ...book }))
}

export function useBooks() {
  const books = ref(loadBooks())
  const editingId = ref(null)
  const formError = ref('')
  const toastMessage = ref('')
  const searchQuery = ref('')
  const filterCategory = ref('')
  const filterStatus = ref('')
  const form = ref(emptyBookForm())
  let toastTimer

  watch(books, newBooks => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newBooks))
    } catch (error) {
      console.error('Could not save books:', error)
      showToast('Unable to save changes in browser storage.')
    }
  }, { deep: true })

  const stats = computed(() => ({
    total: books.value.length,
    available: books.value.filter(book => book.status === 'Available').length,
    borrowed: books.value.filter(book => book.status === 'Borrowed').length,
    categories: new Set(books.value.map(book => book.category)).size,
  }))

  const filteredBooks = computed(() => {
    const search = searchQuery.value.trim().toLowerCase()
    return books.value.filter(book => {
      const matchesSearch = !search || book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search)
      const matchesCategory = !filterCategory.value || book.category === filterCategory.value
      const matchesStatus = !filterStatus.value || book.status === filterStatus.value
      return matchesSearch && matchesCategory && matchesStatus
    })
  })

  function showToast(message) {
    toastMessage.value = message
    window.clearTimeout(toastTimer)
    toastTimer = window.setTimeout(() => { toastMessage.value = '' }, 2200)
  }

  function resetForm() {
    editingId.value = null
    form.value = emptyBookForm()
    formError.value = ''
  }

  function submitBook() {
    const title = form.value.title.trim()
    const author = form.value.author.trim()
    const category = form.value.category
    const year = Number(form.value.year)
    const status = form.value.status
    const currentYear = new Date().getFullYear()

    if (!title || !author || !category || form.value.year === '' || !Number.isInteger(year) || year < 1000 || year > currentYear) {
      formError.value = `Complete all fields and enter a valid publication year (1000–${currentYear}).`
      return
    }

    formError.value = ''
    const data = { title, author, category, year, status }
    if (editingId.value !== null) {
      const index = books.value.findIndex(book => book.id === editingId.value)
      if (index !== -1) books.value[index] = { ...books.value[index], ...data }
      showToast('Book updated successfully.')
    } else {
      books.value.unshift({ id: `b${Date.now()}${Math.random().toString(36).slice(2, 6)}`, ...data })
      showToast('Book added successfully.')
    }
    resetForm()
  }

  function editBook(book) {
    editingId.value = book.id
    form.value = { title: book.title, author: book.author, category: book.category, year: String(book.year), status: book.status }
    formError.value = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function deleteBook(book) {
    if (!window.confirm(`Delete "${book.title}"? This cannot be undone.`)) return
    books.value = books.value.filter(item => item.id !== book.id)
    if (editingId.value === book.id) resetForm()
    showToast('Book deleted successfully.')
  }

  function resetDemoData() {
    if (!window.confirm('Reset the collection to the original demo books? This replaces your current collection.')) return
    books.value = seedBooks.map(book => ({ ...book }))
    resetForm()
    searchQuery.value = ''
    filterCategory.value = ''
    filterStatus.value = ''
    showToast('Demo data restored.')
  }

  onBeforeUnmount(() => window.clearTimeout(toastTimer))

  return {
    books, categories, editingId, formError, toastMessage, searchQuery,
    filterCategory, filterStatus, form, stats, filteredBooks, resetForm,
    submitBook, editBook, deleteBook, resetDemoData,
  }
}
