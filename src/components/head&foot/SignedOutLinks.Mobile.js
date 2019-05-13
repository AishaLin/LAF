import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignedOutLinksContent = styled.ul`
  z-index: 5000;
  background-color: #fff;
  position: fixed;
  bottom: 0;
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
  li {
    color: #2f3022;
    flex-grow: 1;
    cursor: pointer;
    list-style: none;
  }
`;

class SignedOutLinks_mobile extends React.Component {

  render() {
    return (
      <SignedOutLinksContent>
        <li><Link to='/authentication/signup'>註冊</Link></li>
        <li><Link to='/authentication/signin'>登入</Link></li>
      </SignedOutLinksContent>
    )
  }
}
export default SignedOutLinks_mobile;