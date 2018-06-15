import React, { Component } from 'react';
import './App.css';
import Header from './components/HeaderContainer';
import { BodyContainer } from './components/BodyContainer';
import Footer from './components/FooterContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { mode: 'SEARCH' };
  }

  handleChangeMode = (newMode) => {
    return () => {
      if (this.state.mode !== newMode) {
        this.setState({ mode: newMode })
      }
    }
  };

  render() {
    return (
      <div className="App">
        <Header handleChangeMode={this.handleChangeMode} mode={this.state.mode}/>
        <BodyContainer mode={this.state.mode} />
        <Footer/>
      </div>
    );
  }
}

export default App;
