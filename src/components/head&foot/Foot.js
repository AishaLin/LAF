import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

const FootContent = styled.div`
  background-color: #1F1F1F;
  height: fit-content;
  margin-top: 60px;
  text-align: center;
  small {
      color: #fff;
      display: flex;
      width: fit-content;
      margin: 0 auto 10px auto;
      font-size: 16px;
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
  a{
    color: #fff;
  }
`;

const Foot = () => {
    return (
        <FootContent>
            <Logo><Link to='/'>Laf</Link></Logo>
            <small>Copyright © 2019-2099<Link to='/' style={{ color: '#c74b16', fontWeight: 'bold' }}>&nbsp;LAF&nbsp;</Link>All rights reserved.</small>
            <small>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></small>
        </FootContent>
    )
}

export default Foot;