import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Button from "./components/Button";
import Form from "./components/Form";
import "./App.css";

const navItems = ["Home", "Projects", "Contact"];

const projects = [
  {
    id: 1,
    title: "AI Code Reviewer",
    description: "AI-powered code review application.",
    category: "Full Stack"
  },
  {
    id: 2,
    title: "Chat App",
    description: "Real-time messaging application.",
    category: "React"
  },
  {
    id: 3,
    title: "Bank System",
    description: "Console-based banking application.",
    category: "C++"
  }
];

function App() {
  const [showProjects, setShowProjects] = useState(true);

  function handleToggleProjects() {
    setShowProjects((currentValue) => !currentValue);
  }

  return (
    <div className="app-shell" id="top">
      <Header title="Component Practice" navItems={navItems} />

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">React.js / practice lab</p>
            <h1>Small components.<br /><em>Clear thinking.</em></h1>
            <p className="hero-text">A hands-on example of props, state, events, and dynamic rendering working together.</p>
          </div>
          <div className="hero-note">
            <span>01</span>
            <p>Reusable UI is easier to understand when every piece has one clear job.</p>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading projects-heading">
            <div>
              <p className="eyebrow">Dynamic rendering</p>
              <h2>Projects</h2>
            </div>
            <Button
              text={showProjects ? "Hide Projects" : "Show Projects"}
              variant="secondary"
              onClick={handleToggleProjects}
              aria-expanded={showProjects}
            />
          </div>

          {showProjects && (
            <div className="card-grid">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  category={project.category}
                />
              ))}
            </div>
          )}
        </section>

        <Form />
      </main>

      <Footer name="Krishnendu Das" year={2026} />
    </div>
  );
}

export default App;
