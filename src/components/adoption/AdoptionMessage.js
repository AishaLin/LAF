import React from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from 'styled-components';
import { sendAdoptMessage } from "../../actions/adoptionAction";

const MessagePopup = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5500;
    background-color: rgba(76, 76, 76, 0.8) ;
    height: 100vh;
    width: 100vw;
    color: #1e1f21;
    .input-field {
        width: 40vw;
        min-width: 500px;
        height: auto;
        max-height: 90vh;
        background-color: #fff;
        margin: 5vh auto auto auto;
        border-radius: 5px;
        padding: 10px;
        overflow: scroll;
        .closebtn {
            text-align: right;
            margin-right: 10px;
            font-size: 36px;
            color:  rgb(127, 211, 209);
            :hover {
                color: rgb(23, 156, 154);
            }
        }
        .input-hint {
            line-height: 1.5;
            font-size: 18px;
            margin-bottom: 25px;
        }
        .form {
            .eachInputItem {
                margin: 15px 0;
                font-size: 18px;
                label {
                    color: #1e1f21;
                }
                input {
                    outline: none;
                    border-width: 0;
                    background-color: rgba(203, 203, 203, 0.2);
                    padding: 10px 5px;
                    border-radius: 5px;
                    width: 100%;
                    margin: 8px 0 10px 0;
                    font-size: 16px;
                    :focus {
                        top: -10px;
                        background-color: rgb(255, 248, 218);

                    }
                }
            }
            .sendMessage_btn {
                button {
                    width: 100%;
                    height: 40px;
                    border-radius: 20px;
                    font-size: 16px;
                    letter-spacing: 5px;
                    background-color: rgb(23, 156, 154);
                    color: #FFFFFF;
                    :hover {
                        background-color: rgb(23, 156, 154, 0.85);
                    }
                    :active {
                        transform: translate(2px, 3px);
                    }
                }
                .alert {
                    color: red;
                    text-align: center;
                }
            }
        }
    }
`;

class AdoptionMessage extends React.Component {
    state = {
        foster: '',
        requester: '',
        project: '',
        phoneNumber: '',
        email: '',
        lineID: '',
        facebook: '',
        messageIncomplete: false
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            foster: this.props.project.authorID,
            requester: this.props.auth.uid,
            project: location.hash.split("/")[2]
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.phoneNumber === "" && this.state.email === ""
            && this.state.lineID === "" && this.state.facebook === "") {
            this.setState({
                messageIncomplete: true
            })
            return false
        } else {
            this.props.dispatch(sendAdoptMessage(this.state));
            this.props.togglePopup();
        }
    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/authentication/signin' />
        return (
            <MessagePopup>
                <div className='input-field'>
                    <a href="javascript:void(0)" className='closebtn' onClick={this.props.togglePopup}><span className='croseMark'>&times;</span></a>
                    <form className='ui form' onSubmit={this.onFormSubmit}>
                        <div className='input-hint'>
                            <p>請主動與送養人聯繫</p>
                            <p>以下聯絡方式請<span>至少擇一</span>提供，以利送養人回電接洽</p>

                        </div>
                        <div className='eachInputItem'>
                            <label htmlFor="phoneNumber">電話</label>
                            <input id="phoneNumber" onChange={this.handleChange} />
                        </div>
                        <div className='eachInputItem'>
                            <label htmlFor="email">E-mail</label>
                            <input id="email" onChange={this.handleChange} />
                        </div>
                        <div className='eachInputItem'>
                            <label htmlFor="lineID">Line ID</label>
                            <input id="lineID" onChange={this.handleChange} />
                        </div>
                        <div className='eachInputItem'>
                            <label htmlFor="facebook">Facebook</label>
                            <input id="facebook" onChange={this.handleChange} />
                        </div>
                        <div className='sendMessage_btn'>
                            <button onClick={this.handleSubmit} >送出</button>
                            {this.state.messageIncomplete && <p className='alert'>請至少填一項</p>}
                        </div>
                    </form>
                </div>
            </MessagePopup>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(AdoptionMessage);


