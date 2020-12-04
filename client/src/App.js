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
            <h1 className="heading">Lidar Viewer</h1>
            <h4 className="subheading">Upload, Convert, and View Lidar Data</h4>
            <p style={{color: "grey"}} className="small">The Lidar Viewer application allows you to upload lidar data (.las or .laz format). It will convert the data into Potree or Entwine formats.  Once the conversion process is done you can view the Potree data in the browser, or download a zip file an run it locally. The Entwine data can be downloaded and viewed using the Entwine application.</p>
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
