import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import NavigbarHome from "./NavigbarHome";
import { getAllPossibleMeals, getMyTags } from "../../../services/mockApi";

class Order extends React.Component {
  constructor() {
    super();
    this.state = {
      currentOrder: [],
      currentOrderSum: 0,
      budget: 0,
      possibleMeals: [],
      value: "",
      suggestions: [],
      saltyMeals: [],
      sweetMeals: [],
      suggestedMeals: [],
      myTags: [],
    };
  }

  isMealRecommended(mealTags){
    let myTags=this.state.myTags;
    console.log(myTags)
    let isRecommended=false;
    mealTags.forEach((tag)=>{
        if(myTags.includes(tag))
            isRecommended=true;
    })
    return isRecommended;
  }

  componentDidMount() {
    this.setMyTags();
    this.setAllPossibleMeals();
  }

  setAllPossibleMeals = async () => {
    let allMeals = await getAllPossibleMeals();
    this.setState({ possibleMeals: allMeals });
    this.setState({ suggestedMeals: allMeals });
    let saltyFood = [];
    let sweetFood = [];
    let allFood = this.state.possibleMeals;
    allFood.forEach((meal) => {
      if (meal.tags.includes("slano")) {
        saltyFood.push(meal);
      } else {
        sweetFood.push(meal);
      }
    });
    this.setState({ saltyMeals: saltyFood, sweetMeals: sweetFood });
  };

  setMyTags = async () => {
    let myTags = JSON.parse(await getMyTags());
    this.setState({ myTags: myTags });
  };

  render() {
    let suggestedMeals = this.state.suggestedMeals;
    let suggestedMealsRecommended=suggestedMeals.map((meal)=>{
        return this.isMealRecommended(meal.tags);
    })
    let tRows = suggestedMeals.map((meal,mealIndex) => {
      return (
        <tr>
          <td style={{ textAlign: "center" }}>{meal.name}</td>
          <td style={{ textAlign: "center" }}>{meal.price}</td>
          <td style={{ textAlign: "center" }}>{
              suggestedMealsRecommended[mealIndex] ? "YES" : "NO"
          }</td>
          <td style={{ textAlign: "center" }}>
            <Button
              onClick={() => {
                console.log(this.state.myTags);
                let oldOrder = this.state.currentOrder;
                oldOrder.push(meal);
                this.setState({ currentOrder: oldOrder });
                let currOrderSum = 0;
                oldOrder.forEach((order) => {
                  currOrderSum += order.price;
                });
                this.setState({ currentOrderSum: currOrderSum });
              }}
            >
              Add
            </Button>
          </td>
        </tr>
      );
    });

    let salty = this.state.saltyMeals;
    let sweet = this.state.sweetMeals;
    let comboRow = [];
    salty.forEach((saltyMeal) => {
      sweet.forEach((sweetMeal) => {
        if (saltyMeal.price + sweetMeal.price <= this.state.budget) {
          comboRow.push(
            <tr>
              <td style={{ textAlign: "center" }}>{saltyMeal.name}</td>
              <td style={{ textAlign: "center" }}>{sweetMeal.name}</td>
              <td style={{ textAlign: "center" }}>
                {saltyMeal.price + sweetMeal.price}
              </td>
              <td style={{ textAlign: "center" }}>
                <Button
                  onClick={() => {
                    let oldOrder = this.state.currentOrder;
                    oldOrder.push(saltyMeal, sweetMeal);
                    this.setState({ currentOrder: oldOrder });
                    let currOrderSum = 0;
                    oldOrder.forEach((order) => {
                      currOrderSum += order.price;
                    });
                    this.setState({ currentOrderSum: currOrderSum });
                    this.setState({ budget: 0 });
                  }}
                >
                  Add combo
                </Button>
              </td>
            </tr>
          );
        }
      });
    });

    let currOrder = this.state.currentOrder.map((meal, index) => {
      return (
        <tr>
          <td style={{ textAlign: "center" }}>{meal.name}</td>
          <td style={{ textAlign: "center" }}>{meal.price}</td>
          <td style={{ textAlign: "center" }}>
            <input type="text"></input>
          </td>
          <td style={{ textAlign: "center" }}>
            <Button
              variant="danger"
              onClick={() => {
                let orderAfterDelete = this.state.currentOrder;
                orderAfterDelete.splice(index, 1);
                console.log(index);
                this.setState({ currentOrder: orderAfterDelete });
                this.setState({
                  currentOrderSum: this.state.currentOrderSum - meal.price,
                });
              }}
            >
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
                <h2>Menu</h2>
              </Card.Header>
              <Form>
                <Form.Group controlId="formBasicEmail">
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
                      this.state.possibleMeals.forEach((mealForCheck) => {
                        let searchTagsValid = true;
                        searchTags.forEach((typedTag) => {
                          if (!mealForCheck.tags.includes(typedTag))
                            searchTagsValid = false;
                        });
                        let searchNameValid = true;
                        if (searchName.length > 0) {
                          searchNameValid = mealForCheck.name
                            .toLowerCase()
                            .includes(searchName.toLowerCase());
                        }

                        if (searchTagsValid && searchNameValid)
                          newSuggested.push(mealForCheck);
                      });
                      this.setState({ suggestedMeals: newSuggested });
                    }}
                    type="text"
                    placeholder="Type meal name or some food tag..."
                  />
                </Form.Group>
              </Form>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>Name</th>
                    <th style={{ textAlign: "center" }}>RSD</th>
                    <th style={{ textAlign: "center" }}>Recommended</th>
                    <th style={{ textAlign: "center" }}>Want it?</th>
                  </tr>
                </thead>
                <tbody>{tRows}</tbody>
              </Table>
              <Form.Group>
                <Card.Header>
                  <h2>Perfect combo</h2>
                </Card.Header>
                <Form.Control
                  type="text"
                  placeholder="Insert your budget to get a recommended meal combo..."
                  onChange={(ev) => {
                    this.setState({ budget: ev.target.value });
                    this.setState({ comboInputValue: ev.target.value });
                  }}
                />
              </Form.Group>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>Salty</th>
                    <th style={{ textAlign: "center" }}>Sweet</th>
                    <th style={{ textAlign: "center" }}>RSD</th>
                    <th style={{ textAlign: "center" }}>Want the combo?</th>
                  </tr>
                </thead>
                <tbody>{comboRow}</tbody>
              </Table>
            </Card>
          </div>
        </div>
        <div className="row" style={{ height: "1rem" }}></div>
        <div className="row">
          <div className="col-md-12">
            <Card>
              <Card.Header>
                <h2>Current order</h2>
              </Card.Header>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>Name</th>
                    <th style={{ textAlign: "center" }}>RSD</th>
                    <th style={{ textAlign: "center" }}>Additional note</th>
                    <th style={{ textAlign: "center" }}>Still want it?</th>
                  </tr>
                </thead>
                <tbody>
                  {currOrder}
                  <tr>
                    <td>
                      <h5>Current order sum:</h5>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {this.state.currentOrderSum}
                    </td>
                  </tr>
                </tbody>
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
              onClick={() => {
                this.setState({ currentOrder: [] });
                this.setState({ currentOrderSum: 0 });
              }}
            >
              Submit order
            </Button>
          </div>
        </div>
        <div className="row" style={{ height: "1rem" }}></div>
      </div>
    );
  }
}

export default Order;
