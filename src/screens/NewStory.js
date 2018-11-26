import React, { Component } from 'react';
import HoveringMenu from '../components/HoveringMenu';
class NewStory extends Component{

  componentDidMount(){
    if(process.env.REACT_APP_URL) console.log('testing', process.env.REACT_APP_URL);
  }

  render(){
    return(
      <div>
        <HoveringMenu />
      </div>
    );
  }
}

export default NewStory;
