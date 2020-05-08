import React, { Component } from 'react';
import './world_table.css';

class WorldTable extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            search: "",
            worldtable: []
        }
    }

    handleChange(event) {
        this.setState({search: event.target.value});
    }

    componentDidMount() {
        fetch('api/world_table')
            .then(res => res.json())
            .then(worldtable => this.setState({worldtable}))
    }

    render() {
        return (
            <div>
                <h1>Statistic by Country</h1>
                <input type='text' onChange={this.handleChange}></input>
                <label>Case sensitive: </label>
                <input id='country_case_sen' type='checkbox'></input>
                <table class='world_table'>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Confirmed</th>
                            <th>Active</th>
                            <th>Recoverd</th>
                            <th>Death</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.state.worldtable.filter(province => province["Country"].includes(this.state.search))
                            .map(worldtable =>
                                <tr>
                                    <td>{worldtable.Country}</td>
                                    <td>{worldtable.Confirmed}</td>
                                    <td>{worldtable.Active}</td>
                                    <td>{worldtable.Recovered}</td>
                                    <td>{worldtable.Deaths}</td>
                                </tr>
                            )
                        } */}
                        {this.state.worldtable.map(worldtable => {
                            var search = this.state.search;
                            var country = worldtable.Country; 
                            if (!document.getElementById('country_case_sen').checked) {
                                search = search.toLowerCase();
                                country = country.toLowerCase();
                            }
                            console.log(country + " " + search);
                            if (country.includes(search)) {
                                return <tr>
                                    <td>{worldtable.Country}</td>
                                    <td>{worldtable.Confirmed}</td>
                                    <td>{worldtable.Active}</td>
                                    <td>{worldtable.Recovered}</td>
                                    <td>{worldtable.Deaths}</td>
                                </tr>
                            } else {
                                return null;
                            }
                        })}
                    </tbody>
                        
                </table>
            </div>
        );
    }
}

export default WorldTable;