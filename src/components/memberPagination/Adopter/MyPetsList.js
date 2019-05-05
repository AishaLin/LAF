import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import firebase from "../../../config/fbConfig";
import MyPetsSummary from './MyPetsSummary';
import { Link, Redirect } from "react-router-dom";

const MyPetsListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
`;

const EachPetContainer = styled.section`
    width: calc((100% - 120px)/4);
    margin: 0 15px 25px 15px;
    height: 350px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    -webkit-box-shadow: 5px 5px 13px -1px rgba(0,0,0,0.2);
    -moz-box-shadow: 5px 5px 13px -1px rgba(0,0,0,0.2);
    box-shadow: 5px 5px 13px -1px rgba(0,0,0,0.2);
    transition: transform 0.3s ease-in;
    :hover {
        transform: translate(-2px, -2px);
    }
    .adoptionStage {
        width: 100%;
        line-height: 1.5;
        position: absolute;
        bottom: 20px;
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
                console.log(w)
                if (w.empty) {
                    this.setState({ projects: [] })
                } else {
                    w.forEach((eachM) => {
                        db.collection('projects').doc(eachM.data().project).get()
                            .then((doc) => {
                                list.push({ id: doc.id, item: doc.data() })
                            })
                            .then(() => {
                                this.setState((prevState) => ({
                                    projects: list
                                }))
                            })
                            .catch(err => console.log("errorrrrrr", err))
                    })
                }
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
                                        {item.adoptionStage === 1 && item.preAdopter !== this.props.auth.uid &&
                                            <p className='adoptionStage'>請與送養人聯繫接洽</p>
                                        }
                                        {item.adoptionStage === 2 && item.preAdopter === this.props.auth.uid &&
                                            <p className='adoptionStage'>送養人已發出簽署切結書邀請
                                                <Link to={'/edit_affidavit' + `?project=${project.id}&foster=${item.authorID}&adopter=${auth.uid}`} >
                                                    查閱切結書內容
                                                </Link>
                                            </p>
                                        }
                                        {item.adoptionStage === 3 && item.preAdopterStage3 === auth.uid &&
                                            <p className='adoptionStage'>待送養人簽署並回傳切結書後，就完成領養手續了！</p>
                                        }
                                        {item.adoptionStage === 4 &&
                                            <p className='adoptionStage' style={{color:'rgb(23, 156, 154)'}}>定期與原飼主分享近況</p>
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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(MyPetsList);

// {notifiedProject && notifiedProject.map((project) => {
//     const { item } = project
//     if (item.adoptionStage !== 4) {
//         return (
//             <section key={project.id} >
//                 <Link to={'/project/' + project.id} >
//                     <MyPetsSummary project={project} index={project.id} />
//                 </Link>
//                 {item.adoptionStage === 1 || item.adoptionStage === 2 && item.preAdopter !== this.props.auth.uid && <button>快與送養人接洽相親時間唷！</button>}
//                 {item.adoptionStage === 2 && item.preAdopter === this.props.auth.uid &&
//                     <Link to={'/edit_affidavit' + `?project=${project.id}&foster=${item.authorID}&adopter=${auth.uid}`} >
//                         <button>送養人已發出簽署切結書邀請，請點我查閱切結書內容</button>
//                     </Link>
//                 }
//                 {item.adoptionStage === 3 && <button>待送養人簽署並回傳切結書後，就完成領養手續了！</button>}
//             </section>
//         )
//     }
// })}
// {notifiedProject && notifiedProject.map((project) => {
//     const { item } = project
//     if (item.adoptionStage === 4) {
//         //時間
//         const detailtime = item.createdAt.toDate().toString().split(" ")
//         let time = "";
//         for (let i = 0; i < 5; i++) {
//             time = time + detailtime[i] + " "
//         }
//         return (
//             //之後要連接近況更新頁
//             <section key={project.id} >
//                 <Link to={'/project/' + project.id} >
//                     <MyPetsSummary project={project} index={project.id} />
//                 </Link>
//                 {item.adoptionStage === 4 &&
//                     <div className="card-action gret lighten-4 grey-text">
//                         <div>刊登日期 {time} — 結案日期 {time}</div>
//                         <Affidavit_pdf project={project} />
//                     </div>
//                 }
//             </section>
//         )
//     }
//     else if (notifiedProject === null) {
//         return (
//             <p>快快找到命中注定的毛孩 帶他回家：）</p>
//         )
//     }
// })}