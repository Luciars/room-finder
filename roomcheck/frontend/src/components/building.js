import React, { Component } from 'react'

class BuildingCard extends Component {
    render() {
        var building = this.props.building
        return (
            <div class="card-body building">
                <h5 class="card-title">{building.name_text} | {building.id_text}</h5>
            </div>
        );
    }
};

class BuildingList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            buildings: []
        }
    }

    componentDidMount() {
        if (this.props.buildings) {
            this.setState({ buildings: this.props.buildings })
        }
    }

    componentDidUpdate() {
        if (this.props.buildings !== this.state.buildings) {
            this.setState({ buildings: this.props.buildings })
        }
    }

    render() {
        return (
            <div>
                <center><h1>Building List</h1></center>
                {this.state.buildings.map((building) => {
                    return (
                        <BuildingCard building={building} />
                    )
                })}
            </div>
        )
    }
};

export default BuildingList
