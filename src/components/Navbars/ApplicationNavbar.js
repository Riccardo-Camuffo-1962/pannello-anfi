import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledButtonDropdown, 
  DropdownMenu, 
  DropdownItem, 
  DropdownToggle 
} from "reactstrap";

function ApplicationNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-default");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("#CC0000");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-default");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar
      className={classnames("fixed-top", navbarColor )}
      color-on-scroll="300"
      expand="lg"
    >
      <Container fluid>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/index"
            tag={Link}
          >
			<img alt="ANFI" src="https://servizi.anfi.it/images/logo.c5469f49.png" 
				style={{ height: "2em", verticalAlign: "bottom" }} />
            Pannello di controllo
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/catlist-tabs" tag={Link}>
				Lista Gatti
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/cattery-birth-reports" tag={Link}>
                Denunce di nascita
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/cattery-transfers" tag={Link}>
                Passaggi proprietà
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/cattery-tests" tag={Link}>
                Test medici
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/cattery-invoices" tag={Link}>
                Fatture/Ricevute
              </NavLink>
            </NavItem>
            <NavItem>
				<UncontrolledButtonDropdown>
					<DropdownToggle 
						caret
						style={{ backgroundColor: 'transparent', 
								 color: '#66615B',
								 opacity: '.8',
								 borderColor: 'transparent' }}
					>
						Esposizioni
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem href="/cattery-show-results">
												Risultati espositivi</DropdownItem>
						<DropdownItem href="/cattery-domestic-subscriptions">
												Iscrizioni nazionali</DropdownItem>
						<DropdownItem href="/index">Statini expo straniere</DropdownItem>
					</DropdownMenu>
				</UncontrolledButtonDropdown>
            </NavItem>
			<NavItem>
				<UncontrolledButtonDropdown>
					<DropdownToggle 
						caret
						style={{ backgroundColor: 'transparent', 
								 color: '#66615B',
								 opacity: '.8',
								 borderColor: 'transparent' }}
					>
						Utente
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem href="/index">Cambia password</DropdownItem>
						<DropdownItem href="/logout">Logout</DropdownItem>
					</DropdownMenu>
				</UncontrolledButtonDropdown>
			</NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default ApplicationNavbar;
