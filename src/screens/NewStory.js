import React, { Component } from 'react';
import * as Comps from '../components/index';
import * as api from '../api';

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

    const payload = {
      body : this.state.val,
      title: 'first title test',
      claps: 0,
      category: 'Technology'
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
        <Comps.HoveringMenu onEditorChange={this.onChange}/>
        <button style={{backgroundColor:'white',color:'black'}}onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}

export default NewStory;
