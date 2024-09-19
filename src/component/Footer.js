import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import "../style/footer.style.css"
import logoImg from "../asset/img/Advanced community logo.png"
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleNavigation = (path) => {
    navigate(path);
    scrollToTop();
  }

  return (
    <footer className="footer mt-1">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <div className="footer-logo mb-1">
              <img src={logoImg} alt="Community Advanced Logo" />
              <p>Together we spark change.</p>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <ul className="footer-links cur-point">
              <li onClick={()=> {handleNavigation("/")}}>
                Home
              </li>
              <li onClick={() => {handleNavigation("/campaign") }}>
                Campaigns
              </li>
              <li>
                Contact: admin@gmail.com
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center mt-3">
            <p>&copy; 2024 Community Advanced. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
