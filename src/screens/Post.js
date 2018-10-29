import React, { Component } from 'react';
import {Bootstrap} from 'react-bootstrap';
import Header from '../components/header';
import request from 'request';
import PostHeader from '../components/post_header'


class Post extends Component {
  constructor(props){
    super(props);
    this.state = {
      post_title: props.match.params.post,
      post_data: {}
    }
    this.getData = this.getData.bind(this)
  }

    // get json data from the user_profile
    getData = () =>{
      var that = this;
      request("http://localhost:3000/postData.json",function(err, request, body){
        if(!err && request.statusCode === 200){
        var result = JSON.parse(body);
        that.setState({post_data: result});
        }
      });
    }

    componentDidMount(){
    if(process.env.REACT_APP_URL) console.log('testing', process.env.REACT_APP_URL);
    this.getData()
  }

  render() {
      if(this.state.post_data.post_detail){
        let title = this.state.post_data.post_detail.title;
        let author = this.state.post_data.post_detail.author;
        let publishDate = this.state.post_data.post_detail.publishDate;
        let timeStamp = this.state.post_data.post_detail.timeStamp;
        let content = this.state.post_data.post_detail.content;

        return (
          <div className="post">
            <PostHeader />
              <div class="row">
                <div class="col-md-4"></div>

                <div class="col-md-8">
                  <div class="user_profile">{author}</div>
                  <h1 class="post_title">{title}</h1>
                  <div class="content">{content}</div>
                </div>
              </div>
          </div>
        );
      }else{
        return null;
      }
    }
  }

export default Post;
