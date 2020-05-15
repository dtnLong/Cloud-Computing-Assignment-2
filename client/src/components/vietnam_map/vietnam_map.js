import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Circle } from 'google-maps-react';

class VietnamMap extends Component {
    constructor() {
        super();
        this.map = React.createRef();
        this.circle = React.createRef();
        this.handleZoomChange = this.handleZoomChange.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.state = {
            option: "Infected",
            base_radius: 3125,
            vietnam_table: [],
            vietnam_coordinates: {
                "Ha Noi": [21.0278, 105.8342],
                "Ho Chi Minh": [10.8231, 106.6297],
                "Vinh Phuc": [21.3609, 105.5474],
                "Ninh Binh": [20.2130, 105.9230],
                "Binh Thuan": [11.0904, 108.0721],
                "Quang Ninh": [21.0064, 107.2925],
                "Da Nang": [16.0544, 108.2022],
                "Bac Giang": [21.3015, 106.6291],
                "Ha Nam": [20.5835, 105.9230],
                "Ha Tinh": [18.2944, 105.6745],
                "Dong Thap": [10.4938, 105.6882],
                "Thanh Hoa": [19.8067, 105.7852],
                "Quang Nam": [15.5394, 108.0191],
                "Tay Ninh": [11.3495, 106.0640],
                "Bac Lieu": [9.2516, 105.5136],
                "Lao Cai": [22.3381, 104.1487],
                "Thua Thien - Hue": [16.4674, 107.5905],
                "Ninh Thuan": [11.6739, 108.8630],
                "Tra Vinh": [9.8127, 106.2993],
                "Can Tho": [10.0452, 105.7469],
                "Ha Giang": [22.7662, 104.9389],
                "Lai Chau": [22.3687, 103.3119],
                "Thai Nguyen": [21.5614, 105.8760],
                "Bac Ninh": [21.1214, 106.1111],
                "Hai Duong": [20.9386, 106.3207],
                "Hung Yen": [20.8526, 106.0170],
                "Khanh Hoa": [12.2585, 109.0526],
                "Dong Nai": [11.0686, 107.1676],
                "Ben Tre": [10.1082, 106.4406],
                "Cao Bang": [22.6666, 106.2640],
                "Bac Kan": [22.3033, 105.8760],
                "Tuyen Quang": [21.7767, 105.2280],
                "Dien Bien": [21.8042, 103.1077],
                "Son La": [21.3269, 103.9144],
                "Yen Bai": [21.6838, 104.4551],
                "Hoa Binh": [20.6861, 105.3131],
                "Lang Son": [21.8564, 106.6291],
                "Phu Tho": [21.2684, 105.2046],
                "Hai Phong": [20.8449, 106.6881],
                "Thai Binh": [20.5387, 106.3935],
                "Nam Dinh": [20.2792, 106.2051],
                "Nghe An": [19.2342, 104.9200],
                "Quang Binh": [17.6103, 106.3487],
                "Quang Tri": [16.7943, 106.9634],
                "Quang Ngai": [15.0760, 108.7126],
                "Binh Dinh": [14.1665, 108.9027],
                "Phu Yen": [13.0882, 109.0929],
                "Kon Tum": [14.6612, 107.8389],
                "Gia Lai": [13.8079, 108.1094],
                "Dak Lak": [12.7100, 108.2378],
                "Dak Nong": [12.2646, 107.6098],
                "Lam Dong": [11.5753, 108.1429],
                "Binh Phuoc": [11.7512, 106.7235],
                "Binh Duong": [11.3254, 106.4770],
                "Ba Ria - Vung Tau": [10.5417, 107.2430],
                "Long An": [10.6956, 106.2431],
                "Tien Giang": [10.4493, 106.3421],
                "Vinh Long": [10.0861, 106.0170],
                "An Giang": [10.5216, 105.1259],
                "Kien Giang": [9.8250, 105.1259],
                "Hau Giang": [9.7579, 105.6413],
                "Soc Trang": [9.6025, 105.9739],
                "Ca Mau": [9.1527, 105.1961],
            }
        }
    }

    componentDidMount() {
        fetch('api/vietnam_table')
            .then(res => res.json())
            .then(vietnam_table => this.setState({vietnam_table}))
    }

    handleZoomChange(event) {
        this.setState({base_radius: 50000 / (this.map.current.map.zoom * this.map.current.map.zoom)});
        // this.circle.current.circle.radius = 10000;
        console.log(this.map.current);
    }

    handleOption(option, event) {
        this.setState({option: option});
    }

    render() {
        const mapStyles = {
            width: '100%',
            height: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
        };
        const map_option = {
            "Infected": ["Infected case", "#FF0000"],
            "Active": ["Active case", "#FF8C00"],
            "Recovered": ["Recovered case", "#008000"],
            "Death": ["Death case", "#808080"]
        }
        return (
            <div>
                <h1>Vietnam Interactive Map</h1>
                <button style={{height: "40px"}} onClick={(e) => this.handleOption("Infected", e)}>Infected cases</button>
                <button style={{height: "40px"}} onClick={(e) => this.handleOption("Active", e)}>Active cases</button>
                <button style={{height: "40px"}} onClick={(e) => this.handleOption("Recovered", e)}>Recovered cases</button>
                <button style={{height: "40px"}} onClick={(e) => this.handleOption("Death", e)}>Death cases</button>
                <Map
                    ref={this.map}
                    google={this.props.google}
                    style={mapStyles}
                    initialCenter={{ lat: 14.0583, lng: 108.2772}}
                    minZoom={4}
                    maxZoom={9}
                    zoom={4}
                    onZoomChanged={this.handleZoomChange}
                >
                    {this.state.vietnam_table.map((vietnam_info, index) => {
                        return <Circle ref={this.circle} 
                                radius={this.state.base_radius * parseInt(vietnam_info[map_option[this.state.option][0]])} 
                                fillColor={map_option[this.state.option][1]} 
                                key={index} id={index} strokeOpacity={0} center={{
                                    lat: this.state.vietnam_coordinates[vietnam_info["Provincial name"]][0],
                                    lng: this.state.vietnam_coordinates[vietnam_info["Provincial name"]][1]
                                }}/>
                    })}
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDP9gRlpBnpLl58PumwcW5uqMyoI4G6p6U'
})(VietnamMap);