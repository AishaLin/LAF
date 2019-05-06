import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../actions/authActions";
import styled from 'styled-components';

const InputArea = styled.div`
    width: 80%;
    height: fit-content;
    margin: auto;
    form {
        margin: 0;
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
            font-family: 'Neue Helvetica W01', 'AXIS Font Japanese W55', 'Helvetica Neue', sans-serif;
            color: rgb(255, 255, 255);
            width: 100%;
            height: 40px;
            border-radius: 18px;
            background-color: hsl(211, 94%, 62%);
            margin-top: 40px;
            font-size: 18px;
            letter-spacing: 3px;
            cursor: pointer;
            :hover {
                background-color: hsl(211, 93%, 55%);
            }
            :active {
                width: 98%;
                height: 38px;
            }
        }
    }
`;

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }
    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to='/' />
        console.log(authError)
        return (
            <InputArea>
                <form onSubmit={this.handleSubmit} className="white">
                    <div className="inputField">
                        <label htmlFor="email">電子信箱</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="inputField">
                        <label htmlFor="password">密碼</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="inputField">
                        <label htmlFor="lastName">姓氏</label>
                        <input type="text" id="lastName" onChange={this.handleChange} />
                    </div>
                    <div className="inputField">
                        <label htmlFor="firstName">名字</label>
                        <input type="text" id="firstName" onChange={this.handleChange} />
                    </div>
                    <div className="inputField">
                        <button className="confirmBtn">送出</button>
                        <div className="red-text center">
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
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
