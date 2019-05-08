import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Loader from '../head&foot/Loader'
import ProjectList from '../projects/ProjectList';

class Dashboard extends Component {
    render() {
        const { projects } = this.props;
        console.log("99999", projects)
        if (projects !== undefined) {
            return (
                <div className="dashboard container" >
                    <ProjectList projects={projects} />
                </div>
            )
        } else {
            return <Loader />
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