import React from 'react';
import styled from 'styled-components';
import Loader from '../head&foot/Loader';
import {device} from '../../media queries/deviceName';

const ProjectSummaryContent = styled.div`
    background-color: #fff;
    border-radius: 16px;
    overflow: hidden;
    -webkit-box-shadow: 0px 0px 13px -1px rgba(0,0,0,0.1);
    -moz-box-shadow: 0px 0px 13px -1px rgba(0,0,0,0.1);
    box-shadow: 0px 0px 13px -1px rgba(0,0,0,0.1);
    width: 100%;
    transition: transform 0.3s ease-in;
    :hover {
        transform: translate(-2px, -2px);
    }
    .imgContainer {
        width: 100%;
        overflow: hidden;
        .projectPicture {
            width: 100%;
            padding-bottom: 70%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            transform: scale(1, 1);
            transition: all 0.6s ease-out;
            :hover {
                transform: scale(1.1, 1.1);
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
        #sucssesHint {
            position: absolute;
            left: 15px;
            bottom: 20px;
            color: lightgray;
            border: 1px solid lightgray;
            font-size: 12px;
            padding: 1px 2px;
            border-radius: 2px;
            letter-spacing: 0px;
            @media ${device.laptop} {
                left: inherit;
                right: 15px;
                bottom: 55px;
            }
            @media ${device.mobileL} {
                right: inherit;
                left: 15px;
                bottom: 20px;
            }
        }
    }
`;

const ProjectSummary = ({ project, index }) => {
    if(project.createdAt) {
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
                        <p className='authorPostTime'>Posted by {project.authorLastName} {project.authorFirstName}</p>
                        <p className='authorPostTime'>{project.createdAt.toDate().toLocaleString()}</p>
                    </div>
                    {project.adoptionStage === 4 && <p id='sucssesHint'>已媒合成功</p>}
                </div>
            </ProjectSummaryContent>
        )
    } else {
        return <Loader />
    }
    
}

export default ProjectSummary;

