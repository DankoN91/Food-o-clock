import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import NVD3Chart from 'react-nvd3';
import NavigbarHome from './NavigbarHome';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:{
                id:1,
                name:'Danko',
                tags:[
                    {id:1,
                     naziv:'rostilj'},
                    {id:2,
                     naziv:'italijanska'}]
            }       
        }   
    }

    render(){

    const datum = [{
        key: "Money spent",
        values: [
            {
            "label" : 1,
            "value" : 250
            },
            {
            "label" : 4,
            "value" : 500
            },
            {
            "label" : 5,
            "value" : 720
            },
            {
            "label" : 7,
            "value" : 400
            },
            {
            "label" : 10,
            "value" : 194
            },
            {
            "label" : 17,
            "value" : 498
            },
            {
            "label" : 25,
            "value" : 1000
            },
            {
            "label" : 26,
            "value" : 320
            }
        ]
        }];

    let currentTags=this.state.user.tags;
    let tagRow = currentTags.map((tag)=>{
        window.localStorage.setItem(tag.id,tag.naziv);
        return (<tr>
                    <td style={{textAlign:'center'}}>{tag.naziv}</td>
                    <td style={{textAlign:'center'}}><Button
                                                        variant='danger'>
                                                            Remove
                                                    </Button>
                    </td>
                </tr>
    )});

        return (
            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <NavigbarHome />
                    </div>              
                </div>
                <div className='row'>
                    <div className='col-md-4'></div>
                    <div style={{textAlign:'center'}} className='col-md-4'>
                        <h2>Welcome {this.state.user.name}!</h2>
                    </div>
                    <div className='col-md-4'></div>           
                </div>
                <div className='row' style={{height:'1rem'}}></div>
                <div className='row'>
                    <div className='col-md-12'>
                        <Card >
                                <Card.Header><h2>Your tags</h2></Card.Header>                         
                                    <Table striped bordered hover>
                                        <tbody>
                                            {tagRow}                                  
                                        </tbody>
                                    </Table>               
                        </Card>
                    </div>
                        
                </div>
                <div className="row" style={{height:'1rem'}}></div>
                <div className="row">
                    <div className="col-md-12">
                        <Card>
                            <Card.Header><h2>Your stats</h2></Card.Header>
                            <NVD3Chart id="barChart" type="lineChart" height='400' showValues="true" datum={datum} x="label" y="value"/>                                            
                        </Card> 
                    </div>
                                      
                </div>               
            </div>        
        )
    }
}

export default Profile;