import React from 'react';
import styled from 'styled-components';
import firebase from "../../../config/fbConfig"
import MessageList from '../contactProcess/MessageList';

const FosterSummaryContent = styled.div`
    display: flex;
    background-color: #fff;
    height: fit-content;
    .imgContainer {
        height: 200px;
        width: 200px;
        margin-right: 20px;
        img {
        height: auto;
        width: auto;
        max-height: 100%;
        max-width: 100%;
        }
    }
    .fosterInformation {
        text-align: left;
        line-height: 1.5;
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
                <div className="imgContainer">
                    <img src={item.fileUrl} index={index} />
                </div>
                <div className="fosterInformation">
                    <p>小名：{item.nickName}</p>
                    <p>年齡：{item.age}</p>
                    <p>性別：{item.gender}</p>
                    <p>晶片：{item.microchipsNumber}</p>
                    <p>{time}</p>
                </div>
            </FosterSummaryContent>
        </div>
    )
}

export default FosterSummary;

