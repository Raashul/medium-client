import React, { Component } from 'react';
import HoveringMenu from '../components/HoveringMenu';

import * as api from '../api';

class NewStory extends Component{

  componentDidMount(){
    if(process.env.REACT_APP_URL) console.log('testing', process.env.REACT_APP_URL);
  }

  handleSubmit() {
    const payload = {
      body: 'this is first test from UI',
      title: 'testing my title',
    }

    api.postNewStory(payload)
      .then(response => {
        console.log("response", response);
      })
      .catch(err => {
        console.log('err', err);
      })
  }

  render(){
    return(
      <div>
        <HoveringMenu />
        <button onClick = {() => this.handleSubmit()}> Submit test</button>
      </div>
    );
  }
}

export default NewStory;
