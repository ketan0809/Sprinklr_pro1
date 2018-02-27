import React, { Component } from 'react';
import styles from '../../css/admin.css';
import OrderType from "./OrderType";


class Item extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="items">
                <div className="items-img">
                    <img src="Images/bornvita.jpg" alt="bornvita" className={"set-img"} />
                </div>
                <div className="items-quantity">
                    <spna>Bornvita<br/>5</spna>
                </div>
            </div>
        );
    }
}


class DisplayItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={"display-item"}>
                <Item/>
            </div>
        );
    }
}

class AdminContainer extends Component{
    render(){
        return (
            <div className={"container"}>
                <DisplayItem />
                <OrderType />
            </div>
        )
    }
}


export default AdminContainer;
