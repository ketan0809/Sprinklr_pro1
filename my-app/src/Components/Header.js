import React, { Component } from 'react';



class Header extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="header">
                <div className="header-list">
                    <a href="#" id="no-decoration">HOME</a>
                </div>
                <div className="header-list">
                    <a href="#menu" id="no-decoration">MENU</a>
                </div>
                <div className="header-list">
                    <a href="#displayorder" id="no-decoration">DISPLAY ORDER</a>
                </div>
                <div className="header-list">
                    <a href="#pendingorder" id="no-decoration">PENDING ORDER</a>
                </div>
                <div className="header-user">
                    <img src="Images/person.jpg" id="user-image"/>
                </div>
            </div>
        )
    }
}

export default Header;
