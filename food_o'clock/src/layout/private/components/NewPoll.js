import React from "react";
import NavigbarHome from "./NavigbarHome";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import {getAllPossibleRestaurants} from '../../../services/mockApi';

class NewPoll extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPoll: [],
      suggestedRestaurants: [],
      possibleRestaurants: []
    }; 
  }

  componentDidMount(){
    this.setAllPossibleRestaurants();
  }

  setAllPossibleRestaurants = async()=>{
    let allRestaurants=await getAllPossibleRestaurants();
    this.setState({possibleRestaurants:allRestaurants});
    this.setState({suggestedRestaurants:allRestaurants});
  }

  render() {
    let suggestedRestaurants = this.state.suggestedRestaurants;
    let tRows = suggestedRestaurants.map((res) => {
      return (
        <tr>
          <td>{res.name}</td>
          <td>{res.address}</td>
          <td>{res.minPrice}</td>
          <td>
            <Button
              onClick={(ev) => {
                let oldPoll = this.state.currentPoll;
                oldPoll.push(res);
                this.setState({ currentPoll: oldPoll });
              }}
            >
              Add
            </Button>
          </td>
        </tr>
      );
    });

    let currentPoll = this.state.currentPoll.map((res,index) => {
      return (
        <tr>
          <td>{res.name}</td>
          <td>{res.address}</td>
          <td>{res.minPrice}</td>
          <td>
            <Button variant="danger" onClick={(ev) => {
              let pollsAfterDelete = this.state.currentPoll;
              pollsAfterDelete.splice(index, 1);
              this.setState({ currentPoll: pollsAfterDelete });
            }}>
              Remove
            </Button>
          </td>
        </tr>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <NavigbarHome />
          </div>  
        </div>
        <div className="row" style={{ height: "1rem" }}></div>
        <div className="row">
          <div className="col-md-12">
          <Card>
            <Card.Header>
              <h2>Restaurants</h2>
            </Card.Header>
            <Form>
              <Form.Group>
                <Form.Control
                  onChange={(ev) => {
                    let searchValue = ev.target.value.split(" ");
                    let searchTags = [];
                    let searchName = "";
                    searchValue.forEach((it) => {
                      let trimmedTerm = it.trim();
                      if (trimmedTerm.includes("#")) {
                        searchTags.push(trimmedTerm.slice(1));
                      } else searchName = trimmedTerm;
                    });

                    let newSuggested = [];
                    this.state.possibleRestaurants.forEach((it) => {
                      let searchTagsValid = true;
                      searchTags.forEach((el) => {
                        if (!it.tags.includes(el)) searchTagsValid = false;
                      });
                      let searchNameValid = true;
                      if (searchName.length > 0) {
                        searchNameValid = it.name
                          .toLowerCase()
                          .includes(searchName.toLowerCase());
                      }

                      if (searchTagsValid && searchNameValid)
                        newSuggested.push(it);
                    });
                    this.setState({ suggestedRestaurants: newSuggested });
                  }}
                  placeholder="Type restaurant name or some food tag..."
                />
              </Form.Group>
            </Form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Min. price</th>
                  <th>Want it?</th>
                </tr>
              </thead>
              <tbody>{tRows}</tbody>
            </Table>
          </Card>
        </div>
          </div>
          
        <div className="row" style={{ height: "1rem" }}></div>
        <div className="row">
          <div className="col-md-12">
            <Card>
              <Card.Header>
                <h2>Current poll</h2>
              </Card.Header>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Min. price</th>
                    <th>Still want it?</th>
                  </tr>
                </thead>
                <tbody>{currentPoll}</tbody>
              </Table>
            </Card>
          </div>
          
        </div>
        <div className="row">
          <div className="col-md-12">
            <Button
              variant="success"
              size="lg"
              block
              onClick={(ev) => {
                this.setState({ currentPoll: [] });
              }}>
              Create poll
            </Button>
          </div>        
        </div>
      </div>
    );
  }
}

export default NewPoll;
