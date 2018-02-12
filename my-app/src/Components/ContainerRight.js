import React, { Component } from 'react';
import PendingOrder from './PendingOrder';
import {Controller,model} from '../index';

class CartItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            itemQuantity : this.props.items.itemQuantity
        }
        this.handlerUpdateCartItem = this.handlerUpdateCartItem.bind(this);
        this.plusItemQuantity = this.plusItemQuantity.bind(this);
        this.minusItemQuantity = this.minusItemQuantity.bind(this);
    }

    handlerUpdateCartItem(e){
        let clickButtonClass = e.target.className;
        let itemId = e.target.closest('.orderlist-item').id;
        if(clickButtonClass === 'item-btn-plus'){
            let itemUpdatedQuantity = this.plusItemQuantity(itemId);
            this.setState({
                itemQuantity: itemUpdatedQuantity
            });
        }else if(clickButtonClass === 'item-btn-minus'){
            let itemUpdatedQuantity = this.minusItemQuantity(itemId);
            this.setState({
                itemQuantity: itemUpdatedQuantity
            })
        }else if(clickButtonClass === 'orderlist-item-cancel-btn'){
            this.props.handlerCartItem(itemId);
        }else{
            return ;
        }

    }

    plusItemQuantity(itemId){
        Controller.increaseItemQuantity(itemId);
        const updatedData = Controller.getLocalItemByKey(itemId);
        return updatedData.itemQuantity;
    }

    minusItemQuantity(itemId){
        Controller.decreaseItemQuantity(itemId);
        const updatedData = Controller.getLocalItemByKey(itemId);
        return updatedData.itemQuantity;
    }

    render(){
        let itemname = this.props.items.itemName;
        let itemimg = this.props.items.itemImgSrc;
        let itemquantity = this.state.itemQuantity;
        return (
            <div class="orderlist-item" id={this.props.items.itemId} onClick={this.handlerUpdateCartItem}>
                <div class="orderlist-item-img">
                    <img src={itemimg} alt={itemname} className="orderlist-item-img"/>
                </div>
                <div class="orderlist-item-name">
                    <span>{itemname}</span>
                </div>
                <div class="orderlist-item-btn">
                    <button class="item-btn-minus"> - </button>
                    <div class="item-btn-value">{itemquantity}</div>
                    <button class="item-btn-plus"> + </button>

                </div>
                <div class="orderlist-item-cancel-btn">
                    X
                </div>
            </div>
        );
    }
}

class AddToCart extends Component{
    constructor(props){
        super(props);
        this.state = {
            cartItem : Controller.getLocalCartItem(),
        }
        this.handlerRemoveCartItem = this.handlerRemoveCartItem.bind(this);
        this.handlerPlaceOrder = this.handlerPlaceOrder.bind(this);
    }

    handlerRemoveCartItem(itemId){
        Controller.removeItemFromCart(itemId);
        let cartItem = Controller.getLocalCartItem();
        this.setState({
            cartItem: cartItem
        });
    }

    handlerPlaceOrder(e){
        let clickButtonClass = e.target.className;
        if(clickButtonClass != 'btn-placeorder'){
            return ;
        }
        this.props.onPlaceOrder();
    }
    componentWillReceiveProps(nextProps){

        this.setState({
            cartItem: nextProps.items
        })
    }


    render(){
        let cartItem = this.state.cartItem;
        return (
            <div className='orderlist' id="displayorder">
                <div class="orderlist-title">
                    <span>ITEMS YOU HAVE SELECTED</span>
                </div>
                <div className="orderlist-display">
                    {cartItem.map( item => <CartItem key={item.itemId}items={item} handlerCartItem={this.handlerRemoveCartItem}/>)}
                </div>
                <div class="orderlist-placeorder">
                    <button type="button" value="submit" class="btn-placeorder" onClick={this.handlerPlaceOrder}>Place order</button>
                </div>
            </div>
        )
    }
}

class ContainerRight extends Component{
    constructor(props){
        super(props);
        this.state ={
            orderList : Controller.getLocalPendingOrder(),
            cartItem : Controller.getLocalCartItem()
        }
        this.handlerPlaceOrder = this.handlerPlaceOrder.bind(this);
    }

    handlerPlaceOrder(){
        Controller.placeOrder();
        this.setState({
            orderList : Controller.getLocalPendingOrder(),
            cartItem : Controller.getLocalCartItem()
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            cartItem: nextProps.items
        })
    }

    render(){
        let cartItem = this.state.cartItem;
        let pendingOrderList = this.state.orderList;
        console.log('cartItem->>',cartItem);
        console.log('pendingOrderList->>',pendingOrderList);
        return (
            <div className='container-display'>
                <AddToCart items={cartItem} onPlaceOrder={this.handlerPlaceOrder}/>
                <PendingOrder orderList={pendingOrderList}/>
            </div>
        )
    }
}

export default ContainerRight;