import React from "react";

function Card({ title, description, category }) {
  return (
    <article className="project-card">
      <span className="card-category">{category}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default Card;
