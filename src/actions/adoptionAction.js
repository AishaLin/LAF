import firebase from "../config/fbConfig"

const db = firebase.firestore();

//領養1－通知送養人(送出領養人基本資訊至firebase)
export const sendAdoptMessage = (sendmessage) => {
    return async (dispatch) => {
        let name = [];
        db.collection('projects').doc(sendmessage.project).update({ adoptionStage: 1 })
        await db.collection('users').doc(sendmessage.requester).get()
            .then(q => {
                name.push({ firstName: q._document.proto.fields.firstName.stringValue, lastName: q._document.proto.fields.lastName.stringValue })
            })
            .catch(err => console.log(err))
        await db.collection('adoptionMessage').add({
            ...sendmessage,
            requesterFirstName: name[0].firstName,
            requesterLastName: name[0].lastName,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'SEND_ADOPTION_MESSAGE', sendmessage });
        }).then(() => {
            window.location.hash = `/memberprofile/mypetslist`;
            // const projectID = location.hash.split("?")[1].split("&")[0].split("=")[1]
            // window.location.hash = `/project/${projectID}`;
        }).catch((err) => {
            dispatch({ type: 'SEND_ADOPTION_MESSAGE_ERROR', err });
            console.log("error message", err)
        })
    }
};

//領養2－送養人要求領養人簽署切結書
export const requestAffidavit = (changeToStage2) => {
    return (dispatch) => {
        db.collection('projects').doc(changeToStage2.project).update({
            adoptionStage: 2,
            preAdopter: changeToStage2.preAdopter,
            preAdopterName: changeToStage2.preAdopterName,
            requestAffidavitTime: new Date()
        }).then(() => {
            dispatch({ type: 'REQUEST_AFFIDAVIT', changeToStage2 });
        }).then(() => {
            location.reload()
        }).catch((err) => {
            console.log(err)
        })
    }
};

//領養3－領養人回傳切結書，待送養人確認
export const returnAffidavit = (changeToStage3) => {
    return async (dispatch) => {
        let affidavitNumber = changeToStage3.projectID + '_' + changeToStage3.fosterID + '_' + changeToStage3.adopterID
        await db.collection('projects').doc(changeToStage3.projectID).update({
            adoptionStage: 3,
            preAdopterStage3: changeToStage3.adopterID,
            returnAffidavitTime: new Date()
        }).catch(err => console.log(err))
        await db.collection('affidavit').add({
            ...changeToStage3,
            affidavitNumber: affidavitNumber,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'RETURN_AFFIDAVIT', changeToStage3 });
        }).then(() => {
            window.location.hash = `/memberprofile/mypetsList`;
        }).catch((err) => {
            console.log("error message", err)
        })
    }
};

//領養4－結案
export const approveAffidavit = (affidavitData, projectID) => {
    return async (dispatch) => {
        await db.collection('projects').doc(projectID).update({
            adoptionStage: 4,
            adopterID: affidavitData.item.adopterID,
            affidavitID: affidavitData.id,
            adopterName: affidavitData.item.adopterSignature,
            closeCaseAt: new Date()
        }).catch(err => console.log("errorrrrrr", err))
        await db.collection('affidavit').doc(affidavitData.id).update({
            fosterSignature: affidavitData.fosterSignature,
            fosterPhone: affidavitData.fosterPhone,
            fosterEmail: affidavitData.fosterEmail,
            fosterAddress: affidavitData.fosterAddress,
            closeCaseAt: new Date()
        }).then(() => {
            dispatch({ type: 'CLOSE_CASE' });
        }).then(() => {
            window.location.hash = `/memberprofile/closingcaselist`;
        }).catch((err) => {
            console.log("error message!!!", err)
        })
    }
};

//取消領養人簽署程序
export const cancelPreAdopter = (project) => {
    return async (dispatch) => {
        await db.collection('projects').doc(project.id).update({
            adoptionStage: 1,
            preAdopterStage3: '',
            preAdopter: '',
            preAdopterName: ''
        }).catch(err => console.log(err))
        await db.collection('affidavit').where("projectID", "==", project.id).get()
            .then((q) => {
                let batch = db.batch();
                q.forEach(doc =>
                    batch.delete(doc.ref)
                );
                return batch.commit();
            })
            .then(() => {
                dispatch({ type: 'CANCEL_PREADOPTER' });
            }).then(() => {
                location.reload();
            }).catch((err) => {
                console.log("error message", err)
            })
    }
};