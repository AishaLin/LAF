import axios from 'axios';
import React, { Component } from 'react';
import {
    BrowserRouter,
    HashRouter,
    Switch,
    Route
} from 'react-router-dom';
import styled from 'styled-components';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import firebase from "../config/fbConfig"
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
      padding-top: 15px
    }   
    .sideNav{       
        overflow-x: hidden;
        position: relative;
        a {
            color: #818181;
            text-decoration: none;
            transition: 0.3s;
            width: 100%;
            :hover {
                color: #f1f1f1;
            }
            ::before {
                content: '';
                height: 100%;
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
    .sideNav.web {
        padding-top: 60px;
        width: 30%;
        height: 100vh;
        background-color: #2f3022;
        .logout {
            position: absolute;
            bottom: 5vh;
        }
        a, .memberName {
            padding: 20px 40px;
            font-size: 25px;
            min-width: 250px;
        }
        a:hover {
            background-color: #3f412d;
        }
    }
    .sideNav.mobile {
        width: 100vw;
        height: fit-content;
        background-color: rgb(31, 31, 31);
        margin-top: 50px;
        .logout {
            position: inherit;
        }
        a,.memberName {
            text-align: center;
            padding: 10px 20px;
            font-size: 16px;
        } 
        a:active {
            color: #f1f1f1;
            background-color: rgb(38, 38, 38);
        }
    }
    .memberName {
        color: #cccbcb;
    }
    .closebtn {
      top: 0;
      right: 25px;
      font-size: 36px;
      text-align: right;
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
        windowWidth: '',
        openMenu: false,
        openMenu_mobile: false
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
    openNav = () => {
        this.setState((prevState) => ({
            openMenu: !prevState['openMenu']
        }))
    }
    openNav_mobile = () => {
        this.setState((prevState) => ({
            openMenu_mobile: !prevState['openMenu_mobile']
        }))
    }
    signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log("User sign out!");
            }).then(() => {
                this.setState({
                    openMenu: false,
                    openMenu_mobile: false
                })
            }).then(() => {
                window.location.hash = '/';
            })
            .catch((err => console.log('error message', err)))
    }
    render() {
        const navStyle = {
            width: '0px',
            flexDirection: 'row'
        };
        const navStyle_mobile = {
            height: '0px',
            flexDirection: 'column'
        };
        if (this.state.openMenu === true) {
            navStyle.width = '100vw'
        }
        if (this.state.openMenu_mobile === true) {
            navStyle_mobile.height = '100vh'
        }
        return (
            <HashRouter >
                {this.state.windowWidth > 768 &&
                    <SideNavForMember style={navStyle}>
                        <div className="sideNav web">
                            <a href="javascript:void(0)" className="closebtn" onClick={this.openNav} >&times;</a>
                            <p className="memberName">Hi！{this.props.profile.firstName}</p>
                            <Link to="/memberprofile/mypetslist" onClick={this.openNav} >查看領養清單</Link>
                            <Link to="/memberprofile/fosterlist" onClick={this.openNav} >查看送養清單</Link>
                            <Link to="/memberprofile/closingcaselist" onClick={this.openNav} >媒合成功清單</Link>
                            <a className="logout" onClick={this.signOut} >登出</a>
                        </div>
                        <div onClick={this.openNav} style={{ flexGrow: '1' }}></div>
                    </SideNavForMember>
                }
                {this.state.windowWidth <= 425 &&
                    <SideNavForMember style={navStyle_mobile}>
                        <div className="sideNav mobile">
                            <p className="memberName text">Hi！{this.props.profile.firstName}</p>
                            <Link to='/adoptionBoard'  onClick={this.openNav_mobile} >認領養媒合</Link>
                            <Link to='/'  onClick={this.openNav_mobile} >公立收容所</Link>
                            <Link to='/'  onClick={this.openNav_mobile} >走失協尋</Link>
                            <a className="logout" onClick={this.signOut} >登出</a>
                        </div>
                        <div onClick={this.openNav_mobile} style={{ flexGrow: '1' }}></div>
                    </SideNavForMember>
                }
                <ContainerWithoutNav>
                    <div className="mainContent">
                        <Head clickMemberIcon={this.openNav} clickMemberIcon_mobile={this.openNav_mobile} />
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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(App);