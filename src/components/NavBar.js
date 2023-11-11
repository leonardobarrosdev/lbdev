import { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/img/logobldev.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { BrowserRouter as Router } from 'react-router-dom';

export function NavBar() {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if(window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onUpdateActiveLink(value) {
    setActiveLink(value);
  }

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled py-2" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo LBDEV | Leonardo Barros Developer" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
              <span className='navbar-toggler-icon'></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === "home" ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink("home")}>Início</Nav.Link>
              {/* <Nav.Link href="#skills" className={activeLink === "skills" ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink("skills")}>Skills</Nav.Link> */}
              <Nav.Link href="#projects" className={activeLink === "projects" ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink("projects")}>Projetos</Nav.Link>
              <Nav.Link href="#contact" className={activeLink === "contact" ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink("contact")}>Contate-me</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="https://www.linkedin.com/in/leonardo-barros-da-silva-741b9b196/"><img src={navIcon1} alt="Linkedin profile" target="_blank" /></a>
                <a href="https://www.facebook.com/leonardo.barrossilva.3"><img src={navIcon2} alt="Facebook profile" target="_blank" /></a>
                <a href="https://www.instagram.com/leonardobarrosdev/"><img src={navIcon3} alt="Instagram profile" target="_blank" /></a>
              </div>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  );
}
