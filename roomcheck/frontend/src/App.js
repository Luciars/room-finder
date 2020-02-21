import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar, NavItem, NavLink, Form, Button
} from 'reactstrap'
import EventList from './components/events'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            buildings: [],
            events: [],
            rooms: [],
        }

        this.removeBuilding = this.removeBuilding.bind(this)
        this.searchForRoomSchedule = this.searchForRoomSchedule.bind(this)
    }

    componentDidMount() {
        this.retrieveBuildings()
        this.retrieveRooms()
        this.retrieveEvents()
    }

    retrieveBuildings() {
        fetch('http://localhost:8000/api/buildings')
        .then(res => res.json())
        .then((data) => {
            if (this.state.buildings !== data) {
                this.setState({ buildings: data });
            }
        });
    }

    retrieveRooms() {
        fetch('http://localhost:8000/api/rooms')
        .then(res => res.json())
        .then((data) => {
            if (this.state.rooms !== data) {
                this.setState({ rooms: data });
            }
        });
    }

    retrieveEvents() {
        fetch('http://localhost:8000/api/events')
        .then(res => res.json())
        .then((data) => {
            if (this.state.events !== data) {
                this.setState({ events: data });
            }
        });
    }

    searchForRoomSchedule() {
        var roomName = document.getElementById("room-val").value
        var selected = this.state.rooms.find((element) => (element.room_name === roomName)).pk
        fetch('http://localhost:8000/api/events/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                room: selected
            })
        }).then(() => (this.retrieveEvents()))
    }

    removeBuilding() {
        this.setState(state => ({buildings: state.buildings.slice(1)}));
    }

    nav() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <NavItem>
                    <NavLink href="/find/">find</NavLink>
                </NavItem>
                <Navbar.Brand href="#home">UTM Room Finder</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            </Navbar>
        )
    }

    getRoomSchedule() {
        return (
            <div>
                <center><h1>Search For Room Schedule</h1></center>
                <Form inline>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select" id="room-val" onChange={(e) => this.setState({selected_room: e.target.value})}>
                            {this.state.rooms.map((val) => {
                                return (
                                    <option>{val.room_name}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="outline-success" onClick={() => this.searchForRoomSchedule()}>Search</Button>
                </Form>
            </div>
        );
    }
    render() {
        return (
        <div>
            <Router>
                <Switch>
                    <Route path="/find" >
                        {this.getRoomSchedule()}
                    </Route>
                    <Route path="/">
                        <EventList events={this.state.events} />
                    </Route>
                </Switch>
            </Router>
        </div>
      );
    }
};

export default App;
