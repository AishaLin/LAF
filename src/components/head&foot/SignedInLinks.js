import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import firebase from "../../config/fbConfig"
import { device } from '../../media queries/deviceName';
let contract = require('../../public/contract.png');
let user = require('../../public/user.png');

const SignedInLinksContent = styled.div`
  .web {
    margin-left: 180px;
    display: flex;
    text-align: center;
    align-items: center;
    @media ${device.laptopL} {
      flex-grow: 1;
      margin-left: 45px;
    }
    @media ${device.laptop} {
      margin-left: 25px;
    }
    .text ::before {
      content: '';
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    div {
      margin-right: 65px;
      color: #2f3022;
      cursor: pointer;
      img {
        width: 30px;
        margin-right: 10px;
        @media ${device.laptop} {
          width: 25px;
        }
      }
      @media ${device.laptopL} {
        margin: 0 40px 0 0;
        justify-content: center;
      }
      @media ${device.laptop} {
        margin: 0 25px 0 0;
        justify-content: center;
      }
    }
  }
  .logout {
    cursor: pointer;
  }
`;

class SignedInLinks_web extends Component {
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
  signOut = () => {
    firebase.auth().signOut()
      .then(() => {
        console.log("User sign out!");
      }).then(() => {
        window.location.hash = '/';
      })
      .catch((err => console.log('error message', err)))
  }
  render() {
    return (
      <SignedInLinksContent>
        {this.state.windowWidth > 768 &&
          <div className='web'>
            <div
              onClick={() => this.props.clickMemberIcon()}>
              <img
                src={user}
                className='memberIcon' />會員
            </div>
            <div>
              <Link to='/post'>
                <img src={contract} />刊登
              </Link>
            </div>
          </div>
        }
        {this.props.auth.uid && this.state.windowWidth > 425 && this.state.windowWidth <= 768 &&
          <div onClick={this.signOut} className='logout'>登出</div>
        }
      </SignedInLinksContent>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}
export default connect(mapStateToProps)(SignedInLinks_web);

