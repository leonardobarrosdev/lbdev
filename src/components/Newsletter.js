import { useEffect, useState } from 'react';
import { Col, Row, Alert } from 'react-bootstrap';

export function Newsletter({status, message, onValidated}) {
    const [email, setEmail] = useState("");
    
    useEffect(() => {
        if(status === "success") clearFields();
    }, [status])

    function handleSubmit(e) {
        e.preventDefault();
        email &&
        email.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email
        });
    }

    function clearFields() {
        setEmail("");
    }

    return (
        <Col lg={12}>
            <div className="newsletter-bx wow slideInUp">
                <Row>
                    <Col md={12} lg={7} xl={5}>
                        <h3>Inscreva-se na minha Newsletter<br></br> e nunca mais seja o último a saber das novidades.</h3>
                        {status === "sending" && <Alert>Sending...</Alert>}
                        {status === "error" && <Alert variant="danger">{message}</Alert>}
                        {status === "success" && <Alert variant="success">{message}</Alert>}
                    </Col>
                    <Col md={12} lg={4} xl={7}>
                        <form onSubmit={handleSubmit}>
                            <div className="new-email-bx mt-md-3">
                                <input value={email} type="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} placeholder="Digite o seu melhor E-mail" />
                                <button type="submit">Inscrever-se</button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}