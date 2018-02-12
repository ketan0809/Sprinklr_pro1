import React, { Component } from 'react';
import {Controller,model} from "../index";



class Order extends Component{
    constructor(props){
        super(props);
        this.displayOrderList = this.displayOrderList.bind(this);
        this.getTimeAndTable = this.getTimeAndTable.bind(this);
    }

    displayOrderList(orderInfo){
        let orders = [];
        for(let item in orderInfo){
            if(item === 'orderId' || item === 'time' || item === 'status'){
                continue;
            }
            orders.push(<span key={item['orderId']}>{item} :- {orderInfo[item]}</span>);
        }
        return orders;
    }

    getTimeAndTable(orderInfo){
        return <span>Table No :- 1    Time :- {orderInfo['time']}</span>
    }

    render() {
        let displayOrder = this.displayOrderList(this.props.orderDetails);
        let timeAndTable = this.getTimeAndTable(this.props.orderDetails);
        return (
            <div class="order-pending1" id={this.props.orderDetails.orderId} onClick={this.props.onRemoveOrder}>
                <div class="pendingorder-display">
                    <div class="display-order">
                        {displayOrder}
                    </div>
                    <div class="tableno-time">
                        {timeAndTable}
                    </div>
                </div>
                <div class="status-btn">Pending</div>
                <div class="cancel-btn">X</div>
            </div>
        )
    }
}



class PendingOrder extends Component{
    constructor(props){
        super(props);
        this.state = {
            pendingOrder : Controller.getLocalPendingOrder()
        }
        this.displayOrderList = this.displayOrderList.bind(this);
        this.handlerRemoveOrder = this.handlerRemoveOrder.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            pendingOrder: nextProps.orderList
        })
    }

    displayOrderList(orderList){
        let pendingOrderList = [];
        orderList.forEach( (item) => {
            pendingOrderList.push(Controller.getLocalItemByKey(item));
        });
        return pendingOrderList;
    }

    handlerRemoveOrder(e){

    }

    render() {
        let orderList = this.displayOrderList(this.state.pendingOrder);
        return (
            <div className="order-container">
                <div class="ordername">
                    <div class="ordername-pending" id="pendingorder">Pending order</div>
                </div>
                <div class="ordername-pending-order">
                    {orderList.map((item) =>  <Order key={item['orderId']} orderDetails={item} onRemoveOrder={this.handlerRemoveOrder}/>)}
                </div>

            </div>
        )
    }
}

export default PendingOrder;