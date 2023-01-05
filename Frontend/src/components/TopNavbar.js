import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
// import AddListing from "./AddListing";

export default function TopNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Madrid AirBnB Dataset</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">GGHadid</Nav.Link>
            <Nav.Link href="/add">Add Listing</Nav.Link>
            <Nav.Link href="/delete">Delete Listing</Nav.Link>
            <Nav.Link href="/search">Search Listing</Nav.Link>
            <NavDropdown title="Select Filter" id="basic-nav-dropdown">
              <NavDropdown.Item href="/specific">
                Specific Date
              </NavDropdown.Item>
              <NavDropdown.Item href="/month">Popular Months</NavDropdown.Item>
              <NavDropdown.Item href="/holiday">
                Holiday Pricing
              </NavDropdown.Item>
              <NavDropdown.Item href="/range">Price Range</NavDropdown.Item>
              <NavDropdown.Item href="/top10cheapest">
                Top 10 Cheapest
              </NavDropdown.Item>
              <NavDropdown.Item href="/popularNeighbor">
                Top 10 Popular Neighborhoods
              </NavDropdown.Item>
              <NavDropdown.Item href="/top10mostRated">
                Top 10 Most Rated
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
