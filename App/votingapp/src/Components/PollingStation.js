import React, {useState} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import LoadingCircles from "../assets/loadingcircles.svg";

const PollingStation = props => {

const [candidate1, setCandidate1] = useState(LoadingCircles)
const [candidate2, setCandidate2] = useState(LoadingCircles)
const [showResults, setShowResults] = useState(false)

    return (
        <Container>
            <Row>
                <Col className="justify-content-center d-flex">
                    <Container>
                        <Row style={{marginTop: "5vh", backgroundColor: "#c4c4c4"}}>
                            <div style={{display: "flex", justifyContent: "center", padding: "3vw"}} >
                                <img style={{height: "35vh", width: "20vw"}} src={candidate1}></img>
                            </div>
                        </Row>
                        { showResults ? <Row className="justify-content-center d-flex" style={{marginTop: "5vh"}}>
                            <div 
                            style={{display: "flex", justifyContent: "center", fontSize: "8vw", padding: "10px", backgroundColor: "#c4c4c4"}}>
                            3
                            </div>
                        </Row> : null}
                        <Row className="justify-content-center d-flex" style={{marginTop: "5vh"}}>
                            <Button>
                                Vote
                            </Button>
                        </Row>
                    </Container>
                </Col>
                <Col className="justify-content-center d-flex align-items-center">
                    <div style={{display: "flex", justifyContent: "center", height: "20vh", backgroundColor: "#c4c4c4", padding: "2vw", alignItems: "center", textAlign: "center"}}>
                        Who are you voting for?
                    </div>
                </Col>
                <Col className="justify-content-center d-flex">
                    <Container>
                        <Row style={{marginTop: "5vh", backgroundColor: "#c4c4c4"}}>
                            <div style={{display: "flex", justifyContent: "center", padding: "3vw"}} >
                                <img style={{height: "35vh", width: "20vw"}} src={candidate2}></img>
                            </div>
                        </Row>
                        { showResults ? <Row className="justify-content-center d-flex" style={{marginTop: "5vh"}}>
                            <div 
                            style={{display: "flex", justifyContent: "center", fontSize: "8vw", padding: "10px", backgroundColor: "#c4c4c4"}}>
                            3
                            </div>
                        </Row> : null}
                        <Row className="justify-content-center d-flex" style={{marginTop: "5vh"}}>
                            <Button>
                                Vote
                            </Button>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};
export default PollingStation;