import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { device } from '../../media queries/deviceName';

const FootContent = styled.div`
  background-color: #1F1F1F;
  height: fit-content;
  margin-top: 60px;
  text-align: center;
  @media ${device.tablet} {
    padding-bottom: 50px; 
  }
  small {
      color: rgb(203, 203, 203);
      display: flex;
      width: fit-content;
      margin: 0 auto 10px auto;
      font-size: 12px;
  }
`;
const Logo = styled.div`
  background-color: #1F1F1F;
  font-family: 'Permanent Marker', cursive;
  font-size: 24px;
  letter-spacing: 5px;
  text-align: center;
  line-height: 50px;
  height: 50px;
  width: 50px;
  z-index: 5000;
  margin: 0 auto;
  @media ${device.tablet} {
    font-size: 20px; 
    height: 40px;
  }
  a{
    color: rgb(203, 203, 203);
  }
`;

const Foot = () => {
    return (
        <FootContent>
            <Logo><Link to='/'>Laf</Link></Logo>
            <small>Copyright © 2019-2099<Link to='/' style={{ color: '#c74b16', fontWeight: 'bold' }}>&nbsp;LAF&nbsp;</Link>All rights reserved.</small>
        </FootContent>
    )
}

export default Foot;