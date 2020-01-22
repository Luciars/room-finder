import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BuildingList from './components/building'

class App extends Component {

  state = {
    buildings: []
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/buildings')
    .then(res => res.json())
    .then((data) => {this.setState({ buildings: data })});
  }

  render() {
    return (
      <BuildingList buildings = {this.state.buildings} />
    );
  }
};

export default App;
