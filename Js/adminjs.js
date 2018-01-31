

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
               viewPending.init(order);
           }
       }

    },

    getItems:function(){
        return model.items;
    },

    getLocalStorage:function () {
        return model.myLocalStorage;
    },

    deleteItem:function(event){
        if(event.target.className != 'delete-btn'){
            return ;
        }
        let item = event.target.closest('.pending-order');
        model.myLocalStorage.removeItem(item.id);
        viewPending.delete(item);
    }

};

/* ====== view ======= */

// <------ show how many items will make ? ------>

let view = {

     init:function(getData){

         for(let item in getData){
             if(!getData.hasOwnProperty(item)){
                 continue;
             };
             if(item != 'time' && item != 'status'){
                 octopus.getItems()[item].quantity += getData[item];
             }
         }

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
        let pedingList = document.getElementsByClassName('pending-list')[0];
        let createList = "";
        for(let item in getData){
            if(item == 'time' || item == 'status'){
                continue;
            }
            createList += `<span> ${item}:- ${getData[item]}</span>`;
        }
        pedingList.innerHTML +=
                    `<div class="pending-order" id=${order}>
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
                                <span>Pending</span>
                            </div>

                            <div class="delete-btn">
                                X
                            </div>
                    </div>`
        pedingList.onclick = octopus.deleteItem;
    },

    delete:function(item){
        item.parentNode.removeChild(item);
    }
}


octopus.init();