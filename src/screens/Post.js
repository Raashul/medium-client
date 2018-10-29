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
        let author_image = this.state.post_data.post_detail.author_image;
        let author_subTitle = this.state.post_data.post_detail.author_subTitle;
        let publishDate = this.state.post_data.post_detail.publishDate;
        let timeStamp = this.state.post_data.post_detail.timeStamp;
        let content = this.state.post_data.post_detail.content;

        return (
          <div className="post">
            <PostHeader />

              <div class="row">
                <div class="col-md-2"></div>

                <div class="col-md-10">

                  <div class="row">
                    <div class="col-md-2">
                      <div class="author_image">{author_image}</div>
                    </div>

                    <div class="col-md-10">
                      <p class="post_author">{author}</p>
                      <p class="author_subTitle">{author_subTitle}</p>
                    </div>
                  </div>

                    <div class="row">
                      <h1 class="post_content">{content}</h1>
                    </div>

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
