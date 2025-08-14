# Resource Explorer

A small but polished React app to explore the **Rick & Morty API** with search, filter, sort, and favorites.

This project demonstrates **React fundamentals**, state management, data fetching, and modern UI/UX practices in a **Next.js** environment.

---

## Table of Contents

- [How to Run](#how-to-run)  
- [Architecture & Notes](#architecture--notes)  
- [Trade-offs & Design Decisions](#trade-offs--design-decisions)  
- [What I Would Ship Next](#what-i-would-ship-next)  
- [Summary](#summary)  

---

## How to Run

### Clone the repo

```bash
git clone https://github.com/AbdullahYounasDev/resource-explorer-project.git
cd resource-explorer-project
```
```bash
npm install
npm run dev
```

Open in browser
```bash
http://localhost:3000
```

The app is fully client-side, using Next.js App Router. Favorites are persisted in local storage.

##Architecture & Notes
File Structure
```bash
/app
 └─ page.tsx        # Home / list page
 └─ favorites.tsx   # Favorites page
 └─ [id]/page.tsx   # Character detail page

/components
 └─ CharacterGrid.tsx
 └─ Pagination.tsx
 └─ SearchAndFilter.tsx
 └─ LoadingState.tsx
 └─ ErrorState.tsx
 └─ EmptyState.tsx

/hooks
 └─ useFavorites.ts
 └─ useDebounce.ts

/lib
 └─ api.ts          # Axios instance

/font.ts       # Theme provider
```


Key Concepts Implemented

Data Fetching & Caching
Uses React Query for fetching characters and caching results.
Supports request cancellation when search/filter inputs change.

URL Sync for State
Search, filters, sorting, and pagination are reflected in the URL.
Directly visiting a URL recreates the page state.

Favorites
Users can mark items as favorites from both list and detail pages.
Favorites stored in localStorage and reflected instantly in UI.

Theming
Supports light and dark themes with dynamic class names.
Theme is persistent across pages via a context provider.

UX Improvements
Loading, error, and empty states handled gracefully.
Debounced search (400ms) to reduce unnecessary API calls.
Animated transitions and hover effects using Framer Motion.

Trade-offs & Design Decisions

Pagination
Implemented standard paginated list for simplicity. Infinite scroll could be added but wasn’t necessary for 20–40 items per page.

Scroll memory / Back Navigation
Not fully implemented due to time constraints. Scroll resets when navigating back.

Favorites Persistence
Chose localStorage for simplicity. IndexedDB could handle large datasets but overkill here.

Accessibility
Alt text is present for images.
Focus/keyboard navigation partially implemented; could be improved in production.

Data Fetching
Used React Query with Axios and AbortController for in-flight cancellation.
Could add caching & background refetch for more efficiency.

What I Would Ship Next
If I had more time, I would implement:
Back/forward scroll memory
Preserve scroll position when user navigates between pages.
Optimistic UI updates for favorites
Make UI respond immediately while updating localStorage asynchronously.
Code splitting for detail page
Use Next.js dynamic imports for faster initial load.
Accessibility improvements
Full keyboard navigation, focus outlines, ARIA labels.
Episode / Character Notes Form
Allow users to add personal notes for each character in detail view.
E2E Tests
Basic smoke tests using Cypress or Playwright for main flows.

Summary
This app demonstrates a small but complete React project with modern UX: search, filter, sort, detail view, favorites, loading/error handling, and theme support.
The project is extendable, modular, and ready for future improvements.
