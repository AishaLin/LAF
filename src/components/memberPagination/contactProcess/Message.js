import React, { Component } from "react";
import { device } from "../../../media queries/deviceName";
import styled from "styled-components";

const MessageContainer = styled.div`
    width: 100%;
    .eachRequester {
        display: flex;
        align-items: center;
        padding: 5px;
        width: 100%;
        margin: 2px 0;
        background-color: rgb(203, 203, 203, 0.1);
        border-radius: 3px;
        @media ${device.tablet} {
            font-size: 14px;
        }
        .selected {
            border: 3px solid black;
        }
        :hover {
            background-color: rgb(232, 231, 226);
        }
        :active {
            background-color: rgb(232, 231, 226, 0.4);
        }
        .messageInformation {
            display: flex;
            flex-wrap: wrap;
            flex-grow: 1;
            @media ${device.mobileL} {
                flex-direction: column;
            }
            .contactMethods {
                display: flex;
                flex-grow: 1;
                flex-wrap: wrap;
                width: calc(100% - 300px);
                @media ${device.mobileL} {
                    width: 100%;
                }
            }
            p {
                width: 200px;
                padding-right: 10px;
                text-align: left;
                line-height: 1.7;
                @media ${device.mobileL} {
                    width: 100%;
                }
            }
            .requestTime {
                text-align: right;
                width: 150px;
                color: #fff;
                @media ${device.tablet} {
                    width: 130px;
                }
                @media ${device.mobileL} {
                    text-align: left;
                    width: 100%;
                }
            }
        }
        .button {
            min-width: fit-content;
            button {
                cursor: pointer;
                border-width: 0;
                background-color: none;
                color: rgb(194, 193, 189);
                background-color: transparent;
                :hover {
                    color: red;
                }
            }
        }
    }
    .nonSelected {
        color: lightgrey;
    }
    .selectedColor {
        background-color: rgb(232, 231, 226);
    }
`;

class Message extends Component {
    state = {
        selected: false,
        preAdopter: '',
        project: this.props.message.item.project,
        preAdopterName: this.props.message.item.requesterLastName + this.props.message.item.requesterFirstName,
        windowWidth: ''
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions = () => {
        this.setState({ windowWidth: window.innerWidth });
    }
    clickHandeler = (e) => {
        this.clearSelectedColor().then(() => {
            if (this.props.project.item.adoptionStage === 1) {
                this.setState({
                    preAdopter: this.props.message.item.requester
                }, () => this.selectPreAdopter());
                console.log("this.state", this.state)
            } else {
                return
            }
        })
        e.currentTarget.classList.add('selectedColor');
    }
    clearSelectedColor = () => {
        return new Promise((resolve, reject) => {
            document.querySelectorAll('.eachRequester').forEach(el => {
                el.classList.remove('selectedColor')
            })
            resolve();
        })
    }
    selectPreAdopter = () => {
        this.props.sendPreAdopter(this.state);
    }
    render() {
        const { requester, requesterLastName, requesterFirstName, phoneNumber, email, lineID, facebook, content, createdAt } = this.props.message.item
        const { adoptionStage, preAdopter, preAdopterStage3 } = this.props.project.item;
        const postedtime = createdAt.toDate().toLocaleString()
        const postedtime_mobile = postedtime.split(" ")[0]

        console.log('this.props.preAdopter', this.props.preAdopter)
        return (
            <MessageContainer >
                <div className='eachRequester' data-selected='adopter' onClick={(e) => this.clickHandeler(e)}>
                    <div className={`messageInformation ${adoptionStage !== 1 && preAdopter !== '' && preAdopter !== requester ? 'nonSelected' : null}`} >
                        <div className='contactMethods'>
                            <p className="requesterName">欲領養人：{requesterLastName}{requesterFirstName}</p>
                            {phoneNumber !== "" && <p >電話：{phoneNumber}</p>}
                            {email !== "" && <p>信箱：{email}</p>}
                            {lineID !== "" && <p>Line ID：{lineID}</p>}
                            {facebook !== "" && <p>Facebook：{facebook}</p>}
                        </div>
                        {this.state.windowWidth >= 768 && <p className="requestTime" >{postedtime}</p>}
                        {this.state.windowWidth < 768 && <p className="requestTime" >{postedtime_mobile}</p>}
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

