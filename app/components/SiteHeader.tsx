type SiteHeaderProps = {
  menuOpen: boolean;
  scrolled: boolean;
  onCloseMenu: () => void;
  onToggleMenu: () => void;
};

export function SiteHeader({ menuOpen, scrolled, onCloseMenu, onToggleMenu }: SiteHeaderProps) {
  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <a className="wordmark" href="#top" aria-label="Visual Heights Media home">
        <span className="wordmark__monogram wordmark__monogram--image" aria-hidden="true"><img src="/vhm-monogram-gold.png?v=3" alt="" /></span><span className="wordmark__name">Visual Heights</span>
      </a>
      <nav className={`nav-links${menuOpen ? " nav-links--open" : ""}`} aria-label="Primary navigation">
        <a href="#work" onClick={onCloseMenu}>Work</a><a href="#services" onClick={onCloseMenu}>Services</a>
        <a href="#about" onClick={onCloseMenu}>Studio</a><a className="nav-links__contact" href="#contact" onClick={onCloseMenu}>Start a project</a>
      </nav>
      <button className={`menu-button${menuOpen ? " menu-button--open" : ""}`} type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={onToggleMenu}>
        <span /><span />
      </button>
    </header>
  );
}
