import React, {useEffect, useState} from 'react';
import {Table, Container, Button} from 'react-bootstrap'

const Home = props => {

    const [promptList, loadPromptList] = useState([])

    //const promptList = ["Test", "Presidential Election", "test prompt to answer"]; 
    //list is hardcoded, but prompt names are used as key for loading voting booth and data. need to call prkpts andd dynamically render
    //await window.contract.getPrompts()

    useEffect(() => {
        const getInfo = async() => {
            loadPromptList(await window.contract.getPrompts())
        }
        getInfo()
    }, [])

    return (
        <Container>
            <Table style={{margin: "5vh"}} striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>List of Polls</th>
                        <th>Go To Poll</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        promptList.map((name, index) => {
                            return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{name}</td>
                                <td><Button onClick={() => props.changeCandidates(name)}>Go To Poll</Button></td>
                            </tr>
                        )
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
};

export default Home;