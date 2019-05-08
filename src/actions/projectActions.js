import firebase from "../config/fbConfig"

export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore(); //初始化
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        
        let storageRef = firebase.storage().ref();
        storageRef.child(`images/${project.fileName}`)
            .put(project.file)
            .then(()=>{
                delete project.file;
            })
            .then(snap => {
                storageRef.child(`/images/${project.fileName}`).getDownloadURL()
                .then(function (url) {
                    firestore.collection('projects').add({
                        ...project,
                        authorFirstName: profile.firstName,
                        authorLastName: profile.lastName,
                        fileUrl: url,
                        authorID: authorId,
                        createdAt: new Date()
                    }).then(() => {
                        dispatch({ type: 'CREATE_PROJECT', project });
                        window.location.hash = '/adoptionBoard';
                    }).catch((err) => {
                        dispatch({ type: 'CREATE_PROJECT_ERROR', err });
                        console.log("add errorrrrrr",err)
                        alert('圖片上傳有誤，請壓縮或重新選擇其他圖片，或洽網頁維護者 aishalin314@gmail.com 謝謝！')
                    })
                })
            })
            .catch((err) => { console.log("err.message", err) })
    }
};

