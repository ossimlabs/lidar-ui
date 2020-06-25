import React, { Fragment } from "react";
import axios from "axios";
import "./styles.css";
import { SERVER_URL } from "./config";
import Search from "./components/Search";

class App extends React.Component {
  state = {
    text: "",
    backgroundColor: "",
    color: "",
    fontWeight: "bold",
    lidarIndexerUrl: "",
    postsPerPage: null,
  };

  setBanner() {
    axios.get(`${SERVER_URL}/settings`).then((response) => {
      this.setState({
        text: response.data.bannerText,
        backgroundColor: response.data.bannerBackgroundColor,
        color: response.data.bannerTextColor,
        fontWeight: response.data.bannerFontWeight,
        lidarIndexerUrl: response.data.lidarIndexerUrl,
        postsPerPage: response.data.postsPerPage
      });
    });
  }

  componentDidMount() {
    this.setBanner();
  }

  render() {
    this.style = {
      backgroundColor: this.state.backgroundColor,
      fontWeight: this.state.fontWeight,
      color: this.state.color,
    };

    if (this.state.lidarIndexerUrl === "") {
      return "Loading...";
    } else {
      return (
        <React.Fragment>
          <header className="text-center" style={this.style}>
            {this.state.text}
          </header>
          <div className="container-fluid">
            <h1>Lidar</h1>
            <h4>Web-based viewer data</h4>
            <Search
              indexerUrl={this.state.lidarIndexerUrl}
              postsPerPage={this.state.postsPerPage}
            />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default App;
