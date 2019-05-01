import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import firebase from "../../../config/fbConfig";
import MyPetsSummary from './MyPetsSummary';
import Affidavit_pdf from '../../adoption/Affidavit_pdf';
import { Link, Redirect } from "react-router-dom";

const MyPetsListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const EachPetContainer = styled.section`
    width: 50%;
    height: 320px;
    display: flex;
    justify-content: center;
    
    .secondContainer {
       width: 95%;
       height: 90%;
       background-color: #fff;
       padding: 20px;
    }
    button {
        height: 16%;
        width: 100%;
        margin-top: 10px;
        background-color: #FCE196;
        border-radius: 10px;
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
                                    <div className='secondContainer'>
                                        <Link to={'/project/' + project.id} >
                                            <MyPetsSummary project={project} index={project.id} />
                                        </Link>
                                        {item.adoptionStage === 1 && item.preAdopter !== this.props.auth.uid &&
                                            <button>請與送養人聯繫接洽</button>
                                        }
                                        {item.adoptionStage === 2 && item.preAdopter === this.props.auth.uid &&
                                            <Link to={'/edit_affidavit' + `?project=${project.id}&foster=${item.authorID}&adopter=${auth.uid}`} >
                                                <button>送養人已發出簽署切結書邀請，請點我查閱切結書內容</button>
                                            </Link>
                                        }
                                        {item.adoptionStage === 3 && item.preAdopterStage3 === auth.uid &&
                                            <button>待送養人簽署並回傳切結書後，就完成領養手續了！</button>
                                        }
                                        {item.adoptionStage === 4 &&
                                            <button>與原飼主分享近況</button>
                                        }
                                    </div>
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