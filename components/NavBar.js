/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Container,
  Nav,
} from 'react-bootstrap';
import Image from 'next/image';

import navbarlogo from '../assets/BWPL.png';

export default function NavBar() {
  return (
    <Navbar className="navBar" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Image
          className="navLogo"
          alt="navLogo"
          src={navbarlogo}
          width="65px"
          height="65px"
        />
        <Link passHref href="/">
          <Navbar.Brand>
            KNIFEYS PIZZA
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/orders">
              <Nav.Link>Orders</Nav.Link>
            </Link>
            <Link passHref href="/revenue">
              <Nav.Link>Revenue</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
