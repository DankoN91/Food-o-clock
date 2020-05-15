import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';




const ActivePolls = (props) => {
    return (
        <Accordion>
            
            <Card>
                <Card.Header>
                    <h3>ACTIVE POLLS:</h3>
                </Card.Header>
                <Card.Header>
                
                <Table striped bordered hover>
                <tbody>
                    <tr>
                    <td style={{textAlign:'center'}}>1.</td>
                    <td style={{textAlign:'center'}}>25.5.2020.</td>
                    <td style={{textAlign:'center'}}>Fit ponedeljak</td>
                    <td style={{textAlign:'center'}}>Mare</td>
                    <td style={{textAlign:'center'}}>00:10:28</td>
                    <td style={{textAlign: 'center'}}>                
                        <Accordion.Toggle as={Button}  eventKey="0">
                            Vote!
                        </Accordion.Toggle></td>
                    </tr>
                </tbody>
                </Table>

                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td style={{textAlign:'center'}}><input type='checkbox'></input></td>
                            <td style={{textAlign:'center'}}>Prote.In</td>
                        </tr>
                        <tr>
                            <td style={{textAlign:'center'}}><input type='checkbox'></input></td>
                            <td style={{textAlign:'center'}}>FitBar</td>
                        </tr>
                    </tbody>
                    </Table>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                    <Table striped bordered hover>
                    <tbody>
                        <tr>
                        <td style={{textAlign:'center'}}>2.</td>
                        <td style={{textAlign:'center'}}>25.5.2020.</td>
                        <td style={{textAlign:'center'}}>Egzotični ponedeljak</td>
                        <td style={{textAlign:'center'}}>Ljubica</td>
                        <td style={{textAlign:'center'}}>00:05:45</td>
                        <td style={{textAlign:'center'}}>                
                            <Accordion.Toggle as={Button}  eventKey="1">
                                Vote!
                            </Accordion.Toggle></td>
                        </tr>
                    </tbody>
                    </Table>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                <Card.Body>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td><input type='checkbox'></input></td>
                            <td>Burrito madre</td>
                        </tr>
                        <tr>
                            <td><input type='checkbox'></input></td>
                            <td>Azijska kuhinja</td>
                        </tr>
                    </tbody>
                    </Table>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            
        </Accordion>
)
}




export default ActivePolls;