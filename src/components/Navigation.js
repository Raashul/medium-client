import React, { Component } from 'react';
class Nav extends Component {
  componentDidMount(){
    if(process.env.REACT_APP_URL) console.log('testing', process.env.REACT_APP_URL);
  }
  render() {
    return (
      <div className="menu">

                <ul>
                    <li><a href="#" className="active">HOME</a></li>
                    <li><a href="#">POWERTRIP</a></li>
                    <li><a href="#">CULTURE</a></li>
                    <li><a href="#">TECH</a></li>
                    <li><a href="#">STARTUPS</a></li>
                    <li><a href="#">SELF</a></li>
                    <li><a href="#">POLITICS</a></li>
                    <li><a href="#">DESIGN</a></li>
                    <li><a href="#">HEALTHS</a></li>
                    <li><a href="#">POPULAR</a></li>
                    <li><a href="#">COLLECTIONS</a></li>
                    <li><a href="#">MORE </a></li>
                  </ul>


</div>

    );
  }
}

export default Nav;
