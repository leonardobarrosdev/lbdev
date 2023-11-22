import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { UiChecks } from 'react-bootstrap-icons';
import contactImg from '../assets/img/contact-img.svg';
import ReCAPTCHA from 'react-google-recaptcha';

export function Contact() {
  const formInicialDetail = {
      fullName: "",
      email: "",
      title: "",
      message: ""
  }
  const [formDetails, setFormDetails] = useState(formInicialDetail);
  const [buttonText, setButtonText] = useState("Enviar");
  const [status, setStatus] = useState({});
  const formRef = React.useRef();
  const data = {
    service_id: process.env.REACT_APP_GOOGLE_SERVICE_ID,
    template_id: process.env.REACT_APP_GOOGLE_TEMPLATE_ID,
    user_id: process.env.REACT_APP_GOOGLE_USER_ID,
    template_params: {
      from_name: formDetails.fullName,
      from_email: formDetails.email,
      title: formDetails.title,
      message: formDetails.message,
    }
  };

  function onFormUpdate(category, value) {
    setFormDetails({
      ...formDetails,
      [category]: value
    })
  }

  async function sendEmail(e) {
    e.preventDefault();
    setButtonText("Enviando...");
    let response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    if(response.status === 200) {
      setStatus({success: true, message: "Mensagem enviada com sucesso!"})
    } else {
      setStatus({success: false, message: "Não foi possível enviar, tente mais tarde."})
    }
    setFormDetails(formInicialDetail);
    setButtonText("Enviar");
  }

  return (
    <section className="contact" id="contact">
      <Container>
        <Row className="align-items-center">
            <Col size={12} md={6}>
                <TrackVisibility>
                    {({ isVisible }) =>
                    <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Me" />
                    }
                </TrackVisibility>
            </Col>
            <Col size={12} md={6}>
              <TrackVisibility>
                {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2 className="mb-1">Pedido para orçamento</h2>
                  <Nav.Link href="https://forms.gle/MYmA61eVZrrUFLuq9"><h5 className="mb-3">Ou responda o formulário <UiChecks /></h5></Nav.Link>
                  <form onSubmit={sendEmail}>
                    <ReCAPTCHA ref={formRef} size="invisible" sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} />
                    <Row>
                      {
                        status.message &&
                        <Col size={12} sm={12} className="px-1 mb-2">
                          <p className={status.success === false ? "alert alert-danger rounded-4" : "alert alert-success rounded-4"}>{status.message}</p>
                        </Col>
                      }
                      <Col size={12} sm={6} className="px-1">
                        <input type="text" name="full_name" value={formDetails.fullName} placeholder="Nome" onChange={(e) => onFormUpdate("fullName", e.target.value)} />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input type="email" name="email" value={formDetails.email} placeholder="E-mail*" onChange={(e) => onFormUpdate("email", e.target.value)} required={true} autoComplete="email" />
                      </Col>
                      <Col size={12} sm={12} className="px-1">
                        <input type="text" name="title" value={formDetails.title} placeholder="Título*" onChange={(e) => onFormUpdate("title", e.target.value)} required={true} autoComplete="title" />
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea rows="6" name="message" value={formDetails.message} placeholder="Digite a descrição do seu pedido.*" onChange={(e) => onFormUpdate("message", e.target.value)} required={true}></textarea>
                        <button type="submit"><span>{buttonText}</span></button>
                      </Col>
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