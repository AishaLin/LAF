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

const Body = styled.div`
    width:100vw;
    min-height: 100vh;
    display: flex;
    padding: 30px 30px 70px 30px;
`;

const Combine = styled.div`
    display: flex;
    height: fit-content;
    width:30vw;
    margin: 0 auto;
    min-width: 350px;
    border-radius: 10px;
    position: relative;
`;

const Back = styled.div`
    -webkit-box-shadow: 6px 11px 30px -4px rgba(102,100,102,1);
    -moz-box-shadow: 6px 11px 30px -4px rgba(102,100,102,1);
    box-shadow: 6px 11px 30px -4px rgba(102,100,102,1);
    height: 30px;
    width: 100px;
    margin: auto;
    border-radius: 2px;
    background-color: #ec407a;
    position: absolute;
    top: 38px;
    right: -15px;
    transform: skewX(-15deg);
    :hover {
        right: -25px;
        transition: 0.2s;
    }
    div {
        text-align: center;
        color: rgba(255, 255, 255);
        font-size: 16px;
        margin-top: 6px;
    }
`;

const Container = styled.div`
    -webkit-box-shadow: 6px 11px 30px -4px rgba(102,100,102,1);
    -moz-box-shadow: 6px 11px 30px -4px rgba(102,100,102,1);
    box-shadow: 6px 11px 30px -4px rgba(102,100,102,1);
    height: fit-content;
    width: 100%;
    margin: auto;
    border-radius: 10px;
    background-color: #fff;
`;

const Title = styled.div`
    color: gray;
    display: flex;
    font-family: 'Noto Sans TC', sans-serif;
    font-weight: 500;
    font-size: 26px;
    padding: 30px 20px 45px 20px;
    h5 {
        margin: 0 20px 0 0;
        :hover {
            font-size: 28px;
            margin-right: 14px;
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
            signInStyle.color = 'hsl(211, 94%, 62%)'
        } else {
            signUpStyle.color = 'hsl(211, 94%, 62%)'
        }
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to='/' />
        return (
            <Body>
                <Combine>
                    <Container>
                        <div className="signInArea">
                            <Title>
                                <Link to="signup"><h5 style={signUpStyle}>｜註冊</h5></Link>
                                <Link to="signin"><h5 style={signInStyle}>｜登入</h5></Link>
                            </Title>
                            <HashRouter>
                                <div>
                                    <Switch>
                                        <Route path="/authentication/signin" component={SignIn} />
                                        <Route path="/authentication/signup" component={SignUp} />
                                    </Switch>
                                </div>
                            </HashRouter>
                        </div>
                    </Container>
                    <Back>
                        <Link to="/"><div>回到首頁</div></Link>
                    </Back>
                </Combine>
            </Body>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(Authentication)



// .inputField>label {
//     color: #9e9e9e;
//     position: absolute;
//     top: 0;
//     left: 0;
//     font-size: 1rem;
//     cursor: text;
//     -webkit-transition: color .2s ease-out, -webkit-transform .2s ease-out;
//     transition: color .2s ease-out, -webkit-transform .2s ease-out;
//     transition: transform .2s ease-out, color .2s ease-out;
//     transition: transform .2s ease-out, color .2s ease-out, -webkit-transform .2s ease-out;
//     -webkit-transform-origin: 0% 100%;
//     transform-origin: 0% 100%;
//     text-align: initial;
//     -webkit-transform: translateY(12px);
//     transform: translateY(12px);