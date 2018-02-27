import React, { Component } from 'react';



class Items extends Component{
    constructor(){
        super();
    }

    handlerOnItemClick = (e) => {
        const itemId = e.target.id;
        this.props.onItemClick(itemId);
    };

    render(){
        return (
            <div className="item1">
                <div className="item1-img">
                    <img src={this.props.itemdetails.itemImgSrc} className="item1-img"/>
                </div>
                <div className="item1-detail">
                    <div className="item1-name">{this.props.itemdetails.itemName}</div>
                    <div className="item1-cart" id={this.props.itemdetails.itemId} onClick={this.handlerOnItemClick}>
                        Add To Cart
                    </div>
                </div>
            </div>
        )
    }
}


class MenuItem extends Component{
    render(){
        if(this.props.items === 'Loading'){
            return (
                <div className="Loading-img">
                     <img src='Images/_preloader.gif'/>
                </div>
            );
        }
        return (
            <div className="items">
                {this.props.items.map( item => <Items key={item.itemId} itemdetails={item} onItemClick={this.props.onItemClick}/> )}
            </div>
        )
    }

}


class MenuTitle extends Component{
    constructor(props){
        super(props);

    }

    handlerFilterCategory = (e) => {
        const clickButtonClassName = e.target.dataset.category;
        this.props.onMenuCategory(clickButtonClassName);
    };

    render() {
        return (
            <div className="menu-title">
                <div className="menu-allitem" data-category ='All Item' onClick={this.handlerFilterCategory}> All Item </div>
                <div className="menu-beverage" data-category ='Beverage' onClick={this.handlerFilterCategory}> Beverage </div>
                <div className="menu-snacks" data-category ='Snacks' onClick={this.handlerFilterCategory}> Snacks </div>
            </div>
        )
    }
}


class Menu extends Component{
    constructor(props){
        super(props);
    }

    render() {

        return (
            <div id='menu'>
                    <MenuTitle onMenuCategory = {this.props.onMenuTitle}/>
                    <MenuItem items={this.props.items} onItemClick={this.props.onAddToCart}/>
            </div>
        )
    }
}

export default Menu