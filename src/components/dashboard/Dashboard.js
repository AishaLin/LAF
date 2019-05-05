import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import styled from 'styled-components';
import ProjectList from '../projects/ProjectList';
import { Link } from 'react-router-dom';

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

class Dashboard extends Component {
    render() {
        const { projects } = this.props;
        if (projects !== null && projects !== '') {
            return (
                <div className="dashboard container" >
                    <ProjectList projects={projects} />
                </div>
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
        projects: state.firestore.ordered.projects,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: 'projects' }])
)(Dashboard)