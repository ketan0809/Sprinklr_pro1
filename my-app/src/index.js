import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


/* =====Model===== */

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
    }
};


// <------ Controller ----->


let Controller = {
    init:function(){
        ReactDOM.render(<App />, document.getElementById('root'));
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
                pedingOrder.push(item);
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
      return Controller.makeOrder(orderedItem);
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
        return orderId;
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
    }

};


Controller.init();

export {Controller};
export {model};

registerServiceWorker();
