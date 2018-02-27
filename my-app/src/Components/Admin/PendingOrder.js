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
        <div className="status-btn">
            <span>Pending</span>
        </div>
    );
};

let DeleteButton = (props) => {
    return (
        <div className="delete-btn">
            X
        </div>
    );
}


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
                <DeleteButton />
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
            <div className={'order-list'}>
                <Order />
            </div>
        );
    }
}

class PendingOrder extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id={pendingorder}>
                <div className="order-type">
                    <span>Pending Order</span>
                </div>
                <OrderList />
            </div>
        );
    }
}

export default PendingOrder;