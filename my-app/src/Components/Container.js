import React, { Component } from 'react';
import Menu from './Menu';
import ContainerRight from './ContainerRight';


let model = {

    myLocalStorage : window.localStorage,

    items:{
        0:{
            itemId: '0',
            itemName: 'BornvitaMilk',
            itemImgSrc: 'Images/bornvita.jpg',
            itemQuantity: 1,
            itemCategory: 'Beverage'
        },
        1:{
            itemId: '1',
            itemName: 'Bourbon Biscuit',
            itemImgSrc: 'Images/bourbon.jpeg',
            itemQuantity: 1,
            itemCategory: 'Snacks'
        },
        2:{
            itemId: '2',
            itemName: 'Coffee',
            itemImgSrc: 'Images/coffee.jpeg',
            itemQuantity: 1,
            itemCategory: 'Beverage'
        },
        3:{
            itemId: '3',
            itemName: 'ColdMilk',
            itemImgSrc: 'Images/coldmilk.jpg',
            itemQuantity: 1,
            itemCategory: 'Beverage'
        },
        4:{
            itemId: '4',
            itemName: 'Goodday Biscuit',
            itemImgSrc: 'Images/goodday.jpg',
            itemQuantity: 1,
            itemCategory: 'Snacks'
        },
        5:{
            itemId: '5',
            itemName: 'Green Tea',
            itemImgSrc: 'Images/greentea.jpg',
            itemQuantity: 1,
            itemCategory: 'Beverage'
        },
        6:{
            itemId: '6',
            itemName: 'HotMilk',
            itemImgSrc: 'Images/hotmilk.jpg',
            itemQuantity: 1,
            itemCategory: 'Beverage'
        },
        7:{
            itemId: '7',
            itemName: 'JimJam Biscuit',
            itemImgSrc: 'Images/jimjam.jpg',
            itemQuantity: 1,
            itemCategory: 'Snacks'
        },
        8:{
            itemId: '8',
            itemName: 'Tea',
            itemImgSrc: 'Images/tea.jpg',
            itemQuantity: 1,
            itemCategory: 'Beverage'
        }
    },
    addItemToLocalStorage:function(itemId){
        let myLocalStorage = model.myLocalStorage;
        let itemList = model.items;
        myLocalStorage.setItem(itemId,JSON.stringify(itemList[itemId]));
    },
    pluseItemQuantity:function(itemId){
        let myLocalStorage = model.myLocalStorage;
        let getData = JSON.parse(myLocalStorage.getItem(itemId));
        getData.itemQuantity += 1;
        myLocalStorage.setItem(itemId,JSON.stringify(getData));
    },
    minusItemQuantity:function(itemId){
        let myLocalStorage = model.myLocalStorage;
        let getData = JSON.parse(myLocalStorage.getItem(itemId));
        if(getData.itemQuantity <= 1){
            return ;
        }
        getData.itemQuantity -= 1;
        myLocalStorage.setItem(itemId,JSON.stringify(getData));
    },
    removeItemToLocalStorage:function(itemId){
        let myLocalStorage = model.myLocalStorage;
        myLocalStorage.removeItem(itemId);
    },
    removeOrderFromLocalStorage:function(orderId){
        let myLocalStorage = model.myLocalStorage;
        myLocalStorage.removeItem(orderId);
    }
};
// <------ Controller ----->

let Controller = {
    init:function(){

    },
    getItemList:function(){
        return model.items;
    },
    addItemToCart(itemId){
        let myLocalStoragr = model.myLocalStorage;
        if(myLocalStoragr.getItem(itemId) != null){
            return ;
        }
        model.addItemToLocalStorage(itemId);
    },
    getLocalStorageData:function(){
        return model.myLocalStorage;
    },
    getLocalCartItem:function(){
        let myLocalStorage = model.myLocalStorage;
        let cartItem = [];
        for(let item in myLocalStorage){
            if(!myLocalStorage.hasOwnProperty(item)){
                continue;
            }
            if(isNaN(Number(item)) === false && item.trim() !== 'orderNumber'){
                cartItem.push(JSON.parse(myLocalStorage[item]));
            }
        }
        return cartItem;
    },
    getLocalPendingOrder(){
        let myLocalStorage = model.myLocalStorage;
        let pedingOrder = [];
        for(let item in myLocalStorage){
            if(!myLocalStorage.hasOwnProperty(item)){
                continue;
            }
            if(isNaN(Number(item)) === true && item.trim() !== 'orderNumber'){
                pedingOrder.push(JSON.parse(myLocalStorage[item]));
            }
        }
        return pedingOrder;
    },
    increaseItemQuantity(itemId){
        model.pluseItemQuantity(itemId);
    },
    decreaseItemQuantity(itemId){
        model.minusItemQuantity(itemId);
    },
    removeItemFromCart(itemId){
        model.removeItemToLocalStorage(itemId);
    },
    placeOrder(){
        let orderedItem = Controller.getLocalCartItem();
        if(orderedItem.length === 0){
            return ;
        }
        Controller.makeEmptyCart(orderedItem);
        Controller.makeOrder(orderedItem);
    },
    makeEmptyCart(orderedItem){
        orderedItem.forEach( (item) => {
            model.removeItemToLocalStorage(item.itemId);
        });
    },
    makeOrder(orderedItem){
        let myLocalStorage = model.myLocalStorage;
        let orderInfo = {};
        let orderId = 'order' + Controller.getOrderId();
        orderInfo['orderId'] = orderId;
        orderedItem.forEach((item) => {
            orderInfo[item.itemName] = item.itemQuantity;
        });
        orderInfo['time'] = Controller.getCurrentTime();
        orderInfo['status'] = 'Pending';
        myLocalStorage.setItem(orderId,JSON.stringify(orderInfo));
    },
    getOrderId(){
        let myLocalStorage = model.myLocalStorage;
        let orderId = null;
        if(myLocalStorage.getItem('orderNumber') == null){
            orderId = 1;
            myLocalStorage.setItem('orderNumber',orderId);
        }else{
            orderId = myLocalStorage.getItem('orderNumber');
            myLocalStorage.setItem('orderNumber',Number(orderId)+1);
            orderId=Number(orderId)+1;
        }
        return orderId;
    },
    getCurrentTime(){
        let currentTime = new Date();
        return (currentTime.getHours()+":"+currentTime.getMinutes());
    },
    getLocalItemByKey(key){
        return JSON.parse(model.myLocalStorage.getItem(key));
    },
    removeOrderFromPendingList(orderId){
        model.removeOrderFromLocalStorage(orderId);
    }

};


class Container extends Component{
    constructor(props){
        super(props);
        this.itemList = Controller.getItemList();
        this.state = {
            selectedCategory: 'All Item',
            cartItem : Controller.getLocalCartItem(),
            pendingOrderList : Controller.getLocalPendingOrder()
        }
        this.handlerFilterItem = this.handlerFilterItem.bind(this);
        this.handlerAddToCart = this.handlerAddToCart.bind(this);
        this.plusItemQuantity = this.plusItemQuantity.bind(this);
        this.minusItemQuantity = this.minusItemQuantity.bind(this);
        this.removeItemFromCart = this.removeItemFromCart.bind(this);
        this.handlerPlaceOrder = this.handlerPlaceOrder.bind(this);
        this.handlerRemoveOrder = this.handlerRemoveOrder.bind(this);
     }

    handlerFilterItem(e){
        let onSelectedCategory = e.target.innerHTML.trim();
        if(onSelectedCategory === 'All Item' || onSelectedCategory === 'Beverage' || onSelectedCategory === 'Snacks'){
            this.setState({
                selectedCategory:onSelectedCategory,
            });
        }
    }

    FilterItem(selectedCategory){
        let itemList = this.itemList;
        let items = [];
        let flag = false;
        if(selectedCategory === 'All Item'){
            flag = true;
        }
        for(let item in itemList){
            if(flag || itemList[item].itemCategory === selectedCategory){
                items.push(itemList[item]);
            }
        }
        return items;
    }

    handlerAddToCart(e){
       const itemId = e.target.id;
       const cartItem = this.addItemToCart(itemId);
       this.setState({
           cartItem: cartItem
       })
    }

    addItemToCart(itemId){
        Controller.addItemToCart(itemId);
        const  cartItemList= Controller.getLocalCartItem();
        return cartItemList;
    }

    plusItemQuantity(itemId){
        Controller.increaseItemQuantity(itemId);
        const updatedCartItem = Controller.getLocalCartItem();
        this.setState({
            cartItem : updatedCartItem
        });
    }

    minusItemQuantity(itemId){
        Controller.decreaseItemQuantity(itemId);
        const updatedCartItem = Controller.getLocalCartItem();
        this.setState({
            cartItem : updatedCartItem
        });
    }

    removeItemFromCart(itemId){
        Controller.removeItemFromCart(itemId);
        const updatedCartItem = Controller.getLocalCartItem();
        this.setState({
            cartItem : updatedCartItem
        });
    }

    handlerPlaceOrder(e){
        const clickButtonClssName = e.target.className;
        if(clickButtonClssName.trim() === 'btn-placeorder'){
            Controller.placeOrder();
            const updatedPendingOrderList = Controller.getLocalPendingOrder();
            this.setState({
                cartItem : [],
                pendingOrderList : updatedPendingOrderList
            });
        }
    }

    handlerRemoveOrder(orderId){
        Controller.removeOrderFromPendingList(orderId);
        const updatedPendingOrderList  = Controller.getLocalPendingOrder();
        this.setState({
           pendingOrderList:updatedPendingOrderList
        });
    }

    render(){
        const displayItems = this.FilterItem(this.state.selectedCategory);
        const cartItem = this.state.cartItem;
        const pendingOrderList = this.state.pendingOrderList;
        return (
            <div className="container">
                <Menu items={displayItems} onMenuTitle={this.handlerFilterItem} onAddToCart={this.handlerAddToCart}/>
                <ContainerRight cartItems = {cartItem} pendingOrderList={pendingOrderList}
                                plusItemQuantity={this.plusItemQuantity} minusItemQuantity={this.minusItemQuantity}
                                removeItemFromCart={this.removeItemFromCart} onPlaceOrder={this.handlerPlaceOrder}
                                removeOrderFromPendingList={this.handlerRemoveOrder}/>
            </div>
        )
    }
}

export default Container;
