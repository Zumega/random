import React, { Component } from 'react';
import Konami from 'konami';
import Lightbox from './Lightbox';
import ThumbBox from './ThumbBox';
import './App.css';

class App extends Component {
    constructor() {
        super();

        this.state = {
          kTrigger: false
        };

        this.handleTrigger = this.handleTrigger.bind(this);

        this.K = new Konami(this.handleTrigger);
    }

    handleTrigger () {
        this.setState(prevState => ({
            ...prevState,
            kTrigger: true
        }))
    }

  render() {
    return (
        <div>
            { true && <ThumbBox /> }
            <Lightbox trigger={this.state.kTrigger} />
        </div>
    );
  }
}

export default App;