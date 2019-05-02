import React from "react";
import ProjectSummary from './ProjectSummary';
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProjectListContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 80vw;
    max-width: 1200px;
    margin: 60px auto 20px auto;
    .eachProjectFrame {
        width: calc((100% - 12%) / 3 );
        margin: 3% 2%;
        align-self: flex-start;
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