import React from "react";

function Footer({ name, year }) {
  return (
    <footer className="site-footer">
      <p>© {year} {name}</p>
    </footer>
  );
}

export default Footer;
