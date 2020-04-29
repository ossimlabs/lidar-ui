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
        'background-color': ""
    };


    setBanner() {
        axios.get('http://localhost:8080/hello')
            .then(response => {
                this.setState({
                    text: response.data.bannerText,
                    color: response.data.bannerColor
                });
                /*console.log(response.data.bannerText);*/
            });
    }

    componentDidMount(){
        this.setBanner();
    }

    render() {
        const text = this.state;
        if (this.state.text == "Unclassified"){
            this.style = {
                'background-color': 'rgb(0,255,0)'
            }
        }else if(this.state.text == "Secret") {
            this.style = {
                'background-color': 'rgb(255,0,75)'
            }
        }else{
            this.style = {
                'background-color': 'rgb(200,0,255)'
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