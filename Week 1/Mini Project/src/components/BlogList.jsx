import BlogCard from "./BlogCard";

function BlogList({ posts }) {
  if (posts.length === 0) {
    return (
      <section className="empty-state" aria-live="polite">
        <span className="empty-mark" aria-hidden="true">—</span>
        <h2>No articles found.</h2>
        <p>Try a different search term or category.</p>
      </section>
    );
  }

  return (
    <section className="blog-grid" aria-label="Blog articles">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </section>
  );
}

export default BlogList;
