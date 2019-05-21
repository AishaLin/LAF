import React, { Component } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { signIn } from "../../actions/authActions";
import { Redirect } from "react-router-dom";
import { device } from "../../media queries/deviceName";
import '../../style.css'

const InputArea = styled.div`
    width: 80%;
    height: fit-content;
    margin: auto;
    form {
        margin: 0;
        @media ${device.mobileL} {
            padding: 0;
        }
    }
    .inputField {
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        label {
        color: #9e9e9e;
        font-size: 1rem;
        }
        input {
            outline: none;
            border: none;
            border-bottom: 1px solid lightgrey;
            height: 40px;
            font-size: 16px;
        }
        .confirmBtn {
            color: rgb(255, 255, 255);
            width: 100%;
            height: 40px;
            border-radius: 5px;
            background-color: rgb(156, 150, 114);
            margin-top: 40px;
            font-size: 18px;
            letter-spacing: 3px;
            -webkit-box-shadow: 6px 11px 10px -4px rgba(102,100,102,0.2);
            -moz-box-shadow: 6px 11px 10px -4px rgba(102,100,102,0.2);
            box-shadow: 6px 11px 10px -4px rgba(102,100,102,0.2);
            cursor: pointer;
            :hover {
                background-color: rgb(156, 150, 114, 0.8);
            }
            :active {
                width: 98%;
                height: 38px;
            }
        }
        .errorHint {
            color: red;
        }
    }
`;

class SignIn extends Component {
    state = {
        email: 'demo@gmail.com',
        password: '123456'
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(signIn(this.state))
    }
    render() {
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to='/' />
        return (
            <InputArea>
                <form onSubmit={this.handleSubmit}>
                    <div className="inputField">
                        <label htmlFor="email">電子信箱</label>
                        <input type="email" id="email" onChange={this.handleChange} value={this.state.email}/>
                    </div>
                    <div className="inputField">
                        <label htmlFor="password">密碼</label>
                        <input type="password" id="password" onChange={this.handleChange}  value={this.state.password}/>
                    </div>
                    <div className="inputField">
                        <button className="confirmBtn">確認</button>
                        <div className="errorHint">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form>
            </InputArea>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(SignIn)



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