import { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { UiChecks } from 'react-bootstrap-icons';
import contactImg from '../assets/img/contact-img.svg';

export function Contact() {
    const formInicialDetail = {
        fullName: "",
        email: "",
        title: "",
        message: ""
    }
    const [formDetails, setFormDetails] = useState(formInicialDetail);
    const [buttonText, setButtonText] = useState("Send");
    const [status, setStatus] = useState({});

    function onFormUpdate(category, value) {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setButtonText("Sending...");
        let response = await fetch("", {
            method: "POST",
            header: {
                "Contact-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(formDetails),
        });
        setButtonText("Send");
        let result = await response.json();
        setFormDetails(formInicialDetail);
        if(result.code === 200) {
            setStatus({succes: true, message: "Mensagem enviada com sucesso!"});
        } else {
            setStatus({succes: false, message: "Não foi possível enviar, tente mais tarde."});
        }
    };

    return (
        <section className="contact" id="contact">
            <Container>
                <Row className="align-items-center">
                    <Col size={12} md={6}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                            <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us" />
                            }
                        </TrackVisibility>
                    </Col>
                    <Col size={12} md={6}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                <h2 className="mb-1">Pedido para orçamento</h2>
                                <Nav.Link href="https://forms.gle/MYmA61eVZrrUFLuq9"><h5 className="mb-3">Ou responda o formulário <UiChecks /></h5></Nav.Link>
                                <form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col size={12} sm={6} className="px-1">
                                            <input type="text" value={formDetails.fullName} placeholder="Nome completo" onChange={(e) => onFormUpdate("fullName", e.target.value)} />
                                        </Col>
                                        <Col size={12} sm={6} className="px-1">
                                            <input type="text" value={formDetails.email} placeholder="E-mail*" onChange={(e) => onFormUpdate("email", e.target.value)} required={true} />
                                        </Col>
                                        <Col size={12} sm={12} className="px-1">
                                            <input type="text" value={formDetails.title} placeholder="Título*" onChange={(e) => onFormUpdate("title", e.target.value)} required={true} />
                                        </Col>
                                        <Col size={12} className="px-1">
                                            <textarea rows="6" value={formDetails.message} placeholder="Mensagem*" onChange={(e) => onFormUpdate("message", e.target.value)} required={true} ></textarea>
                                            <button type="submit"><span>{buttonText}</span></button>
                                        </Col>
                                        {
                                            status.message &&
                                            <Col>
                                                <p className={status.success === false ? "dange" : "success"}>{status.message}</p>
                                            </Col>
                                        }
                                    </Row>
                                </form>
                            </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}