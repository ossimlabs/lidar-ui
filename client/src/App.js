import React from 'react';
import axios from 'axios';
import './styles.css';
import { SERVER_URL } from "./config";
import Search from './components/Search';

class App extends React.Component {

    state = {
        text: "",
        backgroundColor: "",
        color: "",
        fontWeight: "bold",
        lidarIndexerUrl: ""
    };

    setBanner() {

        axios.get(`${SERVER_URL}/settings`)
            .then(response => {
                this.setState({
                    text: response.data.bannerText,
                    backgroundColor: response.data.bannerBackgroundColor,
                    color: response.data.bannerTextColor,
                    fontWeight: response.data.bannerFontWeight,
                    lidarIndexerUrl: response.data.lidarIndexerUrl
                });
            });
    }

    componentDidMount(){
        this.setBanner();
    }

    render() {

        this.style = {
            backgroundColor: this.state.backgroundColor,
            fontWeight: this.state.fontWeight,
            color: this.state.color
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

export default App;
