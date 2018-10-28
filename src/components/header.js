import React, { Component } from 'react';
import {Bootstrap} from 'react-bootstrap';
import Google from '../public/google.png';
import Facebook from '../public/facebook.png';
import Modal from '../components/modal';
class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      idName : '',
      buttonFunction : '',
      backgroundColor : '',
      title: '',
      tagline: '',
      showModal: false
    }
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  componentDidMount(){
    if(process.env.REACT_APP_URL) console.log('testing', process.env.REACT_APP_URL);
  }

  handleSignIn = () =>{
    this.setState({idName: 'signin', buttonFunction: 'SignIn', backgroundColor: '#D7EFEE', title: 'Welocme Back', tagline: 'Sign In To Get To Your Personalized Homepage', showModal: true});
  }

  handleSignUp = () =>{
    this.setState({idName: 'signup', buttonFunction: 'SignUp', backgroundColor: '#E8F3EC', title: 'Get Connected With Medium Clone', tagline: 'Sign Up To Get To Your Personalized Homepage', showModal:true});
  }

  render() {
    let modal;
    if(this.state.showModal){
      modal = <Modal data={this.state} />;
    }
    else{
      modal = null;
    }
    return (
      <div className="headers">
        <div className= "row">
            <div className="col-sm-4 text-left">Become a member</div>
            <div className="col-sm-4 text-center">Medium Clone</div>

            <div className="col-sm-4 text-right">
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
              <button type="button" className="btn btn-default" data-toggle="modal" data-target="#signin" style={{border:'none', color:'green'}} onClick={this.handleSignIn}>Sign In</button>
              <button type="button" className="btn btn-default" data-toggle="modal" data-target="#signup" style={{border:'1px solid green', color:'green'}} onClick={this.handleSignUp}>Sign Up</button>
            </div>
        </div>
        {modal}
      </div>
    );
  }
}

export default Header;
