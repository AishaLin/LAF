import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import firebase from "../../../config/fbConfig"
import MessageList from '../contactProcess/MessageList';

const FosterSummaryContent = styled.div`
    display: flex;
    background-color: #fff;
    height: fit-content;
    .imgContainer {
        width: 300px;
        overflow: hidden;
        margin-right: 20px;
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
        .projectBasicInformation {
            position: relative;
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
        }
    }
`;

const FosterSummary = ({ project, index }) => {
    const { item } = project;
    //時間
    const detailtime = item.createdAt.toDate().toString().split(" ")
    let time = "";
    for (let i = 0; i < 5; i++) {
        time = time + detailtime[i] + " "
    }

    return (
        <div>
            <FosterSummaryContent>
                <Link to={'/project/' + project.id} >
                    <div className="imgContainer">
                        <div className='projectPicture' index={index} style={{ backgroundImage: `url('${item.fileUrl}')` }} />
                    </div>
                </Link>
                <div className="fosterInformation">
                    <div className='projectBasicInformation'>
                        <p>小名：{item.nickName}</p>
                        <p>年齡：{item.age}</p>
                        <p>性別：{item.gender}</p>
                        <p>晶片：{item.microchipsNumber}</p>
                        <p className='postedTime'>{item.createdAt.toDate().toLocaleString()}</p>
                    </div>
                    {item.adoptionStage === 0 &&
                        <div className='adoptionStatus'>
                            <p>目前沒有收到領養通知</p>
                        </div>
                    }
                    {item.adoptionStage === 1 &&
                        <div className='adoptionStatus'>
                            <p>確認領養人後，請由下方列表選取該領養人資訊，並點擊下方按鈕，通知領養人填寫切結書</p>
                        </div>
                    }
                    {item.adoptionStage === 2 &&
                        <div className='adoptionStatus'>
                            <p>待 <span>{item.preAdopterName}</span> 回傳切結書</p>
                        </div>
                    }
                    {item.adoptionStage === 3 &&
                        <div className='adoptionStatus'>
                            <p><span>{item.preAdopterName}</span> 已回傳切結書</p>
                            <Link to={'/approve_affidavit' + `?project=${project.id}&foster=${project.authorID}&adopter=${project.preAdopter}`}>
                                <button>查閱內容</button>
                            </Link>
                        </div>
                    }
                </div>
            </FosterSummaryContent>
        </div>
    )
}

export default FosterSummary;

