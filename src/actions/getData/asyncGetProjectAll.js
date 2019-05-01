import firebase from "../../config/fbConfig"

// 會員送養的 project 基本資訊回傳 redux
export const getFosterProjectAll = (fosterList) => {
    return {
        type: "FOSTER.GET_ALL_PROJECT",
        fosterList
    }
}
export const getFosterMessageAll = (fostermessage) => {
    return {
        type: "FOSTER.GET_ALL_MESSAGE",
        fostermessage
    }
}
export const getClosingProjectAll = (closingCaseList) => {
    return {
        type: "CLOSINGCASE.GET_ALL_PROJECT",
        closingCaseList
    }
}

// 自 firebase 取得會員送養的 project 基本資訊_async function
export const asyncGetProjectAll = (uid) => {
    return async (dispatch) => {
        let fosterList = [];
        let fostermessage = [];
        const db = firebase.firestore();
         db.collection('projects').where("authorID", "==", uid).where("adoptionStage", "<", 4).orderBy('adoptionStage').orderBy('createdAt').get()
            .then(q => {
                q.forEach(doc => fosterList.push({
                    id: doc.id,
                    item: doc.data()
                }))
                dispatch(getFosterProjectAll(fosterList))
            })
            .catch(err => console.log("error message :", err))
         db.collection('adoptionMessage').where("foster", "==", uid).orderBy('createdAt').get()
            .then(q => {
                q.forEach(doc => fostermessage.push({
                    id: doc.id,
                    item: doc.data()
                }))
                dispatch(getFosterMessageAll(fostermessage))
            })
            .catch(err => console.log("error message :", err))
    }
}
export const asyncGetClosingProjects = (uid) => {
    return async (dispatch) => {
        let closingCaseList = [];

        const db = firebase.firestore();
         db.collection('projects').where("authorID", "==", uid).where("adoptionStage", "==", 4).orderBy('createdAt').get()
            .then(q => {
                q.forEach(doc => closingCaseList.push({
                    id: doc.id,
                    item: doc.data()
                }))
                dispatch(getClosingProjectAll(closingCaseList))
            })
            .catch(err => console.log("error message :", err))
    }
}
