import React, { Component } from 'react';
import PendingOrder from "./PendingOrder";
import CompletedOrder from './CompletedOrder';

class OrderType extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
          <div className={'orderList'}>
              <PendingOrder />
              <CompletedOrder />
          </div>
        );
    }
}

export  default OrderType;