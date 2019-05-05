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
            background-color: rgb(232, 231, 226, 0.4);
        }
        :active {
            background-color: rgb(232, 231, 226);
        }
        .messageInformation {
            display: flex;
            flex-wrap: wrap;
            flex-grow: 1;
            .contactMethods {
                display: flex;
                flex-wrap: wrap;
                width: calc(100% - 340px);
            }
            p {
                width: 200px;
                padding-right: 10px;
                text-align: left;
                line-height: 1.7;
            }
            .requestTime {
                text-align: right;
                width: 300px;
                color: #fff;
            }
        }
        .button {
            min-width: 50px;
        }
    }
    .nonSelected {
        color: lightgrey;
    }
    .selectedColor {
        background-color: rgb(232, 231, 226);
        border-radius: 3px;
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
        document.querySelectorAll('.eachRequester').forEach(el => {
            el.classList.remove('selectedColor')
        })
        if (this.props.project.item.adoptionStage === 1) {
            this.setState({
                preAdopter: this.props.message.item.requester
            }, () => this.selectPreAdopter());
            console.log("this.state", this.state)
        } else {
            return
        }
    }
    selectPreAdopter = () => {
        this.props.sendPreAdopter(this.state);
    }
    render() {
        const { requester, requesterLastName, requesterFirstName, phoneNumber, email, lineID, facebook, content, createdAt } = this.props.message.item
        const { adoptionStage, preAdopter, preAdopterStage3 } = this.props.project.item;
        //時間
        const detailtime = createdAt.toDate().toString().split(" ")
        let time = "";
        for (let i = 0; i < 5; i++) {
            time = time + detailtime[i] + " "
        }
        console.log('this.props.preAdopter', this.props.preAdopter)
        return (
            <MessageContainer >
                <div className={`eachRequester ${requester === this.props.preAdopter ? 'selectedColor' : null}`} data-selected='adopter' onClick={(e) => this.clickHandeler(e)} >
                    <div className={`messageInformation ${adoptionStage !== 1 && preAdopter !== '' && preAdopter !== requester ? 'nonSelected' : null}`}>
                        <div className='contactMethods'>
                            <p className="requesterName">欲領養人：{requesterLastName}{requesterFirstName}</p>
                            {phoneNumber !== "" && <p >電話：{phoneNumber}</p>}
                            {email !== "" && <p>信箱：{email}</p>}
                            {lineID !== "" && <p>Line ID：{lineID}</p>}
                            {facebook !== "" && <p>Facebook：{facebook}</p>}
                        </div>
                        <p className="requestTime">{createdAt.toDate().toLocaleString()}</p>
                    </div>
                    <div className='button'>
                        {adoptionStage === 2 && preAdopter === requester &&
                            <button onClick={() => this.props.clickcancel()}>取消</button>
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

