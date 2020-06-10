import React from 'react';
import axios from 'axios';
import './styles.css';
import Search from './Search';

class Interface extends React.Component {
    constructor() {
        super();
    }
// Initialization process
    state = {
        text: "",
        backgroundColor: "",
        color: "",
        fontWeight: "bold"
    };

//Set the state based on Rest APIs
    setBanner() {

//  When running locally, rep[lace axios.get with:  'axios.get('http://localhost:8080/hello')'
        axios.get('http://lidar-search-ui.ossim.io/hello')
            .then(response => {
                this.setState({
                    text: response.data.bannerText,
                    backgroundColor: response.data.bannerBackgroudColor,
                    color: response.data.bannerTextColor,
                    fontWeight: response.data.bannerFontWeight
                });
                /* For test purposes, console log what is being read from REST endpoints
                console.log(response.data); */
            });
    }

    componentDidMount(){
        this.setBanner();
    }

    render() {
        /* Set the Banner Style based on the Banner Text */
        this.style = {
            backgroundColor: this.state.backgroundColor,
            fontWeight: this.state.fontWeight,
            color: this.state.color
        }
        if (this.state.text == "Unclassified"){
            this.style = {
                backgroundColor: 'rgb(34,139,34)',
                fontWeight: this.state.fontWeight,
                color: this.state.color
            }
        }if(this.state.text == "Secret") {
            this.style = {
                backgroundColor: 'rgb(139,34,34)',
                fontWeight: this.state.fontWeight,
                color: this.state.color
            }
        }
        /* Return what will be rendered on the screen */
        return (
            <div className="Interface">
                <header style={this.style}
                >{this.state.text}</header>

                <Search/>
            </div>
        );
    }
}

/* Export for other JS files to import */
export default Interface
