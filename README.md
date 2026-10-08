# BookNest Vue CRUD

A component-based BookNest library CRUD app built with Vue 3 and Vite. Book records are stored in browser `localStorage`.

## Requirements

- Node.js 18+ (Node.js 20+ recommended)
- npm

## Run locally

1. Extract this ZIP.
2. Open the `BookNestVue` folder in VS Code.
3. Open the integrated terminal in that folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (usually `http://localhost:5173/`).

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
BookNestVue/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.vue                 # Composes the page from feature components
    ├── main.js                 # Vue entry point and global stylesheet
    ├── assets/
    │   └── main.css            # Shared app styling
    ├── components/
    │   ├── AppHeader.vue       # Brand and reset action
    │   ├── HeroSection.vue     # Intro/hero section
    │   ├── StatsCards.vue      # Collection statistics
    │   ├── BookForm.vue        # Add/edit form and validation display
    │   ├── BookCollection.vue  # Collection panel and list composition
    │   ├── BookToolbar.vue     # Search and filters
    │   ├── BookCard.vue        # Single book record and CRUD actions
    │   ├── EmptyState.vue     # No-results state
    │   └── ToastNotification.vue # Status feedback
    ├── composables/
    │   └── useBooks.js         # CRUD state, filtering, storage, and actions
    └── data/
        └── books.js            # Categories, seed records, and form defaults
```

## Features

- Create, read, update, and delete book records
- Search by title or author
- Filter by category and availability status
- Live summary counts
- Local browser persistence
- Restore the demo collection
- Responsive layout
