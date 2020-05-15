import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import image from '../../../utilities/fortune-cookie-drawing.png';
import DailyQuoteModal from './DailyQuoteModal';
import getQuotes from '../../../services/quotesApi';
import { BrowserRouter, Switch, Redirect, Route,Link } from "react-router-dom";
import logoImage from '../../../utilities/logo.png';

class NavigbarHome extends React.Component {
    constructor() {
        super();
        this.state = {
            allQuotes:[],
            randomQuote:'',
            modalShow:false,
            activePolls:[],
            activeOrders:[]
        } 
    }

    initialQuotes=async()=>{
        let data = await getQuotes();
        this.setState({
            allQuotes: data
        });
    }

    componentDidMount(){
        this.initialQuotes();
    }

    setQuotes = async() => {
        this.setState({
            randomQuote: this.state.allQuotes[Math.floor(Math.random()*this.state.allQuotes.length)]
        });
    }
    
    setModalShow = () => {
        this.setState({
            modalShow: !this.state.modalShow
        });
    }

    render(){

        return (
            <div className="row">
                <div className="col-md-1">
                        <Link to='/home'><img className="logo" src={logoImage} alt="logo"></img></Link>
                </div>  
                <div className="col-md-11">
                    
                    <Navbar bg="light" variant="light">
                        <Nav className="mr-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <NavDropdown title="Polls" id="nav-dropdown">
                                <NavDropdown.Item href="/newpoll">New poll</NavDropdown.Item>
                                <NavDropdown.Item>My polls</NavDropdown.Item>                      
                            </NavDropdown>
                            <NavDropdown title="History" id="nav-dropdown">
                                <NavDropdown.Item>Poll history</NavDropdown.Item>
                                <NavDropdown.Item>Order history</NavDropdown.Item>                      
                            </NavDropdown>
                            <Nav.Link href="/profile">Profile</Nav.Link>                     
                        </Nav>
                        <div>
                            <img className="fortuneCookie" 
                                src={image} 
                                onClick={()=>{this.setQuotes(); this.setModalShow()}} />
                            {<DailyQuoteModal
                                show={this.state.modalShow}
                                onHide={this.setModalShow}
                                random={this.state.randomQuote}
                            />}
                        </div>
                        <Link to="/login">
                            <Button variant="warning">
                                    Log out
                        </Button> 
                        </Link>        
                    </Navbar>
                </div>
        </div>                    
    )}
}

export default NavigbarHome;

