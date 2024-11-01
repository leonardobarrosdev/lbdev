import { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { FileEarmarkArrowDown } from 'react-bootstrap-icons';
import headerImg from '../assets/img/header-img.svg';
import TrackVisibility from 'react-on-screen';

export function Banner() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  // eslint-disable-next-line
  const [index, setIndex] = useState(1);
  const toRotate = ["Front-end", "Back-end", "Full Stack"];
  const period = 2000;
  const PDF_FILE_URL = "https://www.canva.com/design/DAGO0eH-FLA/dOxj7Qx2INrLS9bw_W3aVA/view?utm_content=DAGO0eH-FLA&utm_campaign=designshare&utm_medium=link&utm_source=editor";

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => {clearInterval(ticker)};
    // eslint-disable-next-line
  }, [text]);

  function tick() {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if(isDeleting) {
      setDelta(prevDelta => prevDelta / 2)
    }

    if(!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if(isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  function downloadFileAtUrl(url) {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    const btn = document.getElementById("downloadBtn");
    console.log(fileName);
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    btn.appendChild(aTag);
    aTag.click();
    aTag.remove();
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligin-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animete__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{"Hi! My name's Leonardo Barros the "}<span className="text-rotate" datePeriod="1000" date-rotate='["Front-end", "Back-end", "FullStack"]'><span className="wrap">{text}</span></span></h1>
                <p>With large experience, my passionate and committed approach ensures the delivery of high-quality projects and the satisfaction of my clients. As a freelancer, I am flexible and communicative, always ready to collaborate and meet the specific needs of your project.</p>
                <button id="downloadBtn" onClick={() => {
                  downloadFileAtUrl(PDF_FILE_URL)
                }}>Do download of the my CV <FileEarmarkArrowDown size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                <img src={headerImg} alt="Header img" />
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}