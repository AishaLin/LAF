import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import firebase from "../../../config/fbConfig";
import 'firebase/auth';
import Affidavit_pdf from "../../adoption/Affidavit_pdf";

const ClosingCaseContent = styled.div`
  display: flex;
  background-color: #fff;
  height: 100%;
  .imgContainer {
    height: 200px;
    width: 200px;
    img {
      height: auto;
      width: auto;
      max-height: 100%;
      max-width: 100%;
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
            <img src={item.fileUrl} index={index} />
          </div>
          <DetailInformation>
            <p>收養人：{this.state.affidavitData.adopterSignature}</p>
            <p>動物小名：{item.nickName}</p>
            <p>動物種類：{item.species}</p>
            <p>性別：{item.gender}</p>
            <p>年齡/生日：{item.age}</p>
            <p>品種：{item.variety}</p>
            <p>晶片號碼：{item.microchipsNumber}</p>
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
