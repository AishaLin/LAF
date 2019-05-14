import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SignedInLinks_web from './SignedInLinks';
import SignedOutLinks_web from './SignedOutLinks';
import SignedInLinks_mobile from './SignedInLinks_Mobile';
import SignedOutLinks_mobile from './SignedOutLinks.Mobile';
import { connect } from "react-redux";
import { device } from '../../media queries/deviceName';
let menu = require('../../../src/public/menu.png');

const HeadContent = styled.div`
  display: flex;
  position: relative;
  font-weight: 500;
  font-size: 18px;
  justify-content: space-between;
  height: 125px;
  align-items: center;
  @media ${device.laptop} {
    height: 95px;
    font-size: 16px;
  }
  @media ${device.tablet} {
    height: 75px;
    font-size: 16px;
  }
  @media ${device.mobileL} {
    justify-content: center;
    height: 50px;
    z-index: 5500;
    position: fixed;
  }
  :before {
    content : "";
    position: absolute;
    left    : 0;
    bottom  : 0;
    height  : 2px;
    width   : 42vw;
    border-bottom: 2px solid lightgrey;
    @media ${device.mobileL} {
      display: none;
    }
  }
  :after {
    content : "";
    position: absolute;
    left    : 0;
    bottom  : 0;
    height  : 1px;
    width   : 100vw;
    border-bottom: 1px solid lightgrey;
    @media ${device.mobileL} {
      display: none;
    }
  }
  .scrollToTop {
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
  .menuIcon_mobile {
    position: fixed;
    right: 10px;
    width: 40px;
    top: 5px;
    z-index: 5500;
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
    @media ${device.laptop} {
      line-height: 95px;
    }
    @media ${device.tablet} {
      line-height: 75px;
    }
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
  @media ${device.laptopL} {
    position: inherit;
  }
  @media ${device.laptop} {
    width: 100px;
    height: 100%;
    line-height: 95px;
  }
  @media ${device.tablet} {
    width: 80px;
    font-size: 28px;
    line-height: 75px;
  }
  @media ${device.mobileL} {
    justify-content: center;
    width: 100vw;
    height: 50px;
    line-height: 50px;
    z-index: 5500;
  }
`;

class Head extends Component {
  state = {
    windowWidth: ''
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    this.setState({ windowWidth: window.innerWidth });
  }
  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  render() {
    const { auth, profile } = this.props;
    const Authlinks_web = auth.uid ? <SignedInLinks_web profile={profile} clickMemberIcon={() => this.props.clickMemberIcon()} /> : <SignedOutLinks_web />
    const Authlinks_mobile = auth.uid ? <SignedInLinks_mobile profile={profile} initialNav={() => this.props.initialNav_mobile()}/> : <SignedOutLinks_mobile initialNav={() => this.props.initialNav_mobile()}/>
    return (
      <HeadContent>
        <Logo><Link to='/'>Laf</Link></Logo>
        {this.state.windowWidth > 1024 && <div className="scrollToTop" onClick={this.scrollToTop}>back to top.</div>}
        {this.state.windowWidth > 768 && Authlinks_web}
        {this.state.windowWidth > 425 && this.state.windowWidth <= 768 && <SignedInLinks_web/>}
        {this.state.windowWidth > 425 &&
          <ul className="mainNav">
            <li><Link to='/adoptionBoard'>認領養媒合</Link></li>
            <li><Link to='/' className='comingSoon'>公立收容所</Link></li>
            <li><Link to='/' className='comingSoon'>走失協尋</Link></li>
          </ul>
        }
        {this.state.windowWidth <=425 && <img src={menu} className='menuIcon_mobile' onClick={()=> this.props.clickMemberIcon_mobile()}/>}
        {this.state.windowWidth <= 768 && Authlinks_mobile}
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