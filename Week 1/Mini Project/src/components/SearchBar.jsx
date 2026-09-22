function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <label className="search-field">
      <span className="sr-only">Search articles</span>
      <span className="search-icon" aria-hidden="true">/</span>
      <input
        type="search"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </label>
  );
}

export default SearchBar;
