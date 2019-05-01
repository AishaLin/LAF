import firebase from "../../config/fbConfig"

// 會員送養的 project 基本資訊回傳 redux
export const getSpecificProjectAll = (specificProject) => {
    return {
        type: "SPECIFIC.GET_ALL_PROJECT",
        specificProject
    }
}

// 自 firebase 取得會員送養的 project 基本資訊_async function
export const asyncGetSpecificProjectAll = (projectID) => {
    return (dispatch) => {
        const db = firebase.firestore();
        db.collection('projects').doc(projectID).get()
            .then(doc => {
                dispatch(getSpecificProjectAll(doc.data()))
            })
            .catch(err => console.log("error message :", err))
    }
}

