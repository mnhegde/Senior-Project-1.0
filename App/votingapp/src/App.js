import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./Components/Home";
import PollingStation from './Components/PollingStation';
import NewPoll from './Components/NewPoll';
import { VscHome } from "react-icons/vsc";
import getConfig from './config'


/* ***TODO***
Edge cases for form submission (checking blank fields before submitting)

Efficiency (cleaning up lines in useEffect, smart contracts, styles for HTML)

Clearing prompts/users from blockchain when needed (smart contracts)

display image for candidate using URL

Add loading animations when updating blockchain (creating new poll, submitting vote, etc.)
*/


const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {

  const changeCandidates = async(prompt) => {
    if (window.accountId==='') {
      alert("Please log in to access the voting booths!");
    } else {
      console.log(prompt);
      let namePair = await window.contract.getCandidatePair({prompt: prompt})
      localStorage.setItem("Candidate1", namePair[0]);
      localStorage.setItem("Candidate2", namePair[1]);
      localStorage.setItem("Prompt", prompt);
      window.location.replace(window.location.href + "PollingStation");
    }
  }

  return ( 
  <Router>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/"><VscHome /></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">

      </Nav>
      <Nav>
        <Nav.Link href="/NewPoll" >New Poll</Nav.Link>
        <Nav.Link onClick={window.accountId==='' ? login : logout}>{window.accountId==='' ? "Login" : window.accountId}</Nav.Link>
      </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
      <Route exact path="/" element={<Home changeCandidates={changeCandidates} />}></Route>
      <Route exact path="/PollingStation" element={<PollingStation/>}></Route>
      <Route exact path="/NewPoll" element={<NewPoll/>}></Route>
    </Routes>
  </Router>
  )
}
