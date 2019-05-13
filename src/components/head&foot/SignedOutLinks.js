import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { device } from '../../media queries/deviceName';

const SignedOutLinksContent = styled.ul`
  margin-left: 200px;
  display: flex;
  text-align: center;
  @media ${device.laptop} {
    flex-grow: 1;
    margin-left: 0;
  }
  li {
    flex-grow: 1;
    margin: 0 3vw;
    list-style: none;
  }
`;

class SignedOutLinks_web extends React.Component {

  render() {
    return (
      <SignedOutLinksContent>
        <li><NavLink to='/authentication/signup'>註冊</NavLink></li>
        <li><NavLink to='/authentication/signin'>登入</NavLink></li>
      </SignedOutLinksContent>
    )
  }
}
export default SignedOutLinks_web;