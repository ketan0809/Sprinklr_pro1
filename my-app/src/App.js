import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header'
import Container from './Components/Container'

// <-------  Model ------->




class App extends Component{
  constructor(props){
      super(props);

  }

  render() {
    return (
        <div>
            <Header />
            <div className="header-img">
                <img src="Images/2.jpg" className="img"/>
                    <div className="text">
                        <p className="img-text">The Sprinklr <br /> Pantry </p>
                    </div>
            </div>
            <Container />
        </div>
    );
  }
}

export default App;
