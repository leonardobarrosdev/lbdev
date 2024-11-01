import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import TrackVisibility from "react-on-screen";
import 'animate.css';
import colorSharp2 from "../assets/img/color-sharp2.png";
import projImg1 from '../assets/img/project-img1.png';
import projImg2 from '../assets/img/project-img2.png';
import projImg3 from '../assets/img/project-img3.png';

export function Projects() {
  const projects = [
    {
      title: "Business Startup",
      description: "Design & development",
      imgUrl: projImg1
    },
    {
      title: "Business Startup",
      description: "Design & development",
      imgUrl: projImg2
    },
    {
      title: "Business Startup",
      description: "Design & development",
      imgUrl: projImg3
    },
    {
      title: "Business Startup",
      description: "Design & development",
      imgUrl: projImg2
    },
    {
      title: "Business Startup",
      description: "Design & development",
      imgUrl: projImg3
    },
    {
      title: "Business Startup",
      description: "Design & development",
      imgUrl: projImg1
    },
  ]

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projetos</h2>
                <p>From the stunning visual creation of the front end to the robustness of the back end. Each project reflects my dedication to quality and professionalism, providing customized solutions that meet my clients' unique needs. Each image here represents a success in the journey of transforming ideas into digital reality. Be inspired by the innovation and creativity that each project brings with it.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Front-end</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Back-end</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">FullStack</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInput" className={isVisible ? "animate__animated animate__slideInup" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                              />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                              />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                              />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="" />
    </section>
  )
}