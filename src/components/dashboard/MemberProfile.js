import React, { Component } from "react";
import { connect } from "react-redux";
import 'firebase/auth';
import firebase from "../../config/fbConfig"
import { Link, Redirect } from 'react-router-dom';
import {
    BrowserRouter,
    HashRouter,
    Switch,
    Route
} from 'react-router-dom'
import styled from 'styled-components';
import MyPetsList from '../memberPagination/Adopter/MyPetsList';
import FosterList from '../memberPagination/Foster/FosterList';
import ClosingCaseList from '../memberPagination/ClosingCase/ClosingCaseList';
import clearRecord from '../../actions/clearRecordAction'

const MemberInformation = styled.div`
    width: 80%;
    margin: 50px auto 20px auto;
    text-align: center;
    h1 {
        font-size: 32px;
        margin-bottom: 25px;
    }
    .memberPhoto {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 5px solid #fff;
        margin: 10px auto 20px auto;
    }
    .listBtns {
        display: flex;
        margin-top: 30px;
        .eachList_btn {
            flex-grow: 1;
            border: 5px solid lightgrey;
            border-radius: 20px 20px 0 0;
            height: 60px;
            letter-spacing: 5px;
            font-size: 24px;
            :before {
                content: '';
                height: 100%;
                display: inline-block;
                vertical-align: middle;
            }
            :not(.first_btn) {
                margin-left: -5px;
            }
        }
    }
    .dashboard {
        border-top: 5px solid lightgrey;
        padding: 45px 10px;
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

class MemberProfile extends Component {
    state = {
        member: null
    }
    componentDidMount() {
        if (this.props.auth.uid) {
            this.getMemberInformation(this.props.auth.uid);
        } else {
            location.reload()
        }
    }
    componentWillUnmount() {
        this.props.dispatch(clearRecord());
    }
    getMemberInformation = (userID) => {
        const db = firebase.firestore();
        db.collection('users').doc(userID).get()
            .then(user => {
                this.setState({
                    member: user.data()
                })
            })
            .catch(err => console.log('error message', err))
    }
    selectedPage = () => {
        this.setState((prevState) => ({

        }))
    }
    render() {
        const { auth } = this.props;
        const { member } = this.state;
        if (!auth.uid) return <Redirect to='/authentication/signin' />

        const mypetslist = { borderBottom: '5px solid lightgrey' }
        const fosterlist = { borderBottom: '5px solid lightgrey' }
        const closingcaselist = { borderBottom: '5px solid lightgrey' }
        let page = location.hash.split("/")[2];
        if (page === 'mypetslist') {
            mypetslist.borderBottom = 'none'
        } else if (page === 'fosterlist') {
            fosterlist.borderBottom = 'none'
        } else if (page === 'closingcaselist') {
            closingcaselist.borderBottom = 'none'
        }

        if (member !== null) {
            return (
                <HashRouter>
                    <MemberInformation>
                        {/* <section>
                            <h1>會員基本資訊</h1>
                            <div>
                                <div className="memberPhoto"></div>
                                <div className='memberBsicInformation'>
                                    <p>{member.lasttName}{member.firstName}</p>
                                    <p>{auth.email}</p>
                                </div>
                            </div>
                        </section> */}
                        <div className='listBtns'>
                            <Link to='/memberprofile/mypetslist' className='eachList_btn first_btn' style={mypetslist}>領養清單</Link>
                            <Link to='/memberprofile/fosterlist' className='eachList_btn' style={fosterlist}>送養清單</Link>
                            <Link to='/memberprofile/closingcaselist' className='eachList_btn' style={closingcaselist}>媒合成功</Link>
                        </div>
                        <div className="dashboard">
                            <Switch>
                                <Route path="/memberprofile/mypetslist" render={() => <MyPetsList />} />
                                <Route path="/memberprofile/fosterlist" render={() => <FosterList />} />
                                <Route path="/memberprofile/closingcaselist" render={() => <ClosingCaseList />} />
                            </Switch>
                        </div>
                    </MemberInformation>
                </HashRouter>
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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(MemberProfile)