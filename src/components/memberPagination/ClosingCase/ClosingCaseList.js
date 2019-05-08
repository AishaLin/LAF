import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import 'firebase/auth';
import { asyncGetClosingProjects } from '../../../actions/getData/asyncGetProjectAll';
import ClosingCase from './ClosingCase';
import { Link, Redirect } from "react-router-dom"
import Loader from '../../head&foot/Loader';

const ClosingCaseListContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
    .eachCaseContainer {
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
        .eachCase {
            width: 95%;
            height: 90%;
            background-color: #fff;
            padding: 20px;
        }
    }
`;

class ClosingCaseList extends Component {
    componentDidMount() {
        if (this.props.auth.uid) {
            this.props.dispatch(asyncGetClosingProjects(this.props.auth.uid));
        } else {
            location.reload();
        }
    }
    render() {
        const { closingCaseList } = this.props;
        console.log(typeof (closingCaseList))
        if (!this.props.auth.uid) return <Redirect to='/authentication/signin' />
        if (closingCaseList !== null) {
            if (closingCaseList.length > 0) {
                return (
                    <ClosingCaseListContainer>
                        {closingCaseList && closingCaseList.map((project) => {
                            const { item } = project;
                            return (
                                <Link to={'/project/' + project.id} className='eachCaseContainer' key={project.id}>
                                    <ClosingCase project={project} index={project.id} />
                                </Link>
                            )
                        })}
                    </ClosingCaseListContainer>
                )
            } else {
                return (
                    <p>——目前沒有已送養的毛孩——</p>
                )
            }
        } else {
            return <Loader />
        }
    }
}

const mapStateToProps = (state) => {
    let closingCaseList = state.GetProjectStage.closingCaseList;
    closingCaseList = JSON.stringify(closingCaseList) !== "{}" ? closingCaseList : null
    return {
        closingCaseList,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(ClosingCaseList);