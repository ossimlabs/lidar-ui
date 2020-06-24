import React from 'react';
import axios from 'axios';
import './styles.css';
import { SERVER_URL } from "./config";
import Search from './Search';

class Interface extends React.Component {

    state = {
        text: "",
        backgroundColor: "",
        color: "",
        fontWeight: "bold",
        lidarIndexerUrl: ""
    };

//Set the state based on Rest APIs
    setBanner() {

        axios.get(`${SERVER_URL}/settings`)
            .then(response => {
                this.setState({
                    text: response.data.bannerText,
                    backgroundColor: response.data.bannerBackgroudColor,
                    color: response.data.bannerTextColor,
                    fontWeight: response.data.bannerFontWeight,
                    lidarIndexerUrl: response.data.lidarIndexerUrl
                });
                console.log(this.state)
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
        if (this.state.text === "Unclassified"){
            this.style = {
                backgroundColor: 'rgb(34,139,34)',
                fontWeight: this.state.fontWeight,
                color: this.state.color
            }

        } if (this.state.text === "Secret") {
            this.style = {
                backgroundColor: 'rgb(139,34,34)',
                fontWeight: this.state.fontWeight,
                color: this.state.color
            }
            // TODO: Add Top Secret
        }

        if (this.state.lidarIndexerUrl === ""){
            return "Loading..."
        } else {
            return (
              <div className="Interface">
                  <header style={this.style}>{this.state.text}</header>
                  <Search indexerUrl={this.state.lidarIndexerUrl}/>
              </div>
            );
        }


    }
}

/* Export for other JS files to import */
export default Interface
