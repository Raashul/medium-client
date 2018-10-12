import React, { Component } from 'react';

class Home extends Component {
  componentDidMount(){
    if(process.env.REACT_APP_URL) console.log('testing', process.env.REACT_APP_URL);
  }
  render() {
    return (
      <div className="App">
        Home Page
      </div>
    );
  }
}

export default Home;
