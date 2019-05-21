import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import firebase from "../../../config/fbConfig";
import MyPetsSummary from './MyPetsSummary';
import { Link, Redirect } from "react-router-dom";
import Loader from "../../head&foot/Loader";
import { device } from "../../../media queries/deviceName";

const MyPetsListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
    @media ${device.mobileL} {
        justify-content: center;
    }
`;

const EachPetContainer = styled.section`
    width: calc((100% - 120px)/4);
    height: calc((100vw - 80px)/4);
    margin: 0 15px 25px 15px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    -webkit-box-shadow: 0px 0px 13px -1px rgba(0,0,0,0.1);
    -moz-box-shadow: 0px 0px 13px -1px rgba(0,0,0,0.1);
    box-shadow: 0px 0px 13px -1px rgba(0,0,0,0.1);
    transition: transform 0.3s ease-in;
    @media ${device.laptopL} {
        width: calc((100% - 90px)/3);
        height: calc((100vw - 80px)/3);
    }
    @media ${device.laptop} {
        width: calc((100% - 90px)/3);
        height: calc(100vw/3 + 20px);
    }
    @media ${device.tablet} {
        width: calc((100% - 60px)/2);
        height: calc(100vw/2 + 40px);
    }
    @media ${device.mobileL} {
        width: 80%;
        height: 88vw;
        font-size: 14px;
    }
    :hover {
        transform: translate(-2px, -2px);
    }
    .adoptionStage {
        width: 100%;
        line-height: 1.5;
        position: absolute;
        bottom: 20px;
        padding: 0 10px;
        @media ${device.tablet} {
            font-size: 14px;
        }
        span{
            cursor: pointer;
            color: rgb(23, 156, 154);
        }
    }
`;

class MyPetsList extends Component {
    state = {
        projects: null
    }
    componentDidMount() {
        if (this.props.auth.uid) {
            this.asyncGetNotifiedProjectAll(this.props.auth.uid);
        } else {
            location.reload()
        }
    }
    asyncGetNotifiedProjectAll = (userid) => {
        const db = firebase.firestore();
        let list = []
        db.collection('adoptionMessage').where("requester", "==", userid).orderBy('createdAt').get()
            .then(w => {
                if (w.empty) {
                    this.setState({ projects: [] })
                } else {
                    w.forEach((eachM) => {
                        db.collection('projects').doc(eachM.data().project).get()
                            .then((doc) => {
                                list.push({ id: doc.id, item: doc.data(), messageID: eachM.id })
                            })
                            .then(() => {
                                this.setState({
                                    projects: list
                                })
                            })
                            .catch(err => console.log("errorrrrrr", err))
                    })
                }
            })
    }
    removeFromAdoptionList =(messageID) =>{
        const db = firebase.firestore();
        db.collection('adoptionMessage').doc(messageID).delete()
            .then(() => {
                location.reload();
            }).catch((err) => {
                console.log("error message", err)
            })
    }
    render() {
        const { auth } = this.props;
        const { projects } = this.state;
        console.log(projects)
        if (!auth.uid) return <Redirect to='/authentication/signin' />
        if (projects !== null) {
            if (projects.length > 0) {
                console.log("projects", projects)
                return (
                    <MyPetsListContainer>
                        {projects && projects.map((project) => {
                            const { item } = project
                            return (
                                <EachPetContainer key={project.id} >
                                    <Link to={'/project/' + project.id} >
                                        <MyPetsSummary project={project} index={project.id} />
                                    </Link>
                                    {item.adoptionStage !== 4 && item.preAdopter !== auth.uid &&
                                        <p className='adoptionStage'>請與送養人聯繫接洽<br/>接洽確認後送養人會發出切結書邀請</p>
                                    }
                                    {item.adoptionStage === 2 && item.preAdopter === auth.uid &&
                                        <p className='adoptionStage'>送養人已發出簽署切結書邀請
                                                <Link to={'/edit_affidavit' + `?project=${project.id}&foster=${item.authorID}&adopter=${auth.uid}`} >
                                                查閱切結書內容
                                                </Link>
                                        </p>
                                    }
                                    {item.adoptionStage === 3 && item.preAdopterStage3 === auth.uid &&
                                        <p className='adoptionStage'>待送養人簽署並回傳切結書後，就完成領養手續了！</p>
                                    }
                                    {item.adoptionStage === 4 && item.adopterID === auth.uid &&
                                        <p className='adoptionStage' style={{ color: 'rgb(23, 156, 154)' }}>定期與原飼主分享近況</p>
                                    }
                                    {item.adoptionStage === 4 && item.adopterID !== auth.uid &&
                                        <p className='adoptionStage'>{item.nickName}已經找到家，再看看其他毛孩吧<span onClick={()=>this.removeFromAdoptionList(project.messageID)}>從清單移除</span></p>
                                    }
                                </EachPetContainer>
                            )
                        })}
                    </MyPetsListContainer>
                )
            } else {
                return (
                    <p>給浪浪們一個家吧～！</p>
                )
            }
        } else {
            return <Loader />
        }

    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps, null)(MyPetsList);