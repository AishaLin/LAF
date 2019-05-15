import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import 'firebase/auth';
import { asyncGetProjectAll } from '../../../actions/getData/asyncGetProjectAll';
import Message from './Message';
import { device } from "../../../media queries/deviceName";
import Loader from '../../head&foot/Loader'
import { requestAffidavit } from "../../../actions/adoptionAction";
let more = require('../../../public/more.png');
let more_non = require('../../../public/more_non.png');


const ClickForMoreBtn = styled.div` 
    .pullOpen {
        display: flex;
        justify-content: flex-end;
        height: 60px; 
        img {
            width: 28px;
            height: 28px;
            margin: auto 0;
            cursor: pointer;
            -webkit-transition: -webkit-transform .3s ease-in-out;
            -ms-transition: -ms-transform .3s ease-in-out;
            transition: transform .3s ease-in-out;  
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
        justify-content: flex-end;
        p {
            text-align: right;
        }
        button {
            padding: 10px 20px;
            min-width: fit-content;
            border-radius: 5px;
            font-size: 16px;
            letter-spacing: 3px;
            background-color: rgb(23, 156, 154);
            border: none;
            color: #FFFFFF;
            @media ${device.tablet} {
                font-size: 14px;
            }
            :hover {
                background-color: rgb(23, 156, 154, 0.85);
            }
            :active {
                transform: translate(2px, 3px);
            }
        }
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
                            <img src={more_non} onClick={this.toggleMessageList} />
                        }
                        {item.adoptionStage !== 0 &&
                            <img src={more} onClick={this.toggleMessageList} />
                        }
                    </div>
                    {messageList}
                </ClickForMoreBtn>

            )
        } else {
            return <Loader />
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

