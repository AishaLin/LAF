import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from "react-redux";
import RenderToLayer from 'material-ui/internal/RenderToLayer';

const HeadContent = styled.div`
  display: flex;
  position: relative;
  font-family: 'Neue Helvetica W01', 'AXIS Font Japanese W55', 'Helvetica Neue', sans-serif;
  font-weight: 500;
  font-size: 18px;
  justify-content: space-between;
  height: 125px;
  align-items: center;
  :before {
    content : "";
    position: absolute;
    left    : 0;
    bottom  : 0;
    height  : 2px;
    width   : 42vw;
    border-bottom: 2px solid lightgrey;
  }
  :after {
    content : "";
    position: absolute;
    left    : 0;
    bottom  : 0;
    height  : 1px;
    width   : 100vw;
    border-bottom: 1px solid lightgrey;
  }
  .scrollToTopBtn {
    position: fixed;
    top: 32vh;
    right: -40px;
    width: 120px;
    height: 40px;
    text-align: center;
    line-height: 38px;
    font-size: 18px;
    color: #fff;
    background-color: rgb(199, 75, 22);
    transform: rotate(-90deg);
    z-index: 1000;
    cursor: pointer;
    :hover {
      background-color: rgb(199, 75, 22, 0.9);
    }
  }
  .mainNav {
    display: flex;
    text-align: center;
    margin: auto 0;
    width: 58vw;
    height: calc(100% - 1px);
    margin-top: -0.5px;
    line-height: 125px;
    background-color: #E8E7E2;
    z-index: 1000;
    li {
      flex-grow: 1;
      list-style: none;
      :hover {
        background-color: rgb(209, 207, 196);
      }
      :active {
        background-color: rgb(209, 207, 196, 0.5);
      }
      .comingSoon {
        color: grey;
      }
    }
  }
  a {
    color: #1b1a18;
    :active {
      transform: translate(2px, 3px);
    }
  }
`;
const Logo = styled.div`
  background-color: #1F1F1F;
  position: fixed;
  top: 0;
  left: 0;
  font-family: 'Permanent Marker', cursive;
  font-size: 36px;
  letter-spacing: 5px;
  text-align: center;
  line-height: 125px;
  height: 125px;
  width: 130px;
  z-index: 3000;
  a {
    color: #fff;
  }
`;


//13B5B1
// FCE196
// 90CFC1
// B9C794
// F59367
// C4AF94
// E8E7E2

class Head extends Component {

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <SignedInLinks profile={profile} clickMemberName={()=>this.props.clickMemberName()}/> : <SignedOutLinks className="signedOutLinks" />
    return (
      <HeadContent>
        <Logo><Link to='/'>Laf</Link></Logo>
        <div className="scrollToTopBtn" onClick={this.scrollToTop}>back to top.</div>
        {links}
        <ul className="mainNav">
          <li><Link to='/adoptionBoard'>認領養媒合</Link></li>
          <li><Link to='/' className='comingSoon'>公立收容所</Link></li>
          <li><Link to='/' className='comingSoon'>走失協尋</Link></li>
        </ul>
      </HeadContent>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Head);

