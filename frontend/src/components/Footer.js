import React from "react";
import timUser from "../timuser.png";
import { Container, Row, Col } from "react-bootstrap";
function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; T-Corp </Col>
        </Row>
        <Row>
          <img className="user_logo" src={timUser} alt="tim" />
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
