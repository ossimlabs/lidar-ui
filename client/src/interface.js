import React from 'react';
import axios from 'axios';
import './styles.css';
import Search from './Search';

class Interface extends React.Component {
    constructor() {
        super();
    }

    state = {
        text: "",
        backgroundColor: "",
        color: "",
        fontWeight: "bold"
    };


    setBanner() {
        axios.get('http://lidar-dev.ossim.io/hello')
            .then(response => {
                this.setState({
                    text: response.data.bannerText,
                    backgroundColor: response.data.bannerBackgroudColor,
                    color: response.data.bannerTextColor,
                    fontWeight: response.data.bannerFontWeight

                });
                console.log(response.data);
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
        return (
            <div className="Interface">
                <header style={this.style}
                >{this.state.text}</header>
                <h1>Game of Thrones Books</h1>
                <h2>Fetch a list from an API and display it</h2>
                <Search/>
            </div>
        );
    }
}

export default Interface