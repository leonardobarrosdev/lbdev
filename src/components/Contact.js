import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { UiChecks } from 'react-bootstrap-icons';
import contactImg from '../assets/img/contact-img.svg';
import mailchimp from '@mailchimp/mailchimp_transactional';
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
  const mailchimpClient = mailchimp(process.env.API_Key);
  const recaptchaRef = React.useRef();

  function onFormUpdate(category, value) {
    setFormDetails({
      ...formDetails,
      [category]: value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = await recaptchaRef.current.executeAsync();
    setButtonText("Enviando...")
    const response = await mailchimpClient.messages.send({
      message: formDetails
    })
    setButtonText("Enviar");
    setFormDetails(formInicialDetail);
    let result = await response.json();
    if(result.code === 200) {
      setStatus({success: true, message: "Mensagem enviada com sucesso!"})
    } else {
      setStatus({success: false, message: "Não foi possível enviar, tente mais tarde."})
    }
    console.log(response);
    console.log(token);
  }

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
                    <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey="6Lec6gEpAAAAAPlO36Wf9ho0UqYUNNU3eHhJ10Bx" />
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
                        <textarea rows="6" value={formDetails.message} placeholder="Mensagem*" onChange={(e) => onFormUpdate("message", e.target.value)} required={true}></textarea>
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