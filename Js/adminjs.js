import React from 'react'

/* ====== model ====== */

let model= {
    myLocalStorage : window.localStorage,
    items : {
        'BornvitaMilk':{
            quantity : 0,
            imgSrc : 'Images/bornvita.jpg'
        },
        'Bourbon Biscuit':{
            quantity: 0,
            imgSrc : 'Images/bourbon.jpeg'
        },
        'Coffee':{
            quantity : 0,
            imgSrc : 'Images/coffee.jpeg'
        },
        'ColdMilk':{
            quantity : 0,
            imgSrc : 'Images/coldmilk.jpg'
        },
        'Goodday Biscuit':{
            quantity : 0,
            imgSrc : 'Images/goodday.jpg'
        },
        'Green Tea':{
            quantity : 0,
            imgSrc : 'Images/greentea.jpg'
        },
        'HotMilk':{
            quantity : 0,
            imgSrc : 'Images/hotmilk.jpg'
        },
        'JimJam Biscuit':{
            quantity : 0,
            imgSrc : 'Images/jimjam.jpg'
        },
        'Tea':{
            quantity : 0,
            imgSrc : 'Images/tea.jpg'
        }
    }

};

/* ====== octopus ====== */

let octopus = {

    init:function(){
       for(let order in model.myLocalStorage) {
           if (!model.myLocalStorage.hasOwnProperty(order)) {
               continue;
           };
           if(isNaN(Number(order))==true && order!='orderNumber'){
               let getData = JSON.parse(model.myLocalStorage[order]);
               view.init(getData);
               if(getData.status == 'pending') {
                   viewPending.init(order);
               }else if(getData.status == 'approve'){
                   console.log(order);
                   viewCompleted.init(order);

               }
           }
       }
    },

    getItems:function(){
        return model.items;
    },

    getLocalStorage:function () {
        return model.myLocalStorage;
    },

    updateMakingItem:function(getData){

        if(getData.status == 'pending') {
            for (let item in getData) {
                if (!getData.hasOwnProperty(item)) {
                    continue;
                };
                if (item != 'time' && item != 'status') {
                    model.items[item].quantity += getData[item];
                }
            }
        }else if(getData.status == 'approve'){
            for (let item in getData) {
                if (!getData.hasOwnProperty(item)) {
                    continue;
                };
                if (item != 'time' && item != 'status') {
                    if(model.items[item].quantity  >= getData[item]){
                        model.items[item].quantity  -= getData[item];
                    }
                }
            }
        }
    },

    updateOrder:function(event){
        if(event.target.className == 'delete-btn'){
            octopus.deleteOrder();
        }else if(event.target.className == 'status-btn'){
            octopus.statusUpdate();
        }else{
            return ;
        }
    },

    deleteOrder:function(){
        let item = event.target.closest('.order-info');
        model.myLocalStorage.removeItem(item.id);
        viewPending.delete(item);
    },

    statusUpdate:function(){
        let item = event.target.closest('.order-info');
        let getOrderId = JSON.parse(model.myLocalStorage[item.id]);
        getOrderId.status = 'approve';
        model.myLocalStorage.setItem(item.id,JSON.stringify(getOrderId));
        view.init(getOrderId);
        viewPending.delete(item);
        viewCompleted.init(item.id);
    },

    createOrderList:function(order){
        let createList = "";
        for(let item in order){
            if(item == 'time' || item == 'status'){
                continue;
            }
            createList += `<span> ${item}:- ${order[item]}</span>`;
        }
        return createList;
    },

};

/* ====== view ======= */

// <------ show how many items will make ? ------>

let view = {

     init:function(getData){

         octopus.updateMakingItem(getData);
         let item = document.getElementsByClassName('display-item')[0];
         item.innerHTML = "";
         let containerData = "";
         for(let item in model.items){
             containerData +=
                 `<div class="items">
                    <div class="items-img">
                        <img src="${model.items[item].imgSrc}" alt="bornvita" style="height: 92px;width: 100px">
                    </div>
                    <div class="items-quantity">
                        <spna>${item}<br/>${model.items[item].quantity}</spna>
                    </div>
                </div>`
         }
         item.innerHTML = containerData;
     },

};

// <------ display pending order ----->

let viewPending = {

    init:function(order){
        let getData = JSON.parse(octopus.getLocalStorage()[order]);
        let pedingList = document.getElementById('order-list-pending');
        const  createList = octopus.createOrderList(getData);
        pedingList.innerHTML +=
                    `<div class="order-info" id=${order}>
                            <div class="person-img">
                                <img src="Images/person.jpeg" alt="person" style="width: 80px;height: 80px">
                            </div>

                            <div class="person-detail">
                                <span>Ketan Paladiya</span>
                                <span>Table No:- 1</span>
                                <span>Time :- ${getData['time']}</span>
                            </div>

                            <div class="order-details">
                               ${createList}
                            </div>

                            <div class="status-btn">
                                Pending
                            </div>

                            <div class="delete-btn">
                                X
                            </div>
                    </div>`;
        pedingList.onclick = octopus.updateOrder;
    },

    delete:function(item){
        item.parentNode.removeChild(item);
    }
}


let viewCompleted = {

    init:function(order){
        let getData = JSON.parse(octopus.getLocalStorage()[order]);
        let completedList = document.getElementById('order-list-completed');
        const createList = octopus.createOrderList(getData);
        completedList.innerHTML +=
                `<div class="order-info" id="${order}">
                        <div class="person-img">
                            <img src="Images/person.jpeg" alt="person" style="width: 80px;height: 80px">
                        </div>

                        <div class="person-detail">
                            <span>Ketan Paladiya</span>
                            <span>Table No:- 1</span>
                            <span>Time :- ${getData['time']}</span>
                        </div>

                        <div class="order-details">
                            ${createList}
                        </div>

                        <div class="status-btn approve">
                            <span>Approved</span>
                        </div>
                    </div>`;
    }
}

ReactDOM.render(<h1> hello world </h1>,document.getElementById(''));

octopus.init();