import React, { Component } from 'react';

class VietnamSummary extends Component {
    constructor() {
        super();
        this.state = {
            vietnaminfo: []
        }
    }

    componentDidMount() {
        fetch('api/vietnam_summary')
            .then(res => res.json())
            .then(vietnaminfo => this.setState({vietnaminfo}))
    }

    render() {
        return (
            <div>
                <h1>Vietnam Summary</h1>
                <table>
                    <tr>
                        <td>Confirmed:</td>
                        <td>{ this.state.vietnaminfo.confirmed }</td>
                    </tr>
                    <tr>
                        <td>Active:</td>
                        <td>{ this.state.vietnaminfo.active }</td>
                    </tr>
                    <tr>
                        <td>Recoverd:</td>
                        <td>{ this.state.vietnaminfo.recovered }</td>
                    </tr>
                    <tr>
                        <td>Death:</td>
                        <td>{ this.state.vietnaminfo.death }</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default VietnamSummary;