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
import Loader from "../head&foot/Loader";
import { device } from "../../media queries/deviceName";

const MemberInformation = styled.div`
    width: 75%;
    margin: 40px auto 20px auto;
    text-align: center;
    @media ${device.laptop} {
        width: 90%;
    }
    @media ${device.mobileL} {
        margin-top: 0;
    }
    .listBtns {
        display: flex;
        margin-top: 30px;
        @media ${device.mobileL} {
            flex-direction: column;
        }
        .eachList_btn {
            flex-grow: 1;
            border-radius: 20px 20px 0 0;
            height: 60px;
            letter-spacing: 5px;
            font-size: 24px;
            -webkit-box-shadow: 10px 0px 10px -10px rgba(0,0,0,0.1);
            -moz-box-shadow: 10px 0px 10px -10px rgba(0,0,0,0.1);
            box-shadow: 10px 0px 10px -10px rgba(0,0,0,0.1);
            @media ${device.laptop} {
                font-size: 20px;
                height: 45px;
            }
            @media ${device.mobileL} {
                border-radius: 0;
            }
            :before {
                content: '';
                height: 100%;
                display: inline-block;
                vertical-align: middle;
            }
            :not(.first_btn) {
                margin-left: -5px;
                @media ${device.mobileL} {
                    margin-left: 0;
                }
            }
        }
    }
    .dashboard {
        border-top: 5px solid #fff;
        padding: 35px 20px;
        background-color: #fff;
        -webkit-box-shadow: 10px 10px 10px -10px rgba(0,0,0,0.1);
        -moz-box-shadow: 10px 10px 10px -10px rgba(0,0,0,0.1);
        box-shadow: 10px 10px 10px -10px rgba(0,0,0,0.1);
        z-index: 10000;
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

        const mypetslist = { backgroundColor: 'lightgrey', color: 'grey', zIndex: '3' }
        const fosterlist = { backgroundColor: 'lightgrey', color: 'grey', zIndex: '2' }
        const closingcaselist = { backgroundColor: 'lightgrey', color: 'grey', zIndex: '1' }
        let page = location.hash.split("/")[2];
        if (page === 'mypetslist') {
            mypetslist.backgroundColor = '#fff'
            mypetslist.color = 'rgb(23, 156, 154)'
            mypetslist.zIndex = '5'
        } else if (page === 'fosterlist') {
            fosterlist.backgroundColor = '#fff'
            fosterlist.color = 'rgb(23, 156, 154)'
            fosterlist.zIndex = '5'
        } else if (page === 'closingcaselist') {
            closingcaselist.backgroundColor = '#fff'
            closingcaselist.color = 'rgb(23, 156, 154)'
            closingcaselist.zIndex = '5'
        }

        if (member !== null) {
            return (
                <HashRouter>
                    <MemberInformation>
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
            return <Loader />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps, null)(MemberProfile)