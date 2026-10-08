export const STORAGE_KEY = 'booknest_books_v1'

export const categories = [
  'Fiction',
  'Science',
  'Technology',
  'Reference',
  'History',
  'Biography',
]

export const seedBooks = [
  { id: 'b101', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', year: 1925, status: 'Available' },
  { id: 'b102', title: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', year: 2008, status: 'Borrowed' },
  { id: 'b103', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', year: 1988, status: 'Available' },
  { id: 'b104', title: 'The Diary of a Young Girl', author: 'Anne Frank', category: 'Biography', year: 1947, status: 'Available' },
]

export const emptyBookForm = () => ({
  title: '',
  author: '',
  category: '',
  year: '',
  status: 'Available',
})
