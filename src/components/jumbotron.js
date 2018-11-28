import React, { Component } from 'react';
import {Bootstrap} from 'react-bootstrap';
class Jumbotron extends Component {
  componentDidMount(){
    if(process.env.REACT_APP_URL) console.log('testing', process.env.REACT_APP_URL);
  }
  render() {
    return (


      <div className="jumbotron" className="Panel">
        <h1 className="welcomeMessage">Welcome to Medium Clone <br/> Where Words Matter</h1>
        <p className="message1">We’ll deliver the best stories and ideas on the topics you <br/> care about most straight to your homepage, app, or inbox.</p>
        <br/><br/>

        <button type="button" className="btn1">< a href="#">Get Started</a> </button>&nbsp;
        <button type="button" className="btn2"><a href="#">Learn more</a></button>
    </div>

    );
  }
}

export default Jumbotron;
