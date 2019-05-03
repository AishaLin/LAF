import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";

const SignedInLinksContent = styled.div`
  margin-left: 200px;
  display: flex;
  text-align: center;
  align-items: center;
  .text ::before {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  div {
    margin-right: 5vw;
    color: #2f3022;
    cursor: pointer;
    img {
      width: 30px;
      margin-right: 10px;
    }
  }
`;

class SignedInLinks extends Component {
  
  render() {
    return (
      <SignedInLinksContent>
        <div className="btn btn-floating pink lighten-1" onClick={()=> this.props.clickMemberName()}><img src='../src/public/icon_menu.png'/>會員資訊</div>
        <div><Link to='/post'><img src='../src/public/contract.png'/>刊登發文</Link></div>
      </SignedInLinksContent>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);

