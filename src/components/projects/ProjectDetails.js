import React, { Component } from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import styled from 'styled-components';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import Affidavit_pdf from '../../components/adoption/Affidavit_pdf'
import AdoptionMessage from '../adoption/AdoptionMessage';

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
        -webkit-box-shadow: 5px 5px 13px -1px rgba(0,0,0,0.3);
        -moz-box-shadow: 5px 5px 13px -1px rgba(0,0,0,0.3);
        box-shadow: 5px 5px 13px -1px rgba(0,0,0,0.3);
        .imgSecondContainer {
          width: 100%;
          height: auto;
          margin: 5px auto 20px auto;
          img {
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
            border-radius: 5px;
          }
        }
        .postedInformation {
          height: 100px;
          color: grey;
          position: relative;
          line-height: 1.5;
          font-size: 16px;
          .category {
            position: absolute;
            background-color: #E8E7E2;
            font-size: 12px;
            padding: 1px 5px;
            top: 3px;
            right: 0;
            color: grey;
          }
          .nickName {
            font-size: 20px;
            color: rgb(23, 156, 154);
          }
          p:not(.category):not(.nickName):not(.authorPostTime) {
            font-size: 16px;
            letter-spacing: 1px;
            color: #333333;
          }
          .authorAndPostTime {
            width: auto;
            position: absolute;
            bottom: 0;
            right: 0;
            text-align: right;
            font-size: 12px;
          }
        }
      }
    }
    .sendMessage_btn {
      .successHint {
        width: 30vw;
        min-width: 300px;
        height: fit-content;
        letter-spacing: 2px;
        border-radius: 3px;
        margin: 30px 0 10px 0;
        font-size: 20px;
        border: none;
        color: rgb(23, 156, 154);
        padding: 10px;
        line-height: 1.5;
      }
      button {
        width: 30vw;
        min-width: 300px;
        height: 50px;
        letter-spacing: 5px;
        background-color: rgb(23, 156, 154);
        border-radius: 10px;
        margin: 30px 0 10px 0;
        font-size: 20px;
        border: none;
        color: #FFFFFF;
        :hover {
          background-color: rgb(23, 156, 154, 0.85);
        }
        :active {
          transform: translate(2px, 3px);
        }
      }
    }
  }
`;
const DetailInformation = styled.section`
  font-family: 'Neue Helvetica W01', 'AXIS Font Japanese W55', 'Helvetica Neue', 'sans-serif';
  text-align: left;
  margin-top: 0;
  margin-left: 40px;
    .item {
      line-height: 1.8;
      display: flex;
    }
    .mark {
      color: #FCC802;
      margin: 0 10px;
      width: 30px;
      min-width: 30px;
    }
`;
const BouncingLoader = styled.div`
    display: flex;
    justify-content: center;
    margin: auto 0;
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

class ProjectDetails extends Component {
  state = {
    messagePopup: false
  }
  togglePopup = () => {
    this.setState(prevState => ({
      messagePopup: !prevState.messagePopup
    }));
  }
  render() {
    const { project, auth } = this.props;
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
          {this.state.messagePopup ? <AdoptionMessage togglePopup={this.togglePopup.bind(this)} project={project} /> : null}
          <div className='ProjectDetail'>
            <div className='ProjectDetail_WithoutBtn'>
              <div className='imgContainer'>
                <div className='imgSecondContainer'>
                  <img src={project.fileUrl} />
                </div>
                <div className='postedInformation'>
                  <p className='category'>{project.publicationCategory}</p>
                  <p className='nickName'>{project.nickName}</p>
                  <p>{project.age}</p>
                  <p>{project.gender}</p>
                  <div className='authorAndPostTime'>
                    <div>Posted by {project.authorFirstName} {project.authorLastName} </div>
                    <div>{time}</div>
                  </div>
                </div>
              </div>
              <DetailInformation>
                <div className='item'><div className='mark' >✱</div><div>種類：{project.species}</div></div>
                <div className='item'><div className='mark' >✱</div><div>體型：{project.size}</div></div>
                <div className='item'><div className='mark' >✱</div><div>體重：{project.weight}</div></div>
                <div className='item'><div className='mark' >✱</div><div>品種：{project.variety}</div></div>
                <div className='item'><div className='mark' >✱</div><div>晶片：{project.microchipsNumber}</div></div>
                <div className='item'><div className='mark' >✱</div><div>目前所在地：{project.currentLocation}</div></div>
                <div className='item'><div className='mark' >✱</div><div>個性：{project.character}</div></div>
                <div className='item'><div className='mark' >✱</div><div>結紮狀況：{project.ligation}</div></div>
                <div className='item'><div className='mark' >✱</div><div>健康狀況：{project.physicalCondition}</div></div>
                <div className='item'><div className='mark' >✱</div><div>送養原因：{project.reason}</div></div>
                <div className='item'><div className='mark' >✱</div><div>認養條件：{project.requirement}</div></div>
                <div className='item'><div className='mark' >✱</div><div>聯絡方式：{project.connectMethods}</div></div>
                <div className='sendMessage_btn'>
                  {project.adoptionStage !== 4 && <button onClick={this.togglePopup}>與送養人聯繫</button>}
                  {project.adoptionStage === 4 && <p className='successHint'>恭喜 {project.nickName} 找到他的長期飯票了！</p>}
                </div>
              </DetailInformation>
            </div>
          </div>
          {project.adoptionStage === 4 && project.adopterID === auth.uid &&
            <Affidavit_pdf project={project} />
          }
          {project.adoptionStage === 4 && project.authorID === auth.uid &&
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
