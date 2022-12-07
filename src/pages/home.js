import React, {Component} from 'react';
import App from '../App.js';
// import DATA from '../index.js'

export default class Home extends Component{
    render(){
        return (
            <div className="app_page">
                {/* <div className="top_header">
                    <h1>Home</h1>
                </div> */}
                <App tasks={JSON.parse(localStorage.getItem("tasks"))} />
            </div>
        )
    };
};