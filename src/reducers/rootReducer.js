import authReducer from './authReducer';
import projectReducer from './projectReducer';
import adpMessageReducer from './adoptionReducer';
import getProjectData from './getDataReducer'
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    message: adpMessageReducer,
    GetProjectStage: getProjectData,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer; 