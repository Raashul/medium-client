import React, { Component } from 'react';

class PostHeader extends Component {

  constructor(props){
    super(props);
    this.state = {
      idName : ''
    }
  }

  componentDidMount(){
    if(process.env.REACT_APP_URL) console.log('testing', process.env.REACT_APP_URL);
  }

  render() {
    return (
      <div className="postHeaders">
        <nav class="navbar navbar-default">
              <div class="container-fluid">
              <div class="navbar-header">
                <a class="navbar-brand" href="#">Medium</a>
              </div>
              <ul class="nav navbar-nav navbar-right">
                <li><a href="#"><i class="glyphicon glyphicon-search"></i></a></li>
                <li><a href="#"><i class="glyphicon glyphicon-bell"></i></a></li>
                <li><button type="button" class="btn btn-default">Upgrade</button></li>
                <li><img src="/public/facebook.png"></img></li>
              </ul>
              </div>
          </nav>
      </div>
    );
  }
}

export default PostHeader;
