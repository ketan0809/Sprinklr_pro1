import React, { Component } from 'react';
import Menu from './Menu';
import ContainerRight from './ContainerRight';
import {Controller,model} from '../index';


class Container extends Component{
    constructor(props){
        super(props);
        this.itemList = Controller.getItemList();
        this.state = {
            selectedCategory : 'All Item',
            cartItem :Controller.getLocalCartItem()
        }
        this.handlerFilterItem = this.handlerFilterItem.bind(this);
        this.handlerAddToCart = this.handlerAddToCart.bind(this);
    }

    handlerFilterItem(e){
        let onSelectedCategory = e.target.innerHTML.trim();
        if(onSelectedCategory === 'All Item' || onSelectedCategory === 'Beverage' || onSelectedCategory === 'Snacks'){
            this.setState({
                selectedCategory:onSelectedCategory,
                cartItem:Controller.getLocalCartItem()
            });
        }
    }

    handlerAddToCart(e){
       if(e.target.className !== 'item1-cart'){
           return ;
       }
       const itemId = e.target.closest('.item1').id;
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

    render(){
        let displayItems = this.FilterItem(this.state.selectedCategory);
        const cartItem = this.state.cartItem;
        return (
            <div className="container">
                <Menu items={displayItems} onMenuTitle={this.handlerFilterItem} onAddToCart={this.handlerAddToCart}/>
                <ContainerRight items={cartItem} />
            </div>
        )
    }
}

export default Container;
