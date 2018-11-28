import React, { Component } from 'react';
import * as Comps from '../components/index';
class NewStory extends Component{

  constructor(props){
    super(props);
    this.state = {
      val: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){

  }

  onChange = (value) =>{
    this.setState({val:value});
  }

  onSubmit = () =>{
    console.log(this.state.val);
  }

  render(){
    return(
      <div>
        <Comps.HoveringMenu onEditorChange={this.onChange}/>
        <button style={{backgroundColor:'white',color:'black'}}onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}

export default NewStory;
