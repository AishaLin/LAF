import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import firebase from "../../../config/fbConfig";
import 'firebase/auth';
import Affidavit_pdf from "../../adoption/Affidavit_pdf";

const ClosingCaseContent = styled.div`
  display: flex;
  flex-direction: column;
  color: rgb(57, 61, 82);
  .imgContainer {
    width: 100%;
    overflow: hidden;
    background-color: grey;
    .projectPicture {
      width: 100%;
      padding-bottom: 80%;
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
`;

const DetailInformation = styled.section`
  font-family: 'Neue Helvetica W01', 'AXIS Font Japanese W55', 'Helvetica Neue', 'sans-serif';
  text-align: left;
  padding: 10px;
    p {
      text-align: center;
      line-height: 1.8;
      font-size: 20px;
    }
    .adopter {
      width: 100%;
      line-height: 1.5;
      position: absolute;
      bottom: 10px;
      font-size: 16px;
    }
`;

class ClosingCase extends Component {
  state = {
    affidavitData: ''
  }
  componentDidMount() {
    this.GetAffidavitInformation(this.props.project.item.affidavitID);
  }
  GetAffidavitInformation = (affidavitID) => {
    const db = firebase.firestore();
    db.collection('affidavit').doc(affidavitID).get()
      .then(q => {
        this.setState({ affidavitData: q.data() })
      })
      .catch(err => console.log("errorrrrrr", err))
  }
  render() {
    const { project, index } = this.props;
    const { item } = project;
    console.log('itemitemitem', this.state.affidavitData)
    if (project) {
      const createdtime = item.createdAt.toDate().toString().split(" ");
      const closedtime = item.closeCaseAt.toDate().toString().split(" ");
      function getTime(t) {
        let time = ''
        for (let i = 0; i < 5; i++) {
          time = time + t[i] + " "
        }
        return time
      }

      // if (!auth.uid) return <Redirect to='/signin' />
      return (
        <ClosingCaseContent>
          <div className="imgContainer">
            <div className='projectPicture' style={{ backgroundImage: `url('${item.fileUrl}')` }}></div>
          </div>
          <DetailInformation>
            <p>{item.nickName}</p>
            <p className='adopter'>認養人 {this.state.affidavitData.adopterSignature}</p>
          </DetailInformation>
        </ClosingCaseContent>
      )
    } else {
      return (
        <div className="container center">
          <p>Loading project...</p>
        </div>
      )
    }
  }


}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps, null)(ClosingCase)
