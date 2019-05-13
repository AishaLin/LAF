import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";
import { device } from '../../media queries/deviceName';

const SignedInLinksContent = styled.div`
  margin-left: 180px;
  display: flex;
  text-align: center;
  align-items: center;
  @media ${device.laptop} {
    flex-grow: 1;
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
      margin: 0 25px 0 0;
      justify-content: center;
    }
  }
`;

class SignedInLinks_web extends Component {

  render() {
    return (
      <SignedInLinksContent>
        <div
          onClick={() => this.props.clickMemberIcon()}>
          <img
            src='../src/public/user.png'
            className='memberIcon' />會員
        </div>
        <div>
          <Link to='/post'>
            <img src='../src/public/contract.png' />刊登
          </Link>
        </div>
      </SignedInLinksContent>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}
export default connect(null, mapDispatchToProps)(SignedInLinks_web);

