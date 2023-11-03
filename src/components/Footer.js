import { Container, Row, Col } from 'react-bootstrap';
import { MailchimpForm } from './MailchimpForm';
import logo from '../assets/img/logobldev.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';

export function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row className="align-items-center">
                    <MailchimpForm />
                    <Col size={12} sm={6}>
                        <img src={logo} alt="Logo LBDEV" />
                    </Col>
                    <Col size={12} sm={6} className="text-center text-sm-end">
                        <div className="social-icon">
                            <a href="https://www.linkedin.com/in/leonardo-barros-da-silva-741b9b196/"><img src={navIcon1} alt="Linkedin profile" target="_blank" /></a>
                            <a href="https://www.facebook.com/leonardo.barrossilva.3"><img src={navIcon2} alt="Facebook profile" target="_blank" /></a>
                            <a href="https://www.instagram.com/leonardobarrosdw/"><img src={navIcon3} alt="Instagram profile" target="_blank" /></a>
                        </div>
                        <p>Copyright 2023. Todos os direitos reservados: Leonardo Barros</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}