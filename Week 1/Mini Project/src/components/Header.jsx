function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="My Blog home">
        <span className="brand-mark">M</span>
        <span>My Blog</span>
      </a>
      <nav aria-label="Main navigation">
        <a className="active" href="#home">Home</a>
        <a href="#blog">Blog</a>
        <a href="#about">About</a>
      </nav>
    </header>
  );
}

export default Header;
