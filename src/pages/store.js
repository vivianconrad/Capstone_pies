import React, {Component} from 'react';


export default class Store extends Component{
    render(){
        return (
            <div className={'app_page'}>
                <div className="top_header">
                    <h1>Store</h1>
                </div>
                <h2>You have {localStorage.getItem("coins")} coins</h2>
            </div>
        );
    }
};


