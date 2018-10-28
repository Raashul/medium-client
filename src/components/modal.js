import React, { Component } from 'react';
import {Bootstrap} from 'react-bootstrap';
import Google from '../public/google.png';
import Facebook from '../public/facebook.png';

class Modal extends Component {

  constructor(props){
    super(props);
    this.state = {
      classNameStyle: 'modal fade in',
      display: 'block'
    }
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount(){
    if(process.env.REACT_APP_URL) console.log('testing', process.env.REACT_APP_URL);
    this.setState({classNameStyle:'modal fade in', display: 'block'});
  }
  
  handleClose = () =>{
    this.setState({classNameStyle:'modal fade', display: 'none'});
  }

  render() {
    const imageSize = {
      height: '20px',
      width: '20px'
    }

    if(this.props.data){
      var idName = this.props.data.idName;
      var buttonFunction = this.props.data.buttonFunction;
      var backgroundColor = this.props.data.backgroundColor;
      var title = this.props.data.title;
      var tagline = this.props.data.tagline;
    }
    const style = {
      classNameStyle: this.state.classNameStyle,
      display: this.state.display
    }
    return (
      <div className= {style.classNameStyle} id= {idName} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" focus="true" style={{border_radius: '8px', color:'black', display: style.display}}>
          <div className="modal-dialog" role="document">
          <div className="modal-content text-center" style={{background: backgroundColor}}>
          <div className="modal-body">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="myModalLabel"> {title} </h4>
            <span> {tagline} </span>
            <div className="modal-buttons">
              <button className="btn btn-default btn-lg" href="#" role="button"><img src={Google} style={{height :imageSize.height, width: imageSize.width}}/> {buttonFunction} With Google</button>
              <br />
              <br />
              <button className="btn btn-default btn-lg" href="#" role="button"><img src={Facebook} style={{height :imageSize.height, width: imageSize.width}} /> {buttonFunction} With Facebook</button>
            </div>
          </div>
          </div>
          </div>
      </div>
    );
  }
}
export default Modal;
