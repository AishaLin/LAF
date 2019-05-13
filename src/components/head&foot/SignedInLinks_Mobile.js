import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";

const SignedInLinksContent = styled.div`
  z-index: 5000;
  background-color: #fff;
  position: fixed;
  bottom: -2px;
  left: 0;
  display: flex;
  text-align: center;
  align-items: center;
  width: 100vw;
  height: 50px;
  .text ::before {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  div {
    color: #2f3022;
    flex-grow: 1;
    cursor: pointer;
    img {
      width: 30px;
      margin-right: 10px;
    }
  }
`;

class SignedInLinks_mobile extends Component {

  render() {
    return (
      <SignedInLinksContent>
        <div>
          <Link to='/memberprofile/mypetslist'
            onClick={() => this.props.initialNav()}>
            <img
              src='../src/public/user.png'
              className='memberIcon' />會員
          </Link>
        </div>
        <div>
          <Link to='/post'
            onClick={() => this.props.initialNav()}>
            <img src='../src/public/contract.png' />刊登
          </Link></div>
      </SignedInLinksContent>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}
export default connect(null, mapDispatchToProps)(SignedInLinks_mobile);

