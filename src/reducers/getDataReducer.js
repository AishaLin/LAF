const initState = {
    fosterList: null,
    fostermessage: null,
    specificProject: null,
    closingCaseList: null
}

const getProjectData = (state = initState, action) => {
    switch (action.type) {
        case 'FOSTER.GET_ALL_PROJECT':
            return {
                ...state,
                fosterList: action.fosterList
            };
        case 'FOSTER.GET_ALL_MESSAGE':
            return {
                ...state,
                fostermessage: action.fostermessage
            };
        case 'SPECIFIC.GET_ALL_PROJECT':
            return {
                ...state,
                specificProject: action.specificProject
            };
        case 'CLOSINGCASE.GET_ALL_PROJECT':
            return {
                ...state,
                closingCaseList: action.closingCaseList
            };
        case 'CLEAR_RECORD':
            return {
                fosterList: null,
                fostermessage: null,
                specificProject: null,
                closingCaseList: null
            }
        default:
            return state
    }
}

export default getProjectData


