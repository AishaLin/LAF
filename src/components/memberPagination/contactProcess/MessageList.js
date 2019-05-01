import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import 'firebase/auth';
import { asyncGetProjectAll } from '../../../actions/getData/asyncGetProjectAll';
import Message from './Message';
import { requestAffidavit } from "../../../actions/adoptionAction";
import { Link } from "react-router-dom";

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
        preAdopterName: ''
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
    closingCase = () => {

    }
    render() {
        const { fostermessage, project } = this.props;
        const { item } = project;
        if (fostermessage) {
            return (
                <MessageListContent>
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
                                />
                            )
                        }

                    })}
                    <hr/>
                    {item.adoptionStage === 0 &&
                        <div className='adoptionStatus'>
                            <p>目前沒有收到領養通知</p>
                        </div>
                    }
                    {item.adoptionStage === 1 &&
                        <div className='adoptionStatus'>
                            <p>確認領養人後，請由上方列表選取該領養人資訊，並點擊下方按鈕，通知領養人填寫切結書</p>
                            <button onClick={this.requestAffidavit}>送出通知</button>
                        </div>
                    }
                    {item.adoptionStage === 2 &&
                        <div className='adoptionStatus'>
                            <button>待{item.preAdopterName}回傳切結書</button>
                        </div>
                    }
                    {item.adoptionStage === 3 &&
                        <div className='adoptionStatus'>
                            <p>{item.preAdopterName}已回傳切結書</p>
                            <Link to={'/approve_affidavit' + `?project=${project.id}&foster=${this.props.auth.uid}&adopter=${project.preAdopter}`}>
                                <button>查閱內容</button>
                            </Link>
                        </div>
                    }
                </MessageListContent>
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

