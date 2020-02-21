import React, { Component } from 'react'

class EventRow extends Component {

    convert(time) {
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { 
            time = time.slice (1);  
            time[5] = +time[0] < 12 ? " AM" : " PM";
            time[0] = +time[0] % 12 || 12;
        }
        return time.join ('');
    }

    render() {
        var event = this.props.event
        return (
            <tr class="card-body event">
                <td class="card-title room-name">{event.room_name}</td>
                <td class="card-title event-name">{event.event_name}</td>
                <td class="card-text event-start">{this.props.format ? this.convert(event.start_time) : event.start_time}</td>
                <td class="card-text event-end">{this.props.format ? this.convert(event.end_time) : event.end_time}</td>
            </tr>
        );
    }
};

class EventList extends Component {


    constructor(props) {
        super(props)
        this.state = {
            time24Hours: (typeof this.props.format !== "undefined" && this.props.format === "24") ? true : false,
            events: []
        }
    }
    
    componentDidMount() {
        if (this.props.events) {
            this.setState({ events: this.props.events })
        }
    }

    componentDidUpdate() {
        if (this.props.events !== this.state.events) {
            this.setState({ events: this.props.events })
        }
    }

    render() {
        return (
            <div>
                <h3>Event List</h3>
                
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Room</th>
                            <th scope="col">Event Name</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.events.map((event) => {
                        return (
                            <EventRow format={this.state.time24Hours} event={event} />
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
};

export default EventList