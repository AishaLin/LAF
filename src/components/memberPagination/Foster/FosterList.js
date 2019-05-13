import React, { Component } from "react";
import { connect } from "react-redux";
import 'firebase/auth';
import styled from 'styled-components';
import { asyncGetProjectAll } from '../../../actions/getData/asyncGetProjectAll';
import FosterSummary from './FosterSummary';
import MessageList from '../contactProcess/MessageList'
import { Redirect } from "react-router-dom";
import Loader from '../../head&foot/Loader'
import { cancelPreAdopter } from "../../../actions/adoptionAction";

const FosterListContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    section {
        background-color: #fff;
        border-radius: 5px;
        padding: 20px;
        width: 100%;
        margin: 20px 0;
        border: 1px solid rgb(203, 203, 203, 0.5);
    }
`;

class FosterList extends Component {
    componentDidMount() {
        if (this.props.auth.uid) {
            this.props.dispatch(asyncGetProjectAll(this.props.auth.uid));
        } else {
            location.reload();
        }
    }
    cancelDeal = (project) => {
        this.props.dispatch(cancelPreAdopter(project));
    }
    render() {
        console.log(this.props.auth)
        const { fosterProjects } = this.props;
        if (!this.props.auth.uid) return <Redirect to='/authentication/signin' />
        if (fosterProjects) {
            if (fosterProjects.length > 0) {
                return (
                    <FosterListContent>
                        {fosterProjects && fosterProjects.map((project) => {
                            const { item } = project;
                            return (
                                //之後要連接近況更新頁
                                <section key={project.id} >
                                    <FosterSummary project={project} index={project.id} />
                                    <MessageList
                                        project={project}
                                        index={project.id}
                                        stage={item.adoptionStage}
                                        cancelDeal={this.cancelDeal}
                                    />
                                </section>
                            )
                        })}
                    </FosterListContent>
                )
            }
            else {
                return (
                    <p>——您目前沒有送養中的毛孩——</p>
                )
            }
        }
        else {
            return <Loader />
        }
    }
}

const mapStateToProps = (state) => {
    let fosterProjects = state.GetProjectStage.fosterList;
    fosterProjects = JSON.stringify(fosterProjects) !== "{}" ? fosterProjects : null
    return {
        fosterProjects: state.GetProjectStage.fosterList,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(FosterList);