import React from 'react';
import getQuotes from '../../../services/quotesApi';
import Nav from 'react-bootstrap/Nav';
import DailyQuoteModal from './DailyQuoteModal';
import Button from 'react-bootstrap/Button';
import image from '../../../utilities/fortune-cookie-drawing.png';
import ActivePolls from './ActivePolls';
import ActiveOrders from './ActiveOrders';
import { BrowserRouter, Switch, Redirect, Route,Link } from "react-router-dom";
import NavigbarHome from './NavigbarHome';




class Home extends React.Component {
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
    componentDidMount(){
    }
    
    render() {
        return ( 
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <NavigbarHome />
                    </div>
                </div>         
                <div className="row" style={{ height:"1rem" }}></div>
                    
                <div className="row">    
                    <div className="col-md-12">
                        <ActivePolls />  
                    </div>                   
                </div>  
                <div style={{height:'1rem'}} className="row"></div>
                <div className="row">      
                    <div className="col-md-12">
                        <ActiveOrders />  
                    </div>                             
                </div>   
            </div>                  
        )
    }
}

export default Home;