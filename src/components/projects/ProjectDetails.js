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
import Loader from '../head&foot/Loader';
import { device } from "../../media queries/deviceName";
import firebase from "../../config/fbConfig";

const ProjectDetailContainer = styled.section`
  width: 80vw;
  height: fit-content;
  margin: 50px auto 0 auto;
  @media ${device.laptopL} {
    width: 90%;
  }
  .ProjectDetail{
    width: 100%;
    display: flex;
    height: fit-content;
    @media ${device.tablet} {
      flex-direction: column;
    }
    .imgContainer {
      width: 50%;
      background-color: #fff;
      border-radius: 8px;
      padding: 15px;
      -webkit-box-shadow: 5px 5px 13px -1px rgba(0,0,0,0.3);
      -moz-box-shadow: 5px 5px 13px -1px rgba(0,0,0,0.3);
      box-shadow: 5px 5px 13px -1px rgba(0,0,0,0.3);
      @media ${device.laptopL} {
        width: 60%;
      }
      @media ${device.laptop} {
        width: 85vw;
      }
      @media ${device.tablet} {
        margin: 0 auto 50px auto;
      }
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
        cursor: pointer;
        :hover {
          background-color: rgb(23, 156, 154, 0.85);
        }
        :active {
          transform: translate(2px, 3px);
        }
      }
      @media ${device.tablet} {
        display: flex;
        justify-content: center;
      }
    }
  }  
`;
const DetailInformation = styled.section`
  text-align: left;
  margin-top: 0;
  margin-left: 40px;
  @media ${device.tablet} {
    width: 85vw;
    margin: auto;
  }
  .item {
    line-height: 1.8;
    display: flex;
  }
  .mark {
    color: #FCC802;
    margin-right: 10px;
    width: 30px;
    min-width: 30px;
    @media ${device.tablet} {
      margin-right: 5px;
    }
  }
`;

class ProjectDetails extends Component {
  state = {
    messagePopup: false,
    sentMessageOrNot: null,
  }
  componentDidMount() {
    this.checkMessageSentOrNot(this.props.auth.uid);
  }
  checkMessageSentOrNot = (userid) => {
    if (this.props.auth.uid) {
      const db = firebase.firestore();
      const projectID = location.hash.split("/")[2]
      db.collection('adoptionMessage').where("requester", "==", userid).where("project", '==', projectID).orderBy('createdAt').get()
        .then(message => {
          this.setState({
            sentMessageOrNot: message.empty
          })
        })
        .catch(err => console.log("errorrrrrr", err))
    } else {
      this.setState({
        sentMessageOrNot: "nonLogin"
      })
    }

  }
  togglePopup = () => {
    this.setState(prevState => ({
      messagePopup: !prevState.messagePopup
    }));
  }
  render() {
    const { project, auth } = this.props;
    if (project) {
      const detailtime = project.createdAt.toDate().toString().split(" ")
      let time = "";
      for (let i = 0; i < 5; i++) {
        time = time + detailtime[i] + " "
      }
      return (
        <ProjectDetailContainer>
          {this.state.messagePopup ? <AdoptionMessage togglePopup={this.togglePopup.bind(this)} project={project} /> : null}
          <div className='ProjectDetail'>
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
                {project.adoptionStage !== 4 && this.state.sentMessageOrNot === null && <Loader />}
                {project.adoptionStage !== 4 && this.state.sentMessageOrNot === "nonLogin" && <button onClick={this.togglePopup}>與送養人聯繫</button>}
                {project.adoptionStage !== 4 && this.state.sentMessageOrNot && <button onClick={this.togglePopup}>與送養人聯繫</button>}
                {project.adoptionStage !== 4 && !this.state.sentMessageOrNot && this.state.sentMessageOrNot !== null && <p className='successHint'>您已發出領養通知，請與送養人聯繫！</p>}
                {project.adoptionStage === 4 && <p className='successHint'>恭喜 {project.nickName} 找到他的長期飯票了！</p>}
              </div>
            </DetailInformation>
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
      return <Loader />
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
