import React, { Component } from 'react';
import PendingOrder from './PendingOrder';


class CartItem extends Component{
    constructor(props){
        super(props);
        this.handlerUpdateCartItem = this.handlerUpdateCartItem.bind(this);
    }

    handlerUpdateCartItem(e){
        const clickButtonClass = e.target.className;
        const itemId = this.props.items.itemId;
        if(clickButtonClass === 'item-btn-plus'){
            console.log('itemid',itemId);
            this.props.plusItemQuantity(itemId);
        }else if(clickButtonClass === 'item-btn-minus'){
            this.props.minusItemQuantity(itemId);
        }else if(clickButtonClass === 'orderlist-item-cancel-btn'){
            this.props.removeItemFromCart(itemId);
        }

    }

    render(){
        const itemname = this.props.items.itemName;
        const itemimg = this.props.items.itemImgSrc;
        const itemquantity = this.props.items.itemQuantity;
        const itemId = this.props.items.itemId;

        return (
            <div className="orderlist-item" id={itemId}>
                <div className="orderlist-item-img">
                    <img src={itemimg} alt={itemname} className="orderlist-item-img"/>
                </div>
                <div className="orderlist-item-name">
                    <span>{itemname}</span>
                </div>
                <div className="orderlist-item-btn">
                    <button className="item-btn-minus" onClick={this.handlerUpdateCartItem}> - </button>
                    <div className="item-btn-value">{itemquantity}</div>
                    <button className="item-btn-plus" onClick={this.handlerUpdateCartItem}> + </button>

                </div>
                <div className="orderlist-item-cancel-btn" onClick={this.handlerUpdateCartItem}>
                    X
                </div>
            </div>
        );
    }
}

class AddToCart extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const cartItem = this.props.items;
        return (
            <div className='orderlist' id="displayorder">
                <div className="orderlist-title">
                    <span>ITEMS YOU HAVE SELECTED</span>
                </div>
                <div className="orderlist-display">
                    {cartItem.map( item => <CartItem key={item.itemId} items={item}
                                                     plusItemQuantity={this.props.plusItemQuantity}
                                                     minusItemQuantity={this.props.minusItemQuantity}
                                                     removeItemFromCart={this.props.removeItemFromCart}/>)}
                </div>
                <div className="orderlist-placeorder">
                    <button type="button" value="submit" className="btn-placeorder" onClick={this.props.onPlaceOrder}>
                        Place order
                    </button>
                </div>
            </div>
        )
    }
}

class ContainerRight extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const cartItems = this.props.cartItems;
        const pendingOrderList = this.props.pendingOrderList;
        return (
            <div className='container-display'>
                <AddToCart items={cartItems} onPlaceOrder={this.props.handlerPlaceOrder}
                           plusItemQuantity={this.props.plusItemQuantity}
                           minusItemQuantity={this.props.minusItemQuantity}
                           removeItemFromCart={this.props.removeItemFromCart} onPlaceOrder={this.props.onPlaceOrder}/>
                <PendingOrder pendingOrderList={pendingOrderList} removeOrderFromPendingList={this.props.removeOrderFromPendingList}/>
            </div>
        )
    }
}

export default ContainerRight;