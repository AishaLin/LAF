import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";

const SignedInLinksContent = styled.div`
  margin-left: 270px;
  display: flex;
  text-align: center;
  align-items: center;
  .text ::before {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
`;

class SignedInLinks extends Component {
  
  render() {
    return (
      <SignedInLinksContent>
        <div className="btn btn-floating pink lighten-1" onClick={()=> this.props.clickMemberName()}>Hi！{this.props.profile.firstName}</div>
        <div><Link to='/post'>我要刊登發文</Link></div>
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

