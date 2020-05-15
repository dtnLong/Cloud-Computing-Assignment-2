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
        this.searchChange = this.searchChange.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
        this.handleSorting = this.handleSorting.bind(this);
        this.sortProperty = {
            image_ref: "",
            sort_target: '',
            order: 'descending'
        }
        this.state = {
            search: "",
            checked: false,
            worldtable: []
        }
    }

    componentDidMount() {
        fetch('api/world_table')
            .then(res => res.json())
            .then(worldtable => this.setState({worldtable}))
    }

    //Handle search box change
    searchChange(event) {
        this.setState({search: event.target.value});
    }

    //Handle case sensitive
    checkboxChange(event) {
        this.setState({checked: event.target.checked})
    }

    //Handle sorting
    handleSorting(sort_target, event) {
        var sorted_array = this.state.worldtable; 
        var references = {
            "Country": this.countrysort.current,
            "Confirmed": this.confirmsort.current,
            "Active": this.activesort.current,
            "Recovered": this.recoversort.current,
            "Deaths": this.deathsort.current
        }
        // Set inital sort ref to current sort target
        if (this.sortProperty.image_ref === "") {
            this.sortProperty.image_ref = references[sort_target];
        }
        // When the current sort target is different from previous sort target, 
        // change previous image to default,
        // store current ref and name of sort target, set order to descending
        // Flip flop between ascending and descending if the same sort target is selected
        if (sort_target !== this.sortProperty.sort_target) {
            this.sortProperty.image_ref.src = "/images/sorting_arrow.png"
            this.sortProperty.image_ref = references[sort_target];
            this.sortProperty.sort_target = sort_target;
            this.sortProperty.order = "descending";
            this.sortProperty.image_ref.src = "/images/des-sort.png";
        } else if (this.sortProperty.order === "descending") {
            this.sortProperty.order = "ascending"
            this.sortProperty.image_ref.src = "/images/asc_sort.png";
        } else {
            this.sortProperty.order = "descending"
            this.sortProperty.image_ref.src = "/images/des-sort.png";
        }
        // Convert element in array that is not country to int for sorting
        if (sort_target !== "Country") {
            sorted_array.forEach(element => {
                element[sort_target] = parseInt(element[sort_target] ,10);
            });
        }
        // Sorting algorithm
        sorted_array.sort((a, b) => {
            if (a[sort_target] < b[sort_target]) {
                if (this.sortProperty.order === "ascending") {
                    return -1;
                } else {
                    return 1
                }
            }
            if (a[sort_target] > b[sort_target]) {
                if (this.sortProperty.order === "ascending") {
                    return 1;
                } else {
                    return -1
                }
            }
            return 0;
        })
        this.setState({worldtable: sorted_array});
    }

    render() {
        return (
            <div>
                <h1>Statistic by Country</h1>
                <div className='world_search'>
                    <label>Search: </label>
                    <input type='text' placeholder="Search country..." onChange={this.searchChange} pre></input>
                    <label>  Case sensitive:</label>
                    <input type='checkbox' onChange={this.checkboxChange}></input>
                </div>
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