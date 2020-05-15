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
        this.searchChange = this.searchChange.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
        this.handleSorting = this.handleSorting.bind(this);
        this.sortProperty = {
            image_ref: "",
            sort_target: '',
            order: 'descending'
        }
        this.state = {
            search: '',
            checked: false,
            vietnamtable: [],
        }
    }

    searchChange(event) {
        this.setState({search: event.target.value});
    }

    checkboxChange(event) {
        this.setState({checked: event.target.checked});
    }

    handleSorting(sort_target, event) {
        var sorted = this.state.vietnamtable; 
        var references = {
            "Provincial name": this.provincesort.current,
            "Infected case": this.confirmsort.current,
            "Active case": this.activesort.current,
            "Recovered case": this.recoversort.current,
            "Death case": this.deathsort.current
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
        if (sort_target !== "Provincial name") {
            sorted.forEach(element => {
                element[sort_target] = parseInt(element[sort_target] ,10);
            });
        }
        // Sorting algorithm
        sorted.sort((a, b) => {
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
        this.setState({vietnamtable: sorted});
    }

    componentDidMount() {
        fetch('api/vietnam_table')
            .then(res => res.json())
            .then(vietnamtable => this.setState({vietnamtable}))
    }

    render() {
        return (
            <div>
                <h1>Statistic by Provinces in Vietnam</h1>
                <div className='vietnam_search'>
                    <label>Search: </label>
                    <input type='text' placeholder="Search province..." onChange={this.searchChange} pre></input>
                    <label>  Case sensitive:</label>
                    <input type='checkbox' onChange={this.checkboxChange}></input>
                </div>
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