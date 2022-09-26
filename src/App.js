import foods from './foods.json';
import React, { Component } from 'react';
import FoodList from './components/FoodList/FoodList';
import FoodForm from './components/FoodForm/FoodForm';
import { v4 as uuidv4 } from 'uuid';

import { Layout, Typography } from 'antd';
const { Content } = Layout;
const { Title } = Typography;

class App extends Component {
  state = {
    foods: [...foods],
    searchText: '',
  };

  createFood = (newFood) => {
    const foodToCreate = {
      ...newFood,
      id: uuidv4(), // paquete para generar un id, para que no nos salte el error de las keys de react
    };

    this.setState({ foods: [foodToCreate, ...this.state.foods] });
  };

  handleSearch = (event) => {
    const { value } = event.target

    this.setState({ searchText: value })
  }

  getFoodsToRender = () => {
    const { foods, searchText } = this.state

    if (searchText) { // '' -> falsy
      return foods.filter(food => {
        return food.name.toLowerCase().includes(searchText.toLowerCase())
      })
    }
    return foods
  }

  render() {

    const { searchText } = this.state

    const foods = this.getFoodsToRender()

    return (
      <div className="App">
        <Layout>
          <Content style={{ padding: '0 50px', minHeight: '100vh' }}>
          <label htmlFor="search">
              Search:
            </label>
            <input id="search" name="search" value={searchText} onChange={this.handleSearch} />


            <h2>Add food Entery</h2>
            <FoodForm createFood={this.createFood} />
            
            <Title>Food list</Title>
           
            <FoodList foods={foods} />;
         
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;

