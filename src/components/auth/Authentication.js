import React, { Component } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import {
    BrowserRouter,
    HashRouter,
    Switch,
    Route
} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import '../../style.css'
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Container = styled.div`
    -webkit-box-shadow: 6px 11px 10px -4px rgba(102,100,102,0.2);
    -moz-box-shadow: 6px 11px 10px -4px rgba(102,100,102,0.2);
    box-shadow: 6px 11px 10px -4px rgba(102,100,102,0.2);
    height: fit-content;
    width: 30vw;
    min-width: 350px;
    margin: 5vh auto 0px auto;
    border-radius: 10px;
    background-color: #fff;
    .title {
        color: gray;
        display: flex;
        font-weight: 500;
        font-size: 22px;
        padding: 30px 20px 45px 20px;
        h5 {
            margin: 0 20px 0 0;
            :hover {
                font-size: 24px;
                margin-right: 14px;
            }
        }
    }
`;

class Authentication extends Component {
    render() {
        const signInStyle = {
            color: "gray"
        }
        const signUpStyle = {
            color: "gray"
        }
        const signInState = location.href.split("/")[location.href.split('/').length - 1]
        if (signInState === "signin") {
            signInStyle.color = 'rgb(156, 150, 114)'
        } else {
            signUpStyle.color = 'rgb(156, 150, 114)'
        }
        const { auth } = this.props;
        if (auth.uid) return <Redirect to='/' />
        return (
            <Container>
                <div className= 'title'>
                    <Link to="signup"><h5 style={signUpStyle}>｜註冊</h5></Link>
                    <Link to="signin"><h5 style={signInStyle}>｜登入</h5></Link>
                </div>
                <HashRouter>
                    <div>
                        <Switch>
                            <Route path="/authentication/signin" component={SignIn} />
                            <Route path="/authentication/signup" component={SignUp} />
                        </Switch>
                    </div>
                </HashRouter>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps, null)(Authentication)