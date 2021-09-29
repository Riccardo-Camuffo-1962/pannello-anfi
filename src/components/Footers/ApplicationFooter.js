/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";

function ApplicationFooter() {
  return (
    <footer className="footer section-dark">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a href="https://www.anfitalia.it/" target="_blank">ANFI</a>
              </li>
              <li>
                <a href="/home">Pannello di controllo</a>
              </li>
              <li>
                <a href="/home">Privacy policy</a>
              </li>
            </ul>
          </nav>
          <div className="footer-nav credits ml-auto">
            <ul className="copyright description">
              &copy; 2021 - Riccardo Camuffo - Inspired by Creative Tim
            </ul>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default ApplicationFooter;
