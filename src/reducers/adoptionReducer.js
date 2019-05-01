const initState = {
    adoptionMessage: null
}

const adpMessageReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEND_ADOPTION_MESSAGE':
            return {
                ...state,
                adoptionMessage: action.sendmessage
            };
        case 'SEND_ADOPTION_MESSAGE_ERROR':
            return {
                ...state,
                adoptionMessage: action.err.message
            };
        case 'REQUEST_AFFIDAVIT':
            return state;
        case 'REQUEST_AFFIDAVIT_ERROR':
            return state;
        case 'RETURN_AFFIDAVIT':
            return state;
        case 'RETURN_AFFIDAVIT_ERROR':
            return state;
        case 'CLOSE_CASE':
            return state;
        case 'CLOSE_CASE_ERROR':
            return state;
        case 'CANCEL_PREADOPTER':
            return state;
        case 'CANCEL_PREADOPTER_ERROR':
            return state;
        default:
            return state
    }
}

export default adpMessageReducer


