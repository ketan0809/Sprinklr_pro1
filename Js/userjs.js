

/* =====Model===== */

let model = {
    myLocalStorage : window.localStorage,

    category:[
        'All Item',
        'Beverage',
        'Snacks'
    ],

    selectedCategory : null,

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
    }
};


/* ===== Octopus ===== */

let octopus = {

    init: function(){
        model.selectedCategory = model.category[0];
        view.init();
        viewPlaceOrder.init();
        view.displaySelectedItem(model.items,model.selectedCategory);
        for(let item in model.myLocalStorage ){
            if(!model.myLocalStorage.hasOwnProperty(item)){
                continue;
            };
            if(isNaN(Number(item))==true && item!='orderNumber'){
                viewPlaceOrder.render(item);
            }
        }
    },

    getSelectedCategory:function(){
        return model.selectedCategory;
    },

    getItemList:function(){
        return model.items;
    },

    getLocalStorage:function(){
        return model.myLocalStorage;
    },

    filteringByCategory: function(event){
        let categoryBtn = event.target.innerHTML;
        console.log(categoryBtn);
        if(model.category.includes(categoryBtn.trim())) {
            model.selectedCategory = categoryBtn;
            view.displaySelectedItem(model.items, model.selectedCategory);
        }
    },

    addToCart:function(event){
        if(event.target.className!='item1-cart'){
            return ;
        }
        let itemId = event.target.closest('.item1').id;

        if(model.myLocalStorage.getItem(itemId) != null){
            return ;
        }

        let itemToBeAdded = JSON.stringify(model.items[itemId]);
        model.myLocalStorage.setItem(itemId,itemToBeAdded);
        event.target.innerHTML="Added To Cart";
        viewOrder.renderOrder(itemId);
        viewOrder.init();
    },

    updateCartItem:function(event){
        let clickedButtonClass = event.target.className;
        if(clickedButtonClass == 'item-btn-plus'){
            let findInputValue = event.target.parentNode.childNodes;
            for(itemBtn in findInputValue){
                if(findInputValue[itemBtn].className=='item-btn-value'){
                    let cartItem = findInputValue[itemBtn].closest('.orderlist-item');
                    let itemId = cartItem.id;
                    let getData = JSON.parse(model.myLocalStorage[itemId]);
                    getData.itemQuantity +=1;
                    findInputValue[itemBtn].innerHTML = getData.itemQuantity;
                    model.myLocalStorage.setItem(itemId,JSON.stringify(getData));
                }
            }
        }else if(clickedButtonClass == 'item-btn-minus'){
            let findInputValue = event.target.parentNode.childNodes;
            for(itemBtn in findInputValue){
                if(findInputValue[itemBtn].className=='item-btn-value'){
                    let cartItem = findInputValue[itemBtn].closest('.orderlist-item');
                    let itemId = cartItem.id;
                    let getData = JSON.parse(model.myLocalStorage[itemId]);
                    if(getData.itemQuantity <=1){
                        return ;
                    }
                    getData.itemQuantity -=1;
                    findInputValue[itemBtn].innerHTML = getData.itemQuantity;
                    model.myLocalStorage.setItem(itemId,JSON.stringify(getData));
                }
            }
        }else if(clickedButtonClass == 'orderlist-item-cancel-btn'){
            let cartItem = event.target.closest('.orderlist-item');
            // console.log(cartItem);
            view.deleteItem(cartItem);
            model.myLocalStorage.removeItem(cartItem.id);
            let removedItem=document.getElementById(cartItem.id);
            let addToCartButton=removedItem.getElementsByClassName("item1-cart")[0];
            addToCartButton.innerHTML="Add To Cart";

        }else if(clickedButtonClass == 'btn-placeorder'){

            if(model.myLocalStorage.getItem('orderNumber') == null) {
                model.myLocalStorage.setItem('orderNumber', 1);
            }
            else{
                model.myLocalStorage.setItem('orderNumber',Number(model.myLocalStorage.getItem('orderNumber'))+1);
            }
            let orderId = 'order' + model.myLocalStorage.getItem('orderNumber');
            let orderInfo = {};
            for(items in model.myLocalStorage){
                if(model.myLocalStorage.hasOwnProperty(items)) {
                    let allItem = JSON.parse(model.myLocalStorage.getItem(items));
                    let itemName = allItem.itemName;
                    orderInfo[itemName] = allItem.itemQuantity;
                }
            }
            let currentTime=new Date();
            orderInfo['time']=currentTime.getHours()+":"+currentTime.getMinutes();
            orderInfo['status'] = 'pending';
            model.myLocalStorage.setItem(orderId,JSON.stringify(orderInfo));
            viewPlaceOrder.render(orderId);
            document.location.reload();
            window.location.href = "index.html#pendingorder";
        }else{
            return ;
        }
    },

    itemIncrement(){

    },
    itemDecrement(){

    },

    removeOrder : function (event) {
        if(event.target.className!='cancel-btn')
            return ;
        let item=event.target.closest('.order-pending1');
        model.myLocalStorage.removeItem(item.id);
        view.deleteItem(item);
    }

};


/* ====== View ====== */


//  <------  Display items in menu section ----->

let view = {

    init:function(){
        let menuTitle = document.getElementsByClassName('menu-title')[0];
        menuTitle.onclick = octopus.filteringByCategory;
        for(let item in model.myLocalStorage){
            if(!model.myLocalStorage.hasOwnProperty(item)){
                continue;
            };
            if(isNaN(Number(item))!=true){
                model.myLocalStorage.removeItem(item);
            }
        }
    },
    displaySelectedItem:function(itemsList,category) {
        let items = document.getElementsByClassName('items')[0];
        items.innerHTML="";
        let containerData ="";
        for(let item in itemsList) {
            if ( category.trim() == 'All Item' || itemsList[item].itemCategory == category.trim()) {
                containerData = containerData +
                    `<div class="item1" id='${item}'>
                        <div class="item1-img">
                             <img src="${itemsList[item].itemImgSrc}" style="width: 210px;height: 220px">
                        </div>
                        <div class="item1-detail">
                              <div class="item1-name">${itemsList[item].itemName}</div>
                              <div class="item1-cart">
                                Add To Cart
                              </div>
                        </div>
                    </div>`;
            }
        }
        items.innerHTML = containerData;
        items.onclick = octopus.addToCart;
    },
    deleteItem(item){
        item.parentNode.removeChild(item);
    }
};

 // <--------   Display items in cart view  ------->

let viewOrder = {

    init:function(){
        let cartItem = document.getElementsByClassName('orderlist')[0];
        cartItem.onclick = octopus.updateCartItem;
    },

    renderOrder:function(itemId){
        let items = JSON.parse(octopus.getLocalStorage()[itemId]);
        let orderlist = document.getElementsByClassName('orderlist-display')[0];
        orderlist.innerHTML +=
            `<div class="orderlist-item" id="${itemId}">
                        <div class="orderlist-item-img">
                            <img src="${items.itemImgSrc}" alt="tea image" style="width: 65px;height: 65px">
                        </div>
                        <div class="orderlist-item-name">
                            <span>${items.itemName}</span>
                        </div>
                        <div class="orderlist-item-btn">
                            <button class="item-btn-minus"> - </button>
                            <div class="item-btn-value">${items.itemQuantity}</div>
                            <button class="item-btn-plus"> + </button>
                        </div>
                        <div class="orderlist-item-cancel-btn">
                            X
                        </div>
            </div>`;
    }

};

// <------- Display order in pending list ------>

let viewPlaceOrder = {

    init:function(){
        let orderBox=document.getElementsByClassName("ordername-pending-order")[0];
        orderBox.onclick=octopus.removeOrder;
    },

    render:function(orderId){
        let items = JSON.parse(octopus.getLocalStorage().getItem(orderId));
        let pendingOrder = document.getElementsByClassName('ordername-pending-order')[0];
        let createList= "";
        for(item in items){
            if(item == 'time' || item =='status')
                continue;
            createList += `<span> ${item} :- ${items[item]}</span>`;
        }
        let time = items['time'];
        pendingOrder.innerHTML +=
                    `<div class="order-pending1" id=${orderId}>
                        <div class="pendingorder-display">
                            <div class="display-order">
                                ${createList}
                            </div>
                            <div class="tableno-time">
                                <span>Table No :- 1    Time :- ${time}</span>
                            </div>
                        </div>
                        <div class="status-btn">Pending</div>
                        <div class="cancel-btn">X</div>
                    </div>`
    }

};

octopus.init();