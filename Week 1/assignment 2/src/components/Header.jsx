import React from "react";

function Header({ title, navItems }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top">{title}</a>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
