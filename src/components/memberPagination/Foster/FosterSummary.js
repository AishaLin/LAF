import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { device } from "../../../media queries/deviceName";

const FosterSummaryContent = styled.div`
    display: flex;
    background-color: #fff;
    height: fit-content;
    @media ${device.tablet} {
        flex-direction: column;
        height: 380px;
    }
    .imgContainer {
        width: 300px;
        overflow: hidden;
        margin-right: 20px;
        @media ${device.mobileL} {
            width: 100%;
            margin: auto;
        }
        .projectPicture {
            width: 100%;
            padding-bottom: 70%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 3px;
        }
    }
    .fosterInformation {
        flex-grow: 1;
        text-align: left;
        line-height: 2;
        color: rgb(57, 61, 82);
        position: relative;
        @media ${device.tablet} {
            line-height: 1.5;
            margin-top: 10px;
        }
        .projectBasicInformation {
            position: relative;
            font-size: 18px;
            @media ${device.tablet} {
                font-size: 18px;
            }
            @media ${device.mobileL} {
                font-size: 16px;
            }
            .postedTime {
                position: absolute;
                top: 0;
                right: 0;
                color: rgb(57, 61, 82, 0.5);
            }
        }
        .adoptionStatus {
            position: absolute;
            bottom: 0;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            div {
                flex-grow: 1;
            }
            span {
                background-color: rgb(252, 225, 150, 0.4);
                padding: 1px 2px;
                border-radius: 3px;
            }
            button {
                cursor: pointer;
                font-size: 14px;
            }
        }
    }
`;

class FosterSummary extends Component {
    state = {
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

    render() {
        const { item } = this.props.project;
        const postedtime = item.createdAt.toDate().toLocaleString()
        const postedtime_mobile = postedtime.split(" ")[0]
        return (
            <div>
                <FosterSummaryContent>
                    <Link to={'/project/' + this.props.project.id} >
                        <div className="imgContainer">
                            <div className='projectPicture' index={this.props.index} style={{ backgroundImage: `url('${item.fileUrl}')` }} />
                        </div>
                    </Link>
                    <div className="fosterInformation">
                        <div className='projectBasicInformation'>
                            <p>小名：{item.nickName}</p>
                            <p>年齡：{item.age}</p>
                            <p>性別：{item.gender}</p>
                            <p>晶片：{item.microchipsNumber}</p>
                            {this.state.windowWidth > 850 && <p className='postedTime'>{postedtime}</p>}
                            {this.state.windowWidth <= 850 && <p className='postedTime'>{postedtime_mobile}</p>}
                        </div>
                        {item.adoptionStage === 0 &&
                            <div className='adoptionStatus'>
                                <p style={{ color: '#9397AA' }}>目前沒有收到領養通知</p>
                            </div>
                        }
                        {item.adoptionStage === 1 &&
                            <div className='adoptionStatus'>
                                <p>確認領養人後，請由下方列表選取該領養人資訊，通知領養人填寫切結書</p>
                            </div>
                        }
                        {item.adoptionStage === 2 &&
                            <div className='adoptionStatus'>
                                <p>待 <span>{item.preAdopterName}</span> 回傳切結書</p>
                            </div>
                        }
                        {item.adoptionStage === 3 &&
                            <div className='adoptionStatus'>
                                <div><span>{item.preAdopterName}</span> 已回傳切結書</div>
                                <Link to={'/approve_affidavit' + `?project=${this.props.project.id}&foster=${item.authorID}&adopter=${item.preAdopter}`}>
                                    <button>查閱內容</button>
                                </Link>
                            </div>
                        }
                    </div>
                </FosterSummaryContent>
            </div>
        )
    }
}

export default FosterSummary;

