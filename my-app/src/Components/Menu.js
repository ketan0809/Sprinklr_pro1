import React, { Component } from 'react';



class Items extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="item1">
                <div className="item1-img">
                    <img src={this.props.itemdetails.itemImgSrc} className="item1-img"/>
                </div>
                <div className="item1-detail">
                    <div className="item1-name">{this.props.itemdetails.itemName}</div>
                    <div className="item1-cart" id={this.props.itemdetails.itemId} onClick={this.props.onItemClick}>
                        Add To Cart
                    </div>
                </div>
            </div>
        )
    }
}


class MenuItem extends Component{

    constructor(props){
        super(props);
    }

    render(){
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

    render() {
        return (
            <div className="menu-title" onClick={this.props.onMenuCategory}>
                <div className="menu-allitem"> All Item </div>
                <div className="menu-beverage"> Beverage </div>
                <div className="menu-snacks"> Snacks </div>
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