import React from 'react';
import styled from 'styled-components';
import firebase from "../../../config/fbConfig"
import Affidavit_pdf from "../../adoption/Affidavit_pdf";

const MyPetsSummaryContent = styled.div`
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
`;

const MyPetsSummary = ({ project, index }) => {
  const { item } = project;

  //時間
  const detailtime = item.createdAt.toDate().toString().split(" ")
  let time = "";
  for (let i = 0; i < 5; i++) {
    time = time + detailtime[i] + " "
  }

  return (
    <MyPetsSummaryContent>
      <div className="imgContainer">
        <div className='projectPicture' style={{ backgroundImage: `url('${item.fileUrl}')` }}></div>
      </div>
      <DetailInformation>
        <p>{item.nickName}</p>
      </DetailInformation>
    </MyPetsSummaryContent>
  )
}

export default MyPetsSummary;

