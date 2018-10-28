import React, { Component } from 'react';
import {Bootstrap} from 'react-bootstrap';
class Jumbotron extends Component {
  componentDidMount(){
    if(process.env.REACT_APP_URL) console.log('testing', process.env.REACT_APP_URL);
  }
  render() {
    return (
      <div className="jumbotron" style={{background:'#E8F3EB'}}>
        <h1 className="display-4">Welcome to Medium Clone Where Words Matter</h1>
        <p className="lead">We’ll deliver the best stories and ideas on the topics you care about most straight to your homepage, app, or inbox.</p>
        <hr className="my-4" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <a className="btn btn-primary btn-lg" href="#" role="button">Get Started</a>
        <a className="btn btn-default btn-lg" href="#" role="button">Learn more</a>
    </div>

    );
  }
}

export default Jumbotron;
