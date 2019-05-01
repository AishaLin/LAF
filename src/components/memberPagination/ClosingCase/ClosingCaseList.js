import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import 'firebase/auth';
import { asyncGetClosingProjects } from '../../../actions/getData/asyncGetProjectAll';
import ClosingCase from './ClosingCase';
import { Link, Redirect } from "react-router-dom"

const ClosingCaseListContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    .eachCaseContainer {
        width: 50%;
        height: 320px;
        justify-content: center;
        .eachCase {
            width: 95%;
            height: 90%;
            background-color: #fff;
            padding: 20px;
        }
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
                                <div key={project.id} className="eachCaseContainer">
                                    <Link to={'/project/' + project.id} className='eachCase'>
                                        <ClosingCase project={project} index={project.id} />
                                    </Link>
                                </div>
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
    let closingCaseList = state.GetProjectStage.closingCaseList;
    closingCaseList = JSON.stringify(closingCaseList) !== "{}" ? closingCaseList : null
    return {
        closingCaseList,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(ClosingCaseList);