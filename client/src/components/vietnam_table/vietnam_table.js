import React, { Component } from 'react';
import './vietnam_table.css';

class VietnamTable extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            vietnamtable: [],
            search: '',
        }
    }

    handleChange(event) {
        this.setState({search: event.target.value})
    }

    async componentDidMount() {
        fetch('api/vietnam_table')
            .then(res => res.json())
            .then(vietnamtable => this.setState({vietnamtable}))
        // const response = await fetch('api/vietnam_table');
        // const data = await response.json();
        // this.setState({vietnamtable: data});
        // this.setState({filtered_table: data});
    }

    render() {
        return (
            <div>
                <h1>Statistic by Provinces in Vietnam</h1>
                <input type='text' onChange={this.handleChange}></input>
                <label>Case sensitive: </label>
                <input id='province_case_sen' type='checkbox'></input>
                {/* <form onSubmit={this.handleSubmit}>
                    <input type='text' onChange={this.handleChange}></input>
                    <button>search</button>
                </form> */}
                <table class='vietnam_table'>
                    <thead>
                        <tr>
                            <th>Province</th>
                            <th>Confirmed</th>
                            <th>Active</th>
                            <th>Recoverd</th>
                            <th>Death</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.state.vietnamtable.filter(province => province["Provincial name"].includes(this.state.search))
                        .map(vietnam_table => 
                            <tr>
                                <td>{vietnam_table["Provincial name"]}</td>
                                <td>{vietnam_table["Infected case"]}</td>
                                <td>{vietnam_table["Active case"]}</td>
                                <td>{vietnam_table["Recovered case"]}</td>
                                <td>{vietnam_table["Death case"]}</td>
                            </tr>
                        )} */}
                        {this.state.vietnamtable.map(vietnamtable => {
                            var search = this.state.search;
                            var province = vietnamtable["Provincial name"]; 
                            if (!document.getElementById('province_case_sen').checked) {
                                search = search.toLowerCase();
                                province = province.toLowerCase();
                            }
                            if (province.includes(search)) {
                                return <tr>
                                    <td>{vietnamtable["Provincial name"]}</td>
                                    <td>{vietnamtable["Infected case"]}</td>
                                    <td>{vietnamtable["Active case"]}</td>
                                    <td>{vietnamtable["Recovered case"]}</td>
                                    <td>{vietnamtable["Death case"]}</td>
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

export default VietnamTable;