import React from 'react';
import firebase from "../../config/fbConfig"
import styled from 'styled-components';

const ProjectSummaryContent = styled.div`
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    -webkit-box-shadow: 5px 5px 13px -1px rgba(0,0,0,0.2);
    -moz-box-shadow: 5px 5px 13px -1px rgba(0,0,0,0.2);
    box-shadow: 5px 5px 13px -1px rgba(0,0,0,0.2);
    width: 100%;
    :hover {
            transform: translate(-2px, -2px);
        }
    .imgContainer {
        width: 100%;
        .projectPicture {
            width: 100%;
            padding-bottom: 70%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            :hover {
                transform: scale(1.1);
            }
        }
    }
    .textContainer {
        padding: 0 15px 15px 15px;
        margin-top: 15px;
        line-height: 1.5;
        position: relative;
        .category {
            position: absolute;
            background-color: #E8E7E2;
            font-size: 12px;
            padding: 1px 5px;
            top: 5px;
            right: 15px;
            color: gray;
        }
        .nickName {
            font-size: 20px;
        }
        p:not(.category):not(.nickName):not(.authorPostTime) {
            font-size: 16px;
            letter-spacing: 1px;
            color: #333333;
        }
        .authorPostTimeGroup {
            text-align: right;
            margin-top: 10px;
            p {
                color: lightgray;
                font-size: 12px;
            }
        }
    }
`;

const ProjectSummary = ({ project, index }) => {
    //時間
    const detailtime = project.createdAt.toDate().toString().split(" ")
    let time = "";
    for (let i = 0; i < 5; i++) {
        time = time + detailtime[i] + " "
    }

    return (
        <ProjectSummaryContent>
            <div className='imgContainer'>
                <div className='projectPicture' style={{ backgroundImage: `url('${project.fileUrl}')` }}></div>
            </div>
            <div className='textContainer'>
                <p className='category'>{project.publicationCategory}</p>
                <p className='nickName'>{project.nickName.toUpperCase()}</p>
                <p>{project.age}</p>
                <p>{project.gender}</p>
                <div className='authorPostTimeGroup'>
                    <p className='authorPostTime'>Posted by {project.authorFirstName} {project.authorLastName}</p>
                    <p className='authorPostTime'>{project.createdAt.toDate().toLocaleString()}</p>
                </div>
            </div>
        </ProjectSummaryContent>
    )
}

export default ProjectSummary;

