import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';
import { BrowserRouter, Switch, Redirect, Route, Link } from "react-router-dom";


const ActiveOrders = (props) => {
    return (
        <Accordion>
            <Card>
                <Card.Header>
                    <h3>ACTIVE ORDERS:</h3>
                </Card.Header>
                <Card.Header>
                
                <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td style={{textAlign:'center'}}>1.</td>
                        <td style={{textAlign:'center'}}>Masni ponedeljak</td>
                        <td style={{textAlign:'center'}}>00:25:28</td>
                        <td style={{textAlign:'center'}}>         
                    
                            <Link to='/order'><Button>Order!</Button></Link> 
                            
                        </td>
                    </tr>
                </tbody>
                </Table>

                </Card.Header>
                <Card.Header>
                <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td style={{textAlign:'center'}}>2.</td>
                        <td style={{textAlign:'center'}}>Žurka drugi sprat</td>
                        <td style={{textAlign:'center'}}>00:10:28</td>
                        <td style={{textAlign:'center'}}>          
                            <Link to='/order'><Button>Order!</Button></Link>                     
                        </td>
                    </tr>
                </tbody>
                </Table>
                </Card.Header>
                
            </Card>
        </Accordion>
    )
};


export default ActiveOrders;