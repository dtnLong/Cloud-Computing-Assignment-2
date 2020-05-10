import React, { Component } from 'react';
import './world_table.css';

class WorldTable extends Component {
    constructor() {
        super();
        this.countrysort = React.createRef();
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
            search: "",
            checked: false,
            worldtable: []
        }
    }

    handleChange(event) {
        this.setState({search: event.target.value});
    }

    checkboxChange(event) {
        this.setState({checked: event.target.checked})
    }

    handleSorting(value, event) {
        var sorted = this.state.worldtable; 
        var references = {
            "Country": this.countrysort.current,
            "Confirmed": this.confirmsort.current,
            "Active": this.activesort.current,
            "Recovered": this.recoversort.current,
            "Deaths": this.deathsort.current
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
            element["Confirmed"] = parseInt(element["Confirmed"] ,10);
            element["Active"] = parseInt(element["Active"] ,10);
            element["Recovered"] = parseInt(element["Recovered"] ,10);
            element["Deaths"] = parseInt(element["Deaths"] ,10);
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
        this.setState({worldtable: sorted});
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
                <input type='checkbox' onChange={this.checkboxChange}></input>
                <table class='world_table'>
                    <thead>
                        <tr>
                            <th>Country <input ref={this.countrysort} type="image" src="/images/sorting_arrow.png" alt="sort" onClick={(e) => this.handleSorting("Country", e)}></input></th>
                            <th>Confirmed <input ref={this.confirmsort} type="image" src="/images/sorting_arrow.png" alt="sort" onClick={(e) => this.handleSorting("Confirmed", e)}></input></th>
                            <th>Active <input ref={this.activesort} type="image" src="/images/sorting_arrow.png" alt="sort" onClick={(e) => this.handleSorting("Active", e)}></input></th>
                            <th>Recoverd <input ref={this.recoversort} type="image" src="/images/sorting_arrow.png" alt="sort" onClick={(e) => this.handleSorting("Recovered", e)}></input></th>
                            <th>Death <input ref={this.deathsort} type="image" src="/images/sorting_arrow.png" alt="sort" onClick={(e) => this.handleSorting("Deaths", e)}></input></th>
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
                            if (!this.state.checked) {
                                search = search.toLowerCase();
                                country = country.toLowerCase();
                            }
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