import React from "react";
import ProjectSummary from './ProjectSummary';
import { Link } from "react-router-dom";
import styled from "styled-components";
import {device} from '../../media queries/deviceName'

const ProjectListContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 80vw;
    max-width: 1200px;
    margin: 60px auto 20px auto;
    @media ${device.laptopL} {
        width: 85vw;
    }
    @media ${device.laptop} {
        width: 90vw;
    }
    @media ${device.tablet} {
        width: 95vw;
    }
    .eachProjectFrame {
        width: calc((100% - 12%) / 3 );
        top:100%;
        margin: 3% 2%;
        align-self: flex-start;
        @media ${device.tablet} {
            width: calc((100% - 20%) / 2 );
            margin: 3% 3%;
        }
        @media ${device.mobileL} {
            width: calc((100% - 18%));
            margin: 5%;
        }
    }
`;

const ProjectList = ({ projects }) => {
    return (
        <ProjectListContent>
            {projects && projects.map((project,index) => {
                return (
                    <Link to={'/project/' + project.id} key={project.id} className='eachProjectFrame'>
                        <ProjectSummary project={project} index={index}/>
                    </Link>
                )
            })}
        </ProjectListContent>
    )
}
export default ProjectList;