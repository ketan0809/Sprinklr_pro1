import React, { Component } from 'react';



class AdminHeader extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="header">
                <div className="header-list">
                    <a href="#" className="no-decoration">HOME</a>
                </div>
                <div className="header-list">
                    <a href="#menu" className="no-decoration">MENU</a>
                </div>
                <div className="header-list">
                    <a href="#pendingorder" className="no-decoration">PENDING ORDER</a>
                </div>
            </div>
        )
    }
}

export default AdminHeader;
