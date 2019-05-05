import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import 'firebase/auth';
import { asyncGetProjectAll } from '../../../actions/getData/asyncGetProjectAll';
import Message from './Message';
import { requestAffidavit } from "../../../actions/adoptionAction";
import { Link } from "react-router-dom";

const ClickForMoreBtn = styled.div` 
    .pullOpen {
        position: relative;
        height: 30px; 
        img {
            position: absolute;
            right: 0;
            width: 28px;
            cursor: pointer;
            -webkit-transition: -webkit-transform .4s ease-in-out;
            -ms-transition: -ms-transform .4s ease-in-out;
            transition: transform .4s ease-in-out;  
            :hover {
                transform:rotate(90deg);
                -ms-transform:rotate(90deg);
                -webkit-transform:rotate(90deg);
            }
        }
    }
`;

const MessageListContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    .adoptionStatus {
        display: flex;
        width: 100%;
        padding: 5px;
        p {
            flex-grow: 1;
            text-align: left;
        }
        button {
            min-width: 100px;
        }
    }
`;

const BouncingLoader = styled.div`
    display: flex;
    justify-content: center;
    @keyframes bouncing-loader {
        to {
            opacity: 0.1;
            transform: translate3d(0, -1rem, 0);
        }
    }
    div {
        width: 1rem;
        height: 1rem;
        margin: 3rem 0.2rem;
        background: #8385aa;
        border-radius: 50%;
        animation: bouncing-loader 0.6s infinite alternate;
    }
    div:nth-child(2) {
        animation-delay: 0.2s;
    }
    div:nth-child(3) {
        animation-delay: 0.4s;
    }
`;

class MessageList extends Component {
    state = {
        preAdopter: '',
        project: '',
        preAdopterName: '',
        messageListOpen: false
    }
    componentDidMount() {
        this.props.dispatch(asyncGetProjectAll(this.props.auth.uid));
    }
    sendPreAdopter = (selected) => {
        this.setState({
            preAdopter: selected.preAdopter,
            project: selected.project,
            preAdopterName: selected.preAdopterName
        })
    }
    requestAffidavit = () => {
        if (this.state.preAdopter === '') {
            return alert("請選取一位領養者！")
        } else {
            this.props.dispatch(requestAffidavit(this.state));
        }
    }
    cancel = () => {
        this.props.cancelDeal(this.props.project)
    }
    toggleMessageList = () => {
        let menuState = !this.state.messageListOpen;
        this.setState({
            messageListOpen: menuState
        });
    }
    closingCase = () => {

    }
    render() {
        const { fostermessage, project } = this.props;
        const { item } = project;
        let messageList;
        if (this.state.messageListOpen) {
            messageList = <MessageListContent>
                {fostermessage && fostermessage.map((message, index) => {
                    const { item } = message;
                    if (item.project === project.id) {
                        return (
                            <Message className="ddd"
                                sendPreAdopter={this.sendPreAdopter}
                                message={message}
                                project={project}
                                index={message.id}
                                key={message.id}
                                clickcancel={this.cancel}
                                preAdopter={this.state.preAdopter}
                            />
                        )
                    }

                })}
                <hr />
                {item.adoptionStage === 0 &&
                    <div className='adoptionStatus'>
                        <p>目前沒有收到領養通知</p>
                    </div>
                }
                {item.adoptionStage === 1 &&
                    <div className='adoptionStatus'>
                        <button onClick={this.requestAffidavit}>送出通知</button>
                    </div>
                }
            </MessageListContent>
        } else {
            messageList = "";
        }
        if (fostermessage) {
            return (
                <ClickForMoreBtn>
                    <div className='pullOpen'>
                        {item.adoptionStage === 0 &&
                            <img src='../../src/public/more_non.png' onClick={this.toggleMessageList} />
                        }
                        {item.adoptionStage !== 0 &&
                            <img src='../../src/public/more.png' onClick={this.toggleMessageList} />
                        }
                    </div>
                    {messageList}
                </ClickForMoreBtn>

            )
        } else {
            return (
                <BouncingLoader>
                    <div></div>
                    <div></div>
                    <div></div>
                </BouncingLoader>
            )
        }
    }
}

const mapStateToProps = (state) => {
    let fostermessage = state.GetProjectStage.fostermessage
    fostermessage = JSON.stringify(fostermessage) !== "{}" ? fostermessage : null
    return {
        fostermessage: state.GetProjectStage.fostermessage,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(MessageList);

