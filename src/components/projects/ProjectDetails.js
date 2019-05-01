import React from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import firebase from "../../config/fbConfig";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import Affidavit_pdf from '../../components/adoption/Affidavit_pdf'

const ProjectDetailContainer = styled.section`
  width: 80vw;
  height: fit-content;
  margin: 50px auto 0 auto;
  .ProjectDetail {
    width: 100%;
    .ProjectDetail_WithoutBtn{
      width: 100%;
      display: flex;
      height: fit-content;
      .imgContainer {
        width: 40%;
        height: auto;
        background-color: #fff;
        border-radius: 8px;
        padding: 15px;
        position: relative;
        -webkit-box-shadow: 5px 5px 13px -1px rgba(0,0,0,0.3);
        -moz-box-shadow: 5px 5px 13px -1px rgba(0,0,0,0.3);
        box-shadow: 5px 5px 13px -1px rgba(0,0,0,0.3);
        .imgSecondContainer {
          width: 100%;
          height: auto;
          margin: 5px auto 35px auto;
          img {
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
            border-radius: 5px;
          }
        }
        .postedInformation {
          color: grey;
          text-align: right;
          position: absolute;
          bottom: 15px;
          right: 15px;
          line-height: 1.5;
          font-size: 16px;
        }
      }
    }



    .sendMessage_btn {
      button {
        width: 50%;
        height: 50px;
        letter-spacing: 5px;
        color: #131313;
        border-radius: 10px;
        margin: 10px 0;
        font-size: 20px;
      }
      
    }
  }
`;

const DetailInformation = styled.section`
  font-family: 'Neue Helvetica W01', 'AXIS Font Japanese W55', 'Helvetica Neue', 'sans-serif';
  text-align: left;
  margin-top: 0;
  margin-left: 20px;
    p {
      line-height: 1.8;
    }
    span {
      color: #FCC802;
      margin: 0 10px;
    }
`;
const BouncingLoader = styled.div`
    display: flex;
    justify-content: center;
    @keyframes bouncing-loader {
        to {
            opacity: 0.1;
            transform: translate3d(0, -1rem, 0);
        }
    }
    div {
        width: 1rem;
        height: 1rem;
        margin: 3rem 0.2rem;
        background: #8385aa;
        border-radius: 50%;
        animation: bouncing-loader 0.6s infinite alternate;
    }
    div:nth-child(2) {
        animation-delay: 0.2s;
    }
    div:nth-child(3) {
        animation-delay: 0.4s;
    }
`;

const ProjectDetails = (props) => {
  const { project, auth } = props;
  console.log(project)
  if (project) {
    const detailtime = project.createdAt.toDate().toString().split(" ")
    let time = "";
    for (let i = 0; i < 5; i++) {
      time = time + detailtime[i] + " "
    }

    // if (!auth.uid) return <Redirect to='/signin' />
    return (
      <ProjectDetailContainer>
        <div className='ProjectDetail'>
          <div className='ProjectDetail_WithoutBtn'>
            <div className='imgContainer'>
              <div className='imgSecondContainer'>
                <img src={project.fileUrl} />
              </div>
              <hr />
              <div className='postedInformation'>
                <div>Posted by {project.authorFirstName} {project.authorLastName} </div>
                <div>{time}</div>
              </div>
            </div>
            <DetailInformation>
              <p><span>●</span>刊登類別：{project.publicationCategory}</p>
              <p><span>✱</span>動物小名：{project.nickName}</p>
              <p><span>✱</span>動物種類：{project.species}</p>
              <p><span>✱</span>性別：{project.gender}</p>
              <p><span>✱</span>年齡/生日：{project.age}</p>
              <p><span>✱</span>體型：{project.size}</p>
              <p><span>✱</span>體重：{project.weight}</p>
              <p><span>✱</span>品種：{project.variety}</p>
              <p><span>✱</span>健康狀況：{project.physicalCondition}</p>
              <p><span>✱</span>晶片號碼：{project.microchipsNumber}</p>
              <p><span>✱</span>目前所在地：{project.currentLocation}</p>
              <p><span>✱</span>個性：{project.character}</p>
              <p><span>✱</span>送養原因/其他想說的話：{project.reason}</p>
              <p><span>✱</span>認養條件：{project.requirement}</p>
              <p><span>✱</span>聯絡方式：{project.connectMethods}</p>
              <div className='sendMessage_btn'>
                {project.adoptionStage !== 4 && <button><Link to={`/adoptionMessage?case=${location.hash.split("/")[2]}&from=${project.authorID}`}>與送養人聯繫</Link></button>}
                {project.adoptionStage === 4 && <p>恭喜 {project.nickName} 已經找到他的長期飯票了！</p>}
              </div>
            </DetailInformation>
          </div>
        </div>
        {project.adoptionStage === 4 && project.adopterID === auth.uid &&
          <Affidavit_pdf project={project} />
        }
      </ProjectDetailContainer>
    )
  } else {
    return (
      <BouncingLoader>
        <div></div>
        <div></div>
        <div></div>
      </BouncingLoader>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null
  return {
    project: project,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects' }
  ])
)(ProjectDetails)
