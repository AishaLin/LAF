import axios from 'axios';
import React, { Component } from 'react';
import {
    BrowserRouter,
    HashRouter,
    Switch,
    Route
} from 'react-router-dom';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import Affidavit_edit from '../components/adoption/Affidavit_edit';
import Affidavit_approve from '../components/adoption/Affidavit_approve'
import HomePage from './HomePage';
import Dashboard from '../components/dashboard/Dashboard';
import ProjectDetails from '../components/projects/ProjectDetails';
import CreateProject from "../components/projects/CreateProject";
import '../style.css';
import Authentication from "../components/auth/Authentication";
import AdoptionMessage from "../components/adoption/AdoptionMessage";
import MemberProfile from "../components/dashboard/MemberProfile";
import Head from "../components/head&foot/Head";
import Foot from "../components/head&foot/Foot";

const SideNavForMember = styled.div`
    position: fixed;
    z-index: 5000;
    top: 0;
    left: 0;
    transition: 0.5s;
    display: flex;
    @media screen and (max-height: 450px) {
      padding-top: 15px;
    }   
    a {
      padding: 8px 8px 8px 20px;
      text-decoration: none;
      font-size: 25px;
      color: #818181;
      display: block;
      transition: 0.3s;
      :hover {
        color: #f1f1f1;
      }
      @media screen and (max-height: 450px) {
        font-size: 18px;
      }
    }
    .sideNav{
        background-color: #2f3022;
    overflow-x: hidden;
    padding-top: 60px;
    width: 50%;
    height: 100vh;

    }
    .closebtn {
      top: 0;
      right: 25px;
      font-size: 36px;
      margin-left: 50px;

  }
  .text ::before {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
`;
const ContainerWithoutNav = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    transition: margin-left .5s;
    .mainContent {
        flex-grow: 1;
    }
`;

class App extends React.Component {
    state = {
        openMenu: false
    }
    openNav = () => {
        this.setState((prevState) => ({
            openMenu: !prevState['openMenu']
        }))
    }
    render() {
        const navStyle = {
            width: '0px'
        };
        if (this.state.openMenu === true) {
            navStyle.width = '100vw'
        }
        return (
            <HashRouter >
                <SideNavForMember style={navStyle}>
                    <div className="sideNav">
                        <a href="javascript:void(0)" className="closebtn" onClick={this.openNav} >&times;</a>
                        <Link to="/memberprofile/mypetslist" className="text" onClick={this.openNav} >我領養的毛孩</Link>
                        <Link to="/memberprofile/fosterlist" className="text" onClick={this.openNav} >我送養中的毛孩</Link>
                        <Link to="/memberprofile/closingcaselist" className="text" onClick={this.openNav} >找到家的毛孩們</Link>
                        <Link to='/' className="text" onClick={this.props.signOut} onClick={this.openNav} >登出</Link>
                    </div>
                    <div onClick={this.openNav} style={{flexGrow: '1'}}></div>
                </SideNavForMember>
                <ContainerWithoutNav>
                    <div className="mainContent">
                        <Head clickMemberName={this.openNav} />
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/adoptionBoard" component={Dashboard} />
                            <Route path="/project/:id" component={ProjectDetails} />
                            <Route path="/authentication/signin" component={Authentication} />
                            <Route path="/authentication/signup" component={Authentication} />
                            <Route path="/post" component={CreateProject} />
                            <Route path="/adoptionMessage" component={AdoptionMessage} />
                            <Route path="/memberprofile/mypetslist" component={MemberProfile} />
                            <Route path="/memberprofile/fosterlist" component={MemberProfile} />
                            <Route path="/memberprofile/closingcaselist" component={MemberProfile} />
                            <Route path="/edit_affidavit" render={() => <Affidavit_edit />} />
                            <Route path="/approve_affidavit" render={() => <Affidavit_approve />} />
                        </Switch>
                    </div>
                    <Foot />
                </ContainerWithoutNav>
            </HashRouter>
        )
    }
}

export default App;