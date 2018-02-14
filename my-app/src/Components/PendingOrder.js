import React, { Component } from 'react';




class Order extends Component{
    constructor(props){
        super(props);
        this.onCancelOrder = this.onCancelOrder.bind(this);
    }

    displayOrderList(orderInfo){
        let orders = [];
        for(let item in orderInfo){
            if(item === 'orderId' || item === 'time' || item === 'status'){
                continue;
            }
            orders.push(<span key={item}>{item} :- {orderInfo[item]}</span>);
        }
        return orders;
    }

    getTimeAndTable(orderInfo){
        return <span>Table No :- 1    Time :- {orderInfo['time']}</span>
    }

    onCancelOrder(e){
        const clickButtonClassName = e.target.className;
        if(clickButtonClassName === 'cancel-btn'){
            this.props.removeOrderFromPendingList(this.props.orderDetails.orderId);
        }
    }

    render() {
        let displayOrder = this.displayOrderList(this.props.orderDetails);
        let timeAndTable = this.getTimeAndTable(this.props.orderDetails);
        return (
            <div className="order-pending1" id={this.props.orderDetails.orderId}>
                <div className="pendingorder-display">
                    <div className="display-order">
                        {displayOrder}
                    </div>
                    <div className="tableno-time">
                        {timeAndTable}
                    </div>
                </div>
                <div className="status-btn">Pending</div>
                <div className="cancel-btn" onClick={this.onCancelOrder}>X</div>
            </div>
        )
    }
}



class PendingOrder extends Component{
    constructor(props){
        super(props);
    }
    render() {
        let orderList = this.props.pendingOrderList;
        return (
            <div className="order-container">
                <div className="ordername">
                    <div className="ordername-pending" id="pendingorder">Pending order</div>
                </div>
                <div className="ordername-pending-order">
                    {orderList.map((item) =>  <Order key={item['orderId']} orderDetails={item}
                                                     removeOrderFromPendingList={this.props.removeOrderFromPendingList}/>)}
                </div>

            </div>
        )
    }
}

export default PendingOrder;