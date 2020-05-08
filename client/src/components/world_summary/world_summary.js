import React, { Component } from 'react';

class WorldSummary extends Component {
    constructor() {
        super();
        this.state = {
            worldinfo: []
        }
    }

    componentDidMount() {
        fetch('api/world_summary')
            .then(res => res.json())
            .then(worldinfo => this.setState({worldinfo}))
    }

    render() {
        return (
            <div>
                <h1>World Summary</h1>
                <table>
                    <tr>
                        <td>Confirmed:</td>
                        <td>{ this.state.worldinfo.confirmed }</td>
                    </tr>
                    <tr>
                        <td>Active:</td>
                        <td>{ this.state.worldinfo.active }</td>
                    </tr>
                    <tr>
                        <td>Recoverd:</td>
                        <td>{ this.state.worldinfo.recovered }</td>
                    </tr>
                    <tr>
                        <td>Death:</td>
                        <td>{ this.state.worldinfo.death }</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default WorldSummary;