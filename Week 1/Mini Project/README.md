# My Blog

A small React blog interface that demonstrates reusable components, local JSON data, state, derived data, and dynamic rendering. Users can search article titles and excerpts, filter by category, combine both filters, and clear the current filters.

## Project Structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── CategoryFilter.jsx
│   ├── BlogCard.jsx
│   └── BlogList.jsx
├── data/
│   └── posts.json
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Components

- `Header` renders the site brand and simple navigation.
- `SearchBar` is a controlled input for the current search term.
- `CategoryFilter` renders unique categories from the post data.
- `BlogCard` displays one post received through props.
- `BlogList` maps over filtered posts and renders the empty state when needed.

## How It Works

The posts are imported directly from `src/data/posts.json` in `App.jsx`. Categories are derived from the posts with `map()` and `Set`, so the category options stay in sync with the data.

`searchTerm` and `selectedCategory` are managed with React `useState`. A `useMemo` value filters posts when either value changes. Search checks both each post's title and excerpt, while category filtering checks the selected category. The two conditions are combined so they can be used together.

The result count, clear button, blog cards, and empty state are all conditionally rendered from the current filtered data.

## React Concepts Practiced

- Functional components
- Props
- `useState`
- `useMemo`
- Controlled form inputs
- `map()` and unique keys
- Conditional rendering
- Derived data

## Run Locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite. To create a production build, run `npm run build`.
