function BlogCard({ post }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(new Date(`${post.date}T00:00:00`));

  return (
    <article className="blog-card">
      <div className="card-topline">
        <span className="category-tag">{post.category}</span>
        <span className="card-number">0{post.id}</span>
      </div>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <footer className="card-footer">
        <span>{post.author}</span>
        <span>{formattedDate} <b aria-hidden="true">·</b> {post.readTime}</span>
      </footer>
    </article>
  );
}

export default BlogCard;
