import { useMemo, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import BlogList from "./components/BlogList";
import posts from "./data/posts.json";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(posts.map((post) => post.category))];

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const searchableText = `${post.title} ${post.excerpt}`.toLowerCase();
      const matchesSearch = searchableText.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  return (
    <div className="app-shell">
      <Header />

      <main id="home">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">Notes on making things for the web</p>
          <h1 id="page-title">Ideas worth <em>sharing.</em></h1>
          <p className="intro-copy">
            A small collection of practical lessons, experiments, and thoughts
            from the process of learning to build better software.
          </p>
        </section>

        <section className="controls" id="blog" aria-label="Blog filters">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </section>

        <div className="results-bar" aria-live="polite">
          <p>
            <strong>{filteredPosts.length}</strong>{" "}
            {filteredPosts.length === 1 ? "article" : "articles"} found
          </p>
          {(searchTerm || selectedCategory !== "All") && (
            <button className="clear-button" type="button" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>

        <BlogList posts={filteredPosts} />
      </main>

      <footer className="site-footer" id="about">
        <span>Built with React and curiosity.</span>
        <span>2026</span>
      </footer>
    </div>
  );
}

export default App;
