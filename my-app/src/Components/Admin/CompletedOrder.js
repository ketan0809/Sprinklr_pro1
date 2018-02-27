import React, { Component } from 'react';


let PersonInfo = (props) => {
    return (
        <div className="person-detail">
            <span>Ketan Paladiya</span>
            <span>Table No:- 1</span>
            <span>Time :- 22:1</span>
        </div>
    );
};

let OrderInfo = (props) => {
    return (
        <div className="order-details">
            <span> Tea :- 1</span>
            <span> Coffee :- 2</span>
            <span> JimJam Biscuit :- 4</span>
        </div>
    );
};

let StatusButton = (props) => {
    return (
        <div className="status-btn approve">
            <span>Approved</span>
        </div>
    );
};



class Order extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="order-info">

                <div className="person-img">
                    <img src="Images/person.jpeg" alt="person" style="width: 80px;height: 80px" />
                </div>
                <PersonInfo />
                <OrderInfo />
                <StatusButton />

            </div>
        );
    }
}

class OrderList extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="order-list" id="order-list-completed">
                <Order />
            </div>
        );
    }
}



class CompletedOrder extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="completedOrder">
                <div className="order-type">
                    <span>Completed Order</span>
                </div>
                <OrderList />
            </div>
        );
    }
}

export default CompletedOrder;