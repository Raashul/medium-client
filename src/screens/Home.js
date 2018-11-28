import React, { Component } from 'react';
import {Bootstrap} from 'react-bootstrap';
import Header from '../components/header';
import Jumbotron from '../components/jumbotron';
import Nav from '../components/Navigation';
import request from 'request';
class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      homePageData: {}
    }
    this.getData = this.getData.bind(this);
  }

    componentDidMount(){
    if(process.env.REACT_APP_URL) console.log('testing', process.env.REACT_APP_URL);
    this.getData();
  }

  getData = () =>{
    var that = this;
    request("http://localhost:3000/homePageData.json",function(err, request, body){
      if(!err && request.statusCode === 200){
      var result = JSON.parse(body);
      that.setState({homePageData: result});
      }
    });
  }

  createMidFeaturedPost = ()=>{
    let div = [];
    var image = {
      height: '100px',
      width: '100px'
    }
    for(let i=0;i<3;i++){
      div.push(
        <div className="row" className="middlePost">
        <div className="middleImage">
          <img src={this.state.homePageData.featuredPosts.image} style={{height:image.height,width:image.width}}/>
          </div>
          <div className="midleText">
        <span className="featuredTitle">  <b>{this.state.homePageData.featuredPosts.title}</b></span> <br /><br/>
          <span className="featuredAuthor"> {this.state.homePageData.featuredPosts.author}</span><br />
          {this.state.homePageData.featuredPosts.publishDate} . {this.state.homePageData.featuredPosts.timeStamp} min read <span className="glyphicon glyphicon-star-empty"></span>
          </div>
        </div>
      );
    }
    return div;
  }

  createBottomFeaturedPostsLeftTopics = ()=>{
    let div = [];
    for(let i=0;i<5;i++){
      div.push(
        <div className='col_right'>
          <div className="col-bottom-featured-right">
          <br/><br/>
            <b><span style={{color:'black', fontSize:'16px' , float:'left'}} key={i}>{this.state.homePageData.featuredPosts.topics[i]}</span></b>
            <span style={{float:'right'}}>More</span><br/>
            <hr />
          </div>
          {this.createBottomFeaturedPosts()};
        </div>
      );
    }
    console.log(div);
    return div;
  }

  createBottomFeaturedPosts = ()=>{
    let div = [];
    var image = {
      height: '100px',
      width: '100px'
    }
    for(let i=0;i<4;i++){
      div.push(
        <div className="col-bottom-featured-right-content" className="lowerPost">
        <div className="lowertext">
          <b>< span className="featuredTitle" style={{fontSize:"20px"}}>{this.state.homePageData.featuredPosts.title}</span></b> <br />
          {this.state.homePageData.featuredPosts.subTag}<br/><br/>
          <span className="featuredAuthor"> {this.state.homePageData.featuredPosts.author}</span><br />
          {this.state.homePageData.featuredPosts.publishDate} . {this.state.homePageData.featuredPosts.timeStamp} min read <span className="glyphicon glyphicon-star-empty"></span>
          </div>
          <div className="lowerimage">
        <img src={this.state.homePageData.featuredPosts.image} style={{height:'120px',width:'150px'}}/>
        </div>
        </div>
      );
    }
    console.log(div);
    return div;
  }

  createBottomFeaturedPostsRight = ()=>{
    let div = [];
    var image = {
      height: '100px',
      width: '100px'
    }
    for(let i=0;i<3;i++){
      div.push(
          <div className="leftSideBottom">
            <span className="featuredTitle"><b>{this.state.homePageData.featuredPosts.title}</b></span> <br />
          <br/>
            <span className="featuredAuthor">{this.state.homePageData.featuredPosts.author}</span><br />
            {this.state.homePageData.featuredPosts.publishDate} . {this.state.homePageData.featuredPosts.timeStamp} min read <span className="glyphicon glyphicon-star-empty"></span><br/><br/>
        </div>
      );
    }
    return div;
  }

  render() {
    if(this.state.homePageData.featuredPosts){
      let image = this.state.homePageData.featuredPosts.image;
      let title = this.state.homePageData.featuredPosts.title;
      let subTitle = this.state.homePageData.featuredPosts.subTag;
      let date = this.state.homePageData.featuredPosts.publishDate;
      let timeTag = this.state.homePageData.featuredPosts.timeStamp;
      let author = this.state.homePageData.featuredPosts.author;
      const imageSize = {
        height: '160px',
        width: '95%'
      }
      return (
        <div className="App">
          <div className="container">
            <Header />
            <Nav />
            <div className="row">
              <div className="col-xs-6 col-sm-4">
                <div className="featuredPost_image" >
                  <img src={image} style={{height:imageSize.height, width: imageSize.width}}/>
                </div> <br />
                <div className="featuredPostsRight_Titles" className="featuredTitle" style={{fontSize:"20px"}}>
                  <b><span>{title}</span></b> <br />

                </div>
                <span>{subTitle}</span> <br /><br />
                <div className="featuredPosts_author" className="featuredAuthor">
                  {author}
                </div>
                <div className="featuredPostsDate">
                  <b><span>{date} . {timeTag} min read <span className="glyphicon glyphicon-star-empty"></span></span></b>
                </div>
              </div>
              <div className="col-xs-6 col-sm-4">
                {this.createMidFeaturedPost()}
              </div>
              <div className="col-xs-6 col-sm-4">
                <div className="featuredPost_image">
                  <img src={image} style={{height:imageSize.height, width: imageSize.width}}/>
                </div> <br />
                <div className="featuredPostsRight_Titles" className="featuredTitle" style={{fontSize:"20px"}}>
                  <b><span>{title}</span></b> <br />
                </div>
                <span>{subTitle}</span> <br /><br />
                <div className="featuredPosts_author" className="featuredAuthor">
                  {author}
                </div>
                <div className="featuredPostsDate">
                  <b><span>{date} . {timeTag} min read <span className="glyphicon glyphicon-star-empty"></span></span></b>
                </div>
              </div>
            </div>
            <hr />
            <br />

            <Jumbotron />
            <br/>
            <div className="row" classNme="bottom">
              <div className="col-sm-9" className="bottomLeft">
                {this.createBottomFeaturedPostsLeftTopics()}
              </div>
              <br/><br/>
              <div className="col-sm-3" className="bottomRight">
                <b><span style={{color:'black', fontSize:'16px'}}>Popular On Medium</span></b><hr />
                {this.createBottomFeaturedPostsRight()}
              </div>
              </div>
          </div>
        </div>
      );
    }
    else{
      return null;
    }
  }
}

export default Home;
