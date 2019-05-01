import React, { Component } from "react";
import { cancelPreAdopter } from "../../../actions/adoptionAction";
import firebase from "../../../config/fbConfig"
import styled from "styled-components";

const MessageContainer = styled.div`
    width: 100%;

    .eachRequester {
        display: flex;
        align-items: center;
        padding: 5px;
        width: 100%;
        margin: 2px 0;
        .selected {
            border: 3px solid black;
        }
        :hover {
            background-color: #E8E7E2;
        }
        .messageInformation {
            display: flex;
            flex-wrap: wrap;
            flex-grow: 1;
            p {
                margin-right: 20px;
            }
            .requestTime {
            }
        }
        .button {
            min-width: 50px;
        }
    }
`;

class Message extends Component {
    state = {
        selected: false,
        preAdopter: '',
        project: this.props.message.item.project,
        preAdopterName: this.props.message.item.requesterLastName + this.props.message.item.requesterFirstName
    }
    clickHandeler = (e) => {
        this.setState({
            preAdopter: this.props.message.item.requester
        }, () => this.selectPreAdopter());
        // let allRequester = document.querySelectorAll('.eachRequester');
        // allRequester.forEach(requester => requester.classList.remove('selected'))
        // console.log("e.currentTarget", e.currentTarget.getAttribute("className"))
        // let selectedRequester = e.currentTarget.getAttribute(".eachRequester");
        // selectedRequester.classList.add('.selected')
    }
    selectPreAdopter = () => {
        this.props.sendPreAdopter(this.state);
    }
    render() {
        const { requester, requesterLastName, requesterFirstName, phoneNumber, email, lineID, facebook, content, createdAt } = this.props.message.item
        const { adoptionStage, preAdopterStage3 } = this.props.project.item;
        //時間
        const detailtime = createdAt.toDate().toString().split(" ")
        let time = "";
        for (let i = 0; i < 5; i++) {
            time = time + detailtime[i] + " "
        }
        return (
            <MessageContainer >
                <div className='eachRequester' data-selected='adopter'>
                    <div className="messageInformation">
                        <p className="requesterName">欲領養人：{requesterLastName}{requesterFirstName}</p>
                        {phoneNumber !== "" && <p >電話：{phoneNumber}</p>}
                        {email !== "" && <p>信箱：{email}</p>}
                        {lineID !== "" && <p>Line ID：{lineID}</p>}
                        {facebook !== "" && <p>Facebook：{facebook}</p>}
                        {/* {content !== "" && <p>留言：{content}</p>} */}
                        <p className="requestTime">{time}</p>
                    </div>
                    <div className='button'>
                        {adoptionStage === 1 &&
                            <button onClick={(e)=>this.clickHandeler(e)} >選取</button>
                        }
                        {adoptionStage === 2 &&
                            <button onClick={() => this.props.clickcancel()}>取消重選</button>
                        }
                        {adoptionStage === 3 && preAdopterStage3 === requester &&
                            <button onClick={() => this.props.clickcancel()}>取消</button>
                        }
                    </div>
                </div>
            </MessageContainer>
        )
    }
}


export default Message;

