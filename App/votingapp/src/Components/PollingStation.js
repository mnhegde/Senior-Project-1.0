import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import LoadingCircles from "../assets/loadingcircles.svg";

const PollingStation = props => {

    const [candidate1, setCandidate1] = useState(LoadingCircles)
    const [candidate2, setCandidate2] = useState(LoadingCircles)
    const [candidate1Name, setCandidate1Name] = useState("")
    const [candidate2Name, setCandidate2Name] = useState("")
    const [showResults, setShowResults] = useState(false)
    const [candidate1Votes, updateVote1] = useState("--")
    const [candidate2Votes, updateVote2] = useState("--")

    useEffect(() => {
        const getInfo = async() => {
            let voteCount = await window.contract.getVotes({prompt: localStorage.getItem("Prompt")})
            updateVote1(voteCount[0])
            updateVote2(voteCount[1])

            setCandidate1Name(localStorage.getItem("Candidate1"))
            setCandidate2Name(localStorage.getItem("Candidate2"))
            setCandidate1(await window.contract.getURL({name: localStorage.getItem("Candidate1")}))      
            setCandidate2(await window.contract.getURL({name: localStorage.getItem("Candidate2")})) 
            
            let didVote = await window.contract.checkParticipation({prompt: localStorage.getItem("Prompt"), user: window.accountId})
            setShowResults(didVote)
        }
        getInfo()
    }, [])

    const addVote = async(index) => {
        await window.contract.addVote({prompt: localStorage.getItem("Prompt"), index: index})
        await window.contract.checkUserRecord({prompt: localStorage.getItem("Prompt"), user: window.accountId})
        let voteCount = await window.contract.getVotes({prompt: localStorage.getItem("Prompt")})
        updateVote1(voteCount[0])
        updateVote2(voteCount[1])
        setShowResults(true) 
    }

    return (
        <Container>
            <Row>
                <Col className="justify-content-center d-flex">
                    <Container>
                        <Row style={{marginTop: "5vh", backgroundColor: "#c4c4c4"}}>
                            <div style={{display: "flex", justifyContent: "center", padding: "3vw"}} >
                                <img style={{height: "35vh", width: "20vw"}} src={candidate1}></img>
                            </div>
                            <strong style={{textAlign: "center", paddingBottom: "5px"}}>{candidate1Name}</strong>
                        </Row>
                        { showResults ? <Row className="justify-content-center d-flex" style={{marginTop: "5vh"}}>
                            <div 
                            style={{display: "flex", justifyContent: "center", fontSize: "8vw", padding: "10px", backgroundColor: "#c4c4c4"}}>
                            {candidate1Votes}
                            </div>
                        </Row> : null}
                        <Row className="justify-content-center d-flex" style={{marginTop: "5vh"}}>
                            <Button disabled={showResults} onClick={() => addVote(0)}>
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
                            <strong style={{textAlign: "center", paddingBottom: "5px"}}>{candidate2Name}</strong>
                        </Row>
                        { showResults ? <Row className="justify-content-center d-flex" style={{marginTop: "5vh"}}>
                            <div 
                            style={{display: "flex", justifyContent: "center", fontSize: "8vw", padding: "10px", backgroundColor: "#c4c4c4"}}>
                            {candidate2Votes}
                            </div>
                        </Row> : null}
                        <Row className="justify-content-center d-flex" style={{marginTop: "5vh"}}>
                            <Button disabled={showResults} onClick={() => addVote(1)}>
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