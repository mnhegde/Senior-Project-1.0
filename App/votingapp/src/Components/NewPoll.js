import React, {useRef} from 'react';
import {Container, Form, Button} from 'react-bootstrap'
const NewPoll = props => {

    const candidate1Name = useRef();
    const candidate1IMG = useRef();
    const candidate2Name = useRef();
    const candidate2IMG = useRef();
    const prompt = useRef();

    const sendToBlockchain = async() => {
        await window.contract.addURL({name: candidate1Name.current.value, url: candidate1IMG.current.value})
        await window.contract.addURL({name: candidate2Name.current.value, url: candidate2IMG.current.value})
        await window.contract.addCandidatePair({prompt: prompt.current.value, name1: candidate1Name.current.value, name2: candidate2Name.current.value})
        await window.contract.addPrompt({prompt: prompt.current.value})
        window.location.replace("/");
    }

    return (
        <Container style={{marginTop: "10px"}}>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Candidate 1 Name</Form.Label>
                    <Form.Control ref={candidate1Name} placeholder="Enter Candidate"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Candidate 1 Image</Form.Label>
                    <Form.Control ref={candidate1IMG} placeholder="Enter Image URL"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Candidate 2 Name</Form.Label>
                    <Form.Control ref={candidate2Name} placeholder="Enter Candidate"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Candidate 2 Image</Form.Label>
                    <Form.Control ref={candidate2IMG} placeholder="Enter Image URL"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Prompt</Form.Label>
                    <Form.Control ref={prompt} placeholder="Add Prompt"></Form.Control>
                </Form.Group>
                <Button onClick={sendToBlockchain} variant="primary">Submit</Button>
            </Form>
        </Container>
    );
};


export default NewPoll;