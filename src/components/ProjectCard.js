import { Col } from 'react-bootstrap';

export function ProjectCard({title, description, imgUrl}) {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} alt="" />
        <div className="proj-text mb-3">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  )
}