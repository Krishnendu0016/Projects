function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <label className="category-field">
      <span>Category</span>
      <select
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </label>
  );
}

export default CategoryFilter;
