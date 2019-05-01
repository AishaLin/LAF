import React from 'react';
import styled from 'styled-components';
import firebase from "../../../config/fbConfig"
import Affidavit_pdf from "../../adoption/Affidavit_pdf";

const MyPetsSummaryContent = styled.div`
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
        <img src={item.fileUrl} index={index} />
      </div>
      <DetailInformation>
        <p>動物小名：{item.nickName}</p>
        <p>動物種類：{item.species}</p>
        <p>性別：{item.gender}</p>
        <p>年齡/生日：{item.age}</p>
        <p>品種：{item.variety}</p>
        <p>晶片號碼：{item.microchipsNumber}</p>
      </DetailInformation>
    </MyPetsSummaryContent>
  )
}

export default MyPetsSummary;

