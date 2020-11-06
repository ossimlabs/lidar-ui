import React from "react";
import axios from "axios";
import "./styles.css";
import { SERVER_URL } from "./config";
import UploadFileModal from "./components/Upload/UploadFileModal";
import Search from "./components/Search";
import "./search-style.css";

class App extends React.Component {
  state = {
    text: "",
    backgroundColor: "",
    color: "",
    fontWeight: "bold",
    lidarIndexerUrl: "",
    lidarWebHostUrl: "",
    lidarUploadUrl: "",
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
        lidarWebHostUrl: response.data.lidarWebHostUrl,
        lidarUploadUrl: response.data.lidarUploadUrl,
        postsPerPage: 5
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
          <UploadFileModal uploadUrl={this.state.lidarUploadUrl}/>
          <div className="container-fluid">
            <h1 className="heading">Lidar</h1>
            <h4 className="subheading">Web-based viewer data</h4>
            <Search
              webHostLink={this.state.lidarWebHostUrl}
              indexerUrl={this.state.lidarIndexerUrl}
              postsPerPage={this.state.postsPerPage}
              SearchBy
            />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default App;
