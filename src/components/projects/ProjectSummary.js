import React from 'react';
import firebase from "../../config/fbConfig"


const ProjectSummary = ({ project, index }) => {
    //時間
    const detailtime = project.createdAt.toDate().toString().split(" ")
    let time = "";
    for (let i = 0; i < 5; i++) {
        time = time + detailtime[i] + " "
    }

    return (
        <div style={{ margin: '20px' }}>
            <div>
                <img src={project.fileUrl} style={{ height: "125px", width: "auto" }} index={index} />
            </div>
            <div>
                <p>刊登類別：{project.publicationCategory}</p>
                <p>小名：{project.nickName}</p>
                <p>種類：{project.species}</p>
                <p>性別：{project.gender}</p>
                <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
                <p>{time}</p>
            </div>
        </div>
    )
}

export default ProjectSummary;

