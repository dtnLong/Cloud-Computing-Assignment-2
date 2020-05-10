import React, { Component } from 'react';
import './vietnam_table.css';

class VietnamTable extends Component {
    constructor() {
        super();
        this.provincesort = React.createRef();
        this.confirmsort = React.createRef();
        this.activesort = React.createRef();
        this.recoversort = React.createRef();
        this.deathsort = React.createRef();
        this.sortProperty = {
            image_ref: "",
            value: '',
            order: 'descending'
        }
        this.handleChange = this.handleChange.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
        this.handleSorting = this.handleSorting.bind(this);
        this.state = {
            search: '',
            checked: false,
            vietnamtable: [],
        }
    }

    handleChange(event) {
        this.setState({search: event.target.value});
    }

    checkboxChange(event) {
        this.setState({checked: event.target.checked});
    }

    handleSorting(value, event) {
        var sorted = this.state.vietnamtable; 
        var references = {
            "Provincial name": this.provincesort.current,
            "Infected case": this.confirmsort.current,
            "Active case": this.activesort.current,
            "Recovered case": this.recoversort.current,
            "Death case": this.deathsort.current
        }
        if (this.sortProperty.image_ref === "") {
            this.sortProperty.image_ref = references[value];
        }
        console.log(this.sortProperty.image_ref);
        if (value !== this.sortProperty.value) {
            this.sortProperty.image_ref.src = "/images/sorting_arrow.png"
            this.sortProperty.image_ref = references[value];
            this.sortProperty.value = value;
            this.sortProperty.order = "descending";
            this.sortProperty.image_ref.src = "/images/des-sort.png";
        } else if (this.sortProperty.order === "descending") {
            this.sortProperty.order = "ascending"
            this.sortProperty.image_ref.src = "/images/asc_sort.png";
        } else {
            this.sortProperty.order = "descending"
            this.sortProperty.image_ref.src = "/images/des-sort.png";
        }
        sorted.forEach(element => {
            element["Infected case"] = parseInt(element["Infected case"] ,10);
            element["Active case"] = parseInt(element["Active case"] ,10);
            element["Recovered case"] = parseInt(element["Recovered case"] ,10);
            element["Death case"] = parseInt(element["Death case"] ,10);
        });
        sorted.sort((a, b) => {
            if (a[value] < b[value]) {
                if (this.sortProperty.order === "ascending") {
                    return -1;
                } else {
                    return 1
                }
            }
            if (a[value] > b[value]) {
                if (this.sortProperty.order === "ascending") {
                    return 1;
                } else {
                    return -1
                }
            }
            return 0;
        })
        this.setState({vietnamtable: sorted});
    }

    componentDidMount() {
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
                <input type='checkbox' onChange={this.checkboxChange}></input>
                {/* <form onSubmit={this.handleSubmit}>
                    <input type='text' onChange={this.handleChange}></input>
                    <button>search</button>
                </form> */}
                <table class='vietnam_table'>
                    <thead>
                        <tr>
                            <th>Province <input ref={this.provincesort} type="image" src="/images/sorting_arrow.png" alt="sort" onClick={(e) => this.handleSorting("Provincial name", e)}></input></th>
                            <th>Confirmed <input ref={this.confirmsort} type="image" src="/images/sorting_arrow.png" alt="sort" onClick={(e) => this.handleSorting("Infected case", e)}></input></th>
                            <th>Active <input ref={this.activesort} type="image" src="/images/sorting_arrow.png" alt="sort" onClick={(e) => this.handleSorting("Active case", e)}></input></th>
                            <th>Recoverd <input ref={this.recoversort} type="image" src="/images/sorting_arrow.png" alt="sort" onClick={(e) => this.handleSorting("Recovered case", e)}></input></th>
                            <th>Death <input ref={this.deathsort} type="image" src="/images/sorting_arrow.png" alt="sort" onClick={(e) => this.handleSorting("Death case", e)}></input></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.state.vietnamtable.filter(province => province["Provincial name"].includes(this.state.search))
                        .map(vietnam_table => 
                            <tr >
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
                            if (!this.state.checked) {
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